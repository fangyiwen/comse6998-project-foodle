import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from datetime import datetime

def lambda_handler(event, context):
    # Receive message from SQS queue
    if event['Records']:
        receipt_handle = event['Records'][0]['receiptHandle']
        
        userid = event['Records'][0]['messageAttributes']['userid']['stringValue']
        recipeid = event['Records'][0]['messageAttributes']['recipeid']['stringValue']
    
    queue_url = 'https://sqs.us-east-1.amazonaws.com/640615917264/comse6009-project-q.fifo'
    # Receive message from SQS queue
    sqs = boto3.client(
        'sqs',
        region_name='us-east-1',
        aws_access_key_id='aws_access_key_id',
        aws_secret_access_key='aws_secret_access_key'
    )
    sqs.delete_message(
        QueueUrl=queue_url,
        ReceiptHandle=receipt_handle
    )
    
    print(event['Records'][0]['messageAttributes'])
    
    # Get email address from another Lambda
    # invokeLambda = boto3.client(
    #     'lambda',
    #     region_name='us-east-1',
    #     aws_access_key_id='aws_access_key_id',
    #     aws_secret_access_key='aws_secret_access_key'
    # )
    
    # payload_event = {
    #     "queryStringParameters": {
    #         "userid": userid
    #     }
    # }
    
    # invoke_response = invokeLambda.invoke(
    #     FunctionName = 'comse6998-project-search-user', 
    #     InvocationType = 'RequestResponse', 
    #     Payload = json.dumps(payload_event)
    # )
    
    # body = json.loads(invoke_response["Payload"].read())
    # # Convert string to dict
    # print(type(body))
    # email = json.loads(body['body'])['email']
    
    # Get email address from DB
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
    item = response['Items']
    email =  item[0]['email']
    firstName = item[0]['firstName']
    
    recipe_title = event['Records'][0]['messageAttributes']['title']['stringValue']
    image = event['Records'][0]['messageAttributes']['image']['stringValue']
    calories = event['Records'][0]['messageAttributes']['calories']['stringValue']
    carbs = event['Records'][0]['messageAttributes']['carbs']['stringValue']
    fat = event['Records'][0]['messageAttributes']['fat']['stringValue']
    fiber = event['Records'][0]['messageAttributes']['fiber']['stringValue']   
    protein = event['Records'][0]['messageAttributes']['protein']['stringValue']
    # sodium = event['Records'][0]['messageAttributes']['sodium']['stringValue']
    sugar = event['Records'][0]['messageAttributes']['sugar']['stringValue']
    # vc = event['Records'][0]['messageAttributes']['vc']['stringValue']

    now = datetime.now()
    date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
    
    nutrition = "calories: " + calories + "</p>" + "<p>carbs: " + carbs + "</p>" + "<p>fat: " + fat + "</p>" + "<p>fiber: " + fiber + "</p>" + "<p>protein: " + protein + "</p>" + "<p>sugar: " + sugar
    nutrition_plaintext = "calories: " + calories + "\n" + "carbs: " + carbs + "\n" + "fat: " + fat + "\n" + "fiber: " + fiber + "\n" + "protein: " + protein + "\n" + "sugar: " + sugar


    # Amazon SES
    SENDER = "iphone5a1429@gmail.com"
    RECIPIENT = email
    AWS_REGION = "us-east-1"
    SUBJECT = "Foodle recipe notification"
    
    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = f"Dear {firstName}\nYour have chosen the recipe {recipe_title} at {date_time}. The details are as follows.\n{nutrition_plaintext}\nVisit the recipe image here\n{image}"
            
    # The HTML body of the email.
    BODY_HTML = f"""<html>
    <head></head>
    <body>
        <p>Dear {firstName}</p>
        <p>Your have chosen the recipe <strong>{recipe_title}</strong> at {date_time}. The details are as follows.</p>
        <hr>
        <p>{nutrition}</p>
        <hr>
        <p>Visit the recipe image here</p>
        <p>{image}</p>
    </body>
    </html>
                """
                
    # BODY_HTML = f"""<html>
    # <head></head>
    # <body>
    #     <p>Dear {firstName}</p>
    #     <p>Your have chosen the recipe {recipe_title} at {date_time}. The details are as follows.</p>
    #     {nutrition}
    #     <img src=""" + image + """ alt="image" width="100" height="132">
    # </body>
    # </html>
    #             """
    # The character encoding for the email.
    CHARSET = "UTF-8"
    
    client = boto3.client(
        'ses',
        region_name=AWS_REGION,
        aws_access_key_id='aws_access_key_id',
        aws_secret_access_key='aws_secret_access_key'
    )
    
    # Try to send the email.
    try:
        #Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source=SENDER,
            # If you are not using a configuration set, comment or delete the
            # following line
            # ConfigurationSetName=CONFIGURATION_SET,
        )
    # Display an error if something goes wrong.	
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])
    
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
