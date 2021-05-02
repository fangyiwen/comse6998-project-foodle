import json
import requests

def lambda_handler(event, context):
    # spoonacular_api_pool = [
    # '2861562809924fa7a36d177d8e22fd5e',
    # 'b59a27eb20e243379a99595bbd844239',
    # '9629cb0bd33a47c681cff3372191e7a0',
    # '66f02fb3030a41839fbd96be938aea7e',
    # '1226b79f8417492eaebd0e5d014c7e1c',
    # '5087b605768c478e9761c34516680ce4',
    # '9202424388da90c8ab1dfc77ba9d536d66dccd56',
    # 'bb87065cd04c3840f793ec5dd00091f9a0a165ad',
    # '1f875fac9eac9ea3f06abf6c8e74acb0569cdede'
    # ][::-1]

    spoonacular_api_pool = [
    '2861562809924fa7a36d177d8e22fd5e',
    'b59a27eb20e243379a99595bbd844239',
    '9629cb0bd33a47c681cff3372191e7a0',
    '66f02fb3030a41839fbd96be938aea7e',
    '1226b79f8417492eaebd0e5d014c7e1c',
    '5087b605768c478e9761c34516680ce4',
    '9202424388da90c8ab1dfc77ba9d536d66dccd56',
    'bb87065cd04c3840f793ec5dd00091f9a0a165ad',
    '1f875fac9eac9ea3f06abf6c8e74acb0569cdede'
    ]
    
    spoonacular_api = spoonacular_api_pool[0]
    URL = "https://api.spoonacular.com/recipes/complexSearch"
    PARAMS = {'apiKey': spoonacular_api}
    
    queryStringParameters = event["queryStringParameters"]
    if queryStringParameters:
        for para in queryStringParameters:
            if queryStringParameters[para]:
                PARAMS[para] = queryStringParameters[para]
    
    complexSearch = {}
    for apiKey in spoonacular_api_pool:
        PARAMS['apiKey'] = apiKey
        r = requests.get(url = URL, params = PARAMS)
        complexSearch = r.json()
        spoonacular_api = apiKey
        if not ('status' in complexSearch and complexSearch['status'] == 'failure'):
            break
        
    nutritionWidget = {}
    analyzedInstructions = {}
    
    if 'results' in complexSearch:
        if 'number' in complexSearch and complexSearch['number'] > 5:
            complexSearch['number'] = 5
            complexSearch['results'] = complexSearch['results'][:5]
            
        for result in complexSearch['results']:
            recipe_id = result['id']
            
            i = spoonacular_api_pool.index(spoonacular_api)
            for j in range(i, len(spoonacular_api_pool)):
                spoonacular_api = spoonacular_api_pool[j]
                r = requests.get(url = "https://api.spoonacular.com/recipes/" + str(recipe_id) + "/nutritionWidget.json", params = {'apiKey': spoonacular_api})
                nutritionWidget[recipe_id] = r.json()
                r = requests.get(url = "https://api.spoonacular.com/recipes/" + str(recipe_id) + "/analyzedInstructions", params = {'apiKey': spoonacular_api})
                analyzedInstructions[recipe_id] = r.json()
                
                if not ('status' in nutritionWidget[recipe_id] and nutritionWidget[recipe_id]['status'] == 'failure') and not ('status' in analyzedInstructions[recipe_id] and analyzedInstructions[recipe_id]['status'] == 'failure'):
                    break
            
    data = {'complexSearch': complexSearch,
        'nutritionWidget': nutritionWidget,
        'analyzedInstructions': analyzedInstructions
        
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
