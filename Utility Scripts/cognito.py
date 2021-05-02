import boto3

client = boto3.client(
    'cognito-idp',
    region_name='us-east-1',
    aws_access_key_id='aws_access_key_id',
    aws_secret_access_key='aws_secret_access_key'
)

UserPoolId = 'us-east-1_K1l1PGVpg'

# admin_create_user
if False:
    for i in range(1, 21):
        Username = 'user' + str(i)
        try:
            response = client.admin_create_user(
                UserPoolId=UserPoolId,
                Username=Username,
                TemporaryPassword='123456',
                ForceAliasCreation=False,
                MessageAction='SUPPRESS',
            )
        except:
            pass

# admin_set_user_password
if False:
    count = 0
    for i in range(1, 21):
        Username = 'user' + str(i)
        try:
            response = client.admin_set_user_password(
                UserPoolId=UserPoolId,
                Username=Username,
                Password='123456',
                Permanent=True
            )
            count += 1
        except:
            pass

    print('Total: ' + str(count))

# admin_delete_user
if False:
    for i in range(1, 1001):
        Username = 'user' + str(i)
        try:
            response = client.admin_delete_user(
                UserPoolId=UserPoolId,
                Username=Username
            )
        except:
            pass
