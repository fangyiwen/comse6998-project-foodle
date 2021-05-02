import json
import boto3
import time

def lambda_handler(event, context):
    userid = event['userName']
    
    ACCESS_KEY = 'ACCESS_KEY'
    SECRET_KEY = 'SECRET_KEY'
    region_name = 'us-east-1'
    
    dynamodb = boto3.resource('dynamodb',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    region_name=region_name)
    
    table = dynamodb.Table('users')
    
    item = {
        'userid': userid,
        'email': 'email@example.com',
        'phoneNumber': 'xxx-xxx-xxxx',
        'age': {'N': 25},
        'dislike': '',
        'height': {'N': 180},
        'weight': {'N': 75},
        'gender': 'male',
        'firstName': 'Your_first_name',
        'lastName': 'Your_last_name',
        'timestamp': str(time.time_ns()),
        'current_recipe': []
    }
    
    table.put_item(Item=item)
    
    return event
    
    
    # TODO implement
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }
