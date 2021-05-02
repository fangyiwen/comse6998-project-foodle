import json
import boto3
from boto3.dynamodb.conditions import Key
import decimal
from elasticsearch import Elasticsearch, RequestsHttpConnection, helpers
from requests_aws4auth import AWS4Auth

def lambda_handler(event, context):
    ACCESS_KEY = 'ACCESS_KEY'
    SECRET_KEY = 'SECRET_KEY'
    region_name = 'us-east-1'
    
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
    
    
    dynamodb = boto3.resource('dynamodb',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    region_name=region_name)
    
    table = dynamodb.Table('users')
    
    response = table.query(
        KeyConditionExpression=Key('userid').eq(userid)
    )
    
    item = response['Items']
    
    current_recipe = item[0]['current_recipe']
    for recipe in current_recipe:
        for k, v in recipe.items():
            if type(v) is decimal.Decimal:
                recipe[k] = int(v)
    
    
    # Search history recipes in the ES
    payload = {
        "query": {
            "match": {
                "userid": {
                    "query": userid
                }
            }
        }
    }
    
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

    # Old recommendation
    # res = helpers.scan(
    #     client=es,
    #     scroll='2m',
    #     query=payload,
    #     index="user_recipes")

    # history_recipe = []
    # for hit in res:
    #     tmp = hit['_source']
    #     history_recipe.append(tmp)
        
    # history_recipe.sort(key=lambda x: x['frequency'], reverse=True)
    # for i in range(len(history_recipe)):
    #     history_recipe[i] = history_recipe[i]['history_recipe']
    
    # for recipe in history_recipe:
    #     for k, v in recipe.items():
    #         if type(v) is decimal.Decimal:
    #             recipe[k] = int(v)
    
    
    # Recommendation function: WF points calculation
    user_recipes_all = helpers.scan(
        client=es,
        scroll='2m',
        query={
            "query": {"match_all": {}}
        },
        index='user_recipes')
    
    top_n = 3
    recipe_frequency = {}
    recipe_frequency_specific_user = {}
    lookup_map = {}

    for record in user_recipes_all:
        recipeid_key = str(record['_source']['recipeid'])
    
        lookup_map[recipeid_key] = record['_source']['history_recipe']
    
        recipe_frequency[recipeid_key] = record['_source'][
                                             'frequency'] + recipe_frequency.get(
            recipeid_key, 0)
    
        if record['_source']['userid'] == userid:
            recipe_frequency_specific_user[recipeid_key] = record['_source'][
                                                              'frequency'] + recipe_frequency_specific_user.get(
                recipeid_key, 0)
    
    recipe_frequency_sort_list = sorted(recipe_frequency.items(),
                                    key=lambda x: x[1], reverse=True)
    t = 0
    if len(recipe_frequency_sort_list) >= top_n:
        t = recipe_frequency_sort_list[top_n - 1][1]
    elif len(recipe_frequency_sort_list) > 0:
        t = recipe_frequency_sort_list[-1][1]
    
    A = 0
    if len(recipe_frequency_sort_list) > 0:
        for n in recipe_frequency_sort_list:
            A += n[1]
        A /= len(recipe_frequency_sort_list) 

    WF_dict = {}
    for k, v in recipe_frequency.items():
        F = 0
        if k in recipe_frequency_specific_user:
            F = recipe_frequency_specific_user[k]
        f = v
    
        WF = F * f / (f + t) + A * t / (f + t)
        WF_dict[k] = WF
    
    WF_dict_sort_list = sorted(WF_dict.items(), key=lambda x: x[1], reverse=True)

    history_recipe = []
    for n in WF_dict_sort_list:
        history_recipe.append(lookup_map[n[0]])
    
    
    data = {
        'userid': item[0]['userid'],
        'email': item[0]['email'],
        'phoneNumber': item[0]['phoneNumber'],
        'age': int(item[0]['age']['N']),
        'gender': item[0]['gender'],
        'dislike': item[0]['dislike'],
        'height': int(item[0]['height']['N']),
        'weight': int(item[0]['weight']['N']),
        'firstName': item[0]['firstName'],
        'lastName': item[0]['lastName'],
        'current_recipe': current_recipe,
        'history_recipe': history_recipe
    }

    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT,GET'
        },
        'body': json.dumps(data)
    }
    
    # TODO implement
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }
