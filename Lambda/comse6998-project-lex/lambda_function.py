import json
import boto3
import time

def lambda_handler(event, context):
    # userid = json.loads(event['body'])['userid']
    
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
    
    
    send_message = json.loads(event['body'])['message']
    
    client = boto3.client('lex-runtime')
    response = client.post_text(
        botName='COMSE_Cloud_Computing_and_Big_Data_Project',
        botAlias='COMSE_Cloud_Computing_and_Big_Data_Project',
        userId=userid,
        inputText=send_message
    )
    
    count = 0
    if 'slots' in response:
        for slot in response['slots'].values():
            if slot is not None:
                count += 1
        # Fullfillment
        if count == len(response['slots']):
            r = response['slots']
            email = r['email']
            phoneNumber = r['phoneNumber']
            age = r['age']
            height = r['height']
            weight = r['weight']
            dislike = r['dislike']
            gender = r['gender']
            firstName = r['firstName']
            lastName = r['lastName']
            
            # Store to DB
            ACCESS_KEY = 'ACCESS_KEY'
            SECRET_KEY = 'SECRET_KEY'
            region_name = 'us-east-1'
            
            dynamodb = boto3.resource('dynamodb',
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY,
            region_name=region_name)
            
            table = dynamodb.Table('users')
            
            if dislike.lower() == 'no':
                dislike = ''
            item = {
                'userid': userid,
                'email': email,
                'phoneNumber': phoneNumber,
                'age': {'N': age},
                'dislike': dislike,
                'height': {'N': height},
                'weight': {'N': weight},
                'dislike': dislike,
                'gender': gender,
                'firstName': firstName,
                'lastName': lastName,
                'timestamp': str(time.time_ns()),
                'current_recipe': []
            }
    
            table.put_item(Item=item)
    
    if 'message' in response:
        res = {'message': response['message']}
    else:
        res = {'message': 'Your infomation has been successsfully saved!'}

    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT,GET'
        },
        'body': json.dumps(res)
    }
    
    # TODO implement
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }
