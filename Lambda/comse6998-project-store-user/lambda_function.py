import json
import boto3
import time
from decimal import Decimal

def lambda_handler(event, context):
    ACCESS_KEY = 'ACCESS_KEY'
    SECRET_KEY = 'SECRET_KEY'
    region_name = 'us-east-1'
    
    queryStringParameters = event["queryStringParameters"]
    
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
    
    
    # userid = queryStringParameters['userid'].strip()
    email = queryStringParameters['email'].strip()
    phoneNumber = queryStringParameters['phoneNumber'].strip()
    age = queryStringParameters['age'].strip()
    height = queryStringParameters['height'].strip()
    weight = queryStringParameters['weight'].strip()
    gender = queryStringParameters['gender'].strip()
    firstName = queryStringParameters['firstName'].strip()
    lastName = queryStringParameters['lastName'].strip()
    # ',' seperated string
    dislike = queryStringParameters['dislike'].strip()
    
    current_recipe = []
    if event['body']:
        current_recipe = json.loads(event['body'])
    

    dynamodb = boto3.resource('dynamodb',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    region_name=region_name)
    
    table = dynamodb.Table('users')
    
    item = {
        'userid': userid,
        'email': email,
        'phoneNumber': phoneNumber,
        'age': {'N': age},
        'dislike': dislike,
        'height': {'N': height},
        'weight': {'N': weight},
        'gender': gender,
        'firstName': firstName,
        'lastName': lastName,
        'timestamp': str(time.time_ns()),
        'current_recipe': current_recipe
    }
    
    table.put_item(Item=item)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT,GET'
        },
        'body': json.dumps('Hello from Lambda!')
    }
    
    # TODO implement
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }
