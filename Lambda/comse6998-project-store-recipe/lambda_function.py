import json
import boto3
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import requests
import time
import decimal
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    host = 'search-comse6998-xyiaghg4awnumubfxszrh56nlu.us-east-1.es.amazonaws.com'
    region = 'us-east-1'
    service = 'es'
    awsauth = AWS4Auth('aws_access_key_id',
                       'aws_secret_access_key', region,
                       service)
                       
    es = Elasticsearch(
        hosts=[{'host': host, 'port': 443}],
        http_auth=awsauth,
        use_ssl=True,
        verify_certs=True,
        connection_class=RequestsHttpConnection
    )
    
    queryStringParameters = event["queryStringParameters"]
    # userid = queryStringParameters['userid'].strip()
    
    token = queryStringParameters['token'].strip()
    # Invoke lambda
    invokeLambda = boto3.client(
        'lambda',
        region_name='us-east-1',
        aws_access_key_id='aws_access_key_id',
        aws_secret_access_key='aws_secret_access_key'
    )
    
    payload_event = {
        "body": {
            "token": token
        }
    }
    
    invoke_response = invokeLambda.invoke(
        FunctionName = 'comse6998-project-token-verification', 
        InvocationType = 'RequestResponse', 
        Payload = json.dumps(payload_event)
    )
    
    body = json.loads(invoke_response["Payload"].read())
    # Convert string to dict
    body = json.loads(body['body'])
    
    userid = ''
    if 'username' in body:
        userid = body['username']
    else:
        res = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT,GET'
        },
        'body': json.dumps({'invalid': True})
        }
        return res

    
    
    recipeid = queryStringParameters['recipeid'].strip()
    
    es_id = userid + '_' + recipeid
    payload = {
        "query": {
            "terms": {
                "_id": [es_id]
            }
        }
    }
    
    frequency = 1
    if es.indices.exists(index='user_recipes'):
        res = es.search(index='user_recipes', body=payload)
        if res['hits']['hits']:
            frequency = res['hits']['hits'][0]['_source']['frequency'] + 1
    
        
    history_recipe = {}
    if event['body']:
        history_recipe = json.loads(event['body'])
        for k, v in history_recipe.items():
            if type(v) is decimal.Decimal:
                history_recipe[k] = int(v)
    
    
    json_object = {'userid': userid,
                  'recipeid': recipeid,
                  'frequency': frequency,
                  'timestamp': time.time_ns(),
                  'history_recipe': history_recipe
    }
    
    document = json_object
    es.index(index="user_recipes", doc_type="user_recipe", id=es_id,
             body=document)
    
    # Update current_recipe in DB
    ACCESS_KEY = 'ACCESS_KEY'
    SECRET_KEY = 'SECRET_KEY'
    region_name = 'us-east-1'
    
    dynamodb = boto3.resource('dynamodb',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    region_name=region_name)
    table = dynamodb.Table('users')   
    response = table.query(
        KeyConditionExpression=Key('userid').eq(userid)
    )
    
    item = response['Items'][0]
    item['current_recipe'].append(history_recipe)
    table.put_item(Item=item)
    
    
    # Send message to SQS queue
    sqs = boto3.client(
        'sqs',
        region_name=region,
        aws_access_key_id='aws_access_key_id',
        aws_secret_access_key='aws_secret_access_key'
    )
    
    queue_url = 'https://sqs.us-east-1.amazonaws.com/640615917264/comse6009-project-q.fifo'
    response = sqs.send_message(
        QueueUrl=queue_url,
        MessageGroupId='Group1',
        MessageAttributes={
            'userid': {
                'DataType': 'String',
                'StringValue': userid
            },
            'recipeid': {
                'DataType': 'String',
                'StringValue': recipeid
            },
            'calories': {
                'DataType': 'String',
                'StringValue': str(history_recipe['calories'])
            },
            'carbs': {
                'DataType': 'String',
                'StringValue': str(history_recipe['carbs'])
            },
            'fat': {
                'DataType': 'String',
                'StringValue': str(history_recipe['fat'])
            },
            'fiber': {
                'DataType': 'String',
                'StringValue': str(history_recipe['fiber'])
            },
            'image': {
                'DataType': 'String',
                'StringValue': str(history_recipe['image'])
            },
            'protein': {
                'DataType': 'String',
                'StringValue': str(history_recipe['protein'])
            },
            # 'sodium': {
            #     'DataType': 'String',
            #     'StringValue': str(history_recipe['sodium'])
            # },
            'sugar': {
                'DataType': 'String',
                'StringValue': str(history_recipe['sugar'])
            },
            'title': {
                'DataType': 'String',
                'StringValue': str(history_recipe['title'])
            # },
            # 'vc': {
            #     'DataType': 'String',
            #     'StringValue': str(history_recipe['vc'])
            }
        },
        MessageBody=(
            userid + '|' + str(time.time_ns())
        )
    )
    
    print(response['MessageId'])
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT,GET'
        },
        'body': json.dumps(json_object)
    }
    
    # TODO implement
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }
