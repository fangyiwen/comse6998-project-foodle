from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import random
import time

host = 'search-comse6998-xyiaghg4awnumubfxszrh56nlu.us-east-1.es.amazonaws.com'
region = 'us-east-1'
service = 'es'
awsauth = AWS4Auth('',
                   '', region,
                   service)
es = Elasticsearch(
    hosts=[{'host': host, 'port': 443}],
    http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection,
    timeout=30
)

history_recipes = [
    {
        "calories": 191,
        "carbs": 29,
        "fat": 6,
        "fiber": 5,
        "id": 716426,
        "image": "https://spoonacular.com/recipeImages/716426-312x231.jpg",
        "protein": 6,
        "sodium": 428,
        "sugar": 3,
        "title": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
        "vc": 65
    },
    {
        "calories": 377,
        "carbs": 42,
        "fat": 21,
        "fiber": 5,
        "id": 716217,
        "image": "https://spoonacular.com/recipeImages/716217-312x231.jpg",
        "protein": 8,
        "sodium": 490,
        "sugar": 7,
        "title": "Vietnamese Pancakes with Vegetables, Herbs and a Fragrant Dipping Sauce (Bánh Xèo)",
        "vc": 74
    },
    {
        "calories": 130,
        "carbs": 23,
        "fat": 2,
        "fiber": 8,
        "id": 798400,
        "image": "https://spoonacular.com/recipeImages/798400-312x231.jpg",
        "protein": 7,
        "sodium": 502,
        "sugar": 7,
        "title": "Spicy Black-Eyed Pea Curry with Swiss Chard and Roasted Eggplant",
        "vc": 47
    },
    {
        "calories": 367,
        "carbs": 32,
        "fat": 12,
        "fiber": 3,
        "id": 716408,
        "image": "https://spoonacular.com/recipeImages/716408-312x231.jpg",
        "protein": 28,
        "sodium": 419,
        "sugar": 6,
        "title": "Greek-Style Baked Fish: Fresh, Simple, and Delicious",
        "vc": 138
    },
    {
        "calories": 300,
        "carbs": 70,
        "fat": 3,
        "fiber": 19,
        "id": 716381,
        "image": "https://spoonacular.com/recipeImages/716381-312x231.jpg",
        "protein": 11,
        "sodium": 14040,
        "sugar": 31,
        "title": "Nigerian Snail Stew",
        "vc": 362
    }
]

items = []
for i in range(1, 21):
    userid = 'user' + str(i)

    j = random.randint(0, 2)

    history_recipe = history_recipes[j]
    recipeid = history_recipe['id']
    es_id = userid + '_' + str(recipeid)
    frequency = random.randint(4, 20)
    timestamp = str(time.time_ns())
    item = [es_id, userid, recipeid, frequency, timestamp, history_recipe]
    items.append(item)

    history_recipe = history_recipes[j + 1]
    recipeid = history_recipe['id']
    es_id = userid + '_' + str(recipeid)
    frequency = random.randint(4, 20)
    timestamp = str(time.time_ns())
    item = [es_id, userid, recipeid, frequency, timestamp, history_recipe]
    items.append(item)

    history_recipe = history_recipes[j + 2]
    recipeid = history_recipe['id']
    es_id = userid + '_' + str(recipeid)
    frequency = random.randint(4, 20)
    timestamp = str(time.time_ns())
    item = [es_id, userid, recipeid, frequency, timestamp, history_recipe]
    items.append(item)

for item in items:
    es_id, userid, recipeid, frequency, timestamp, history_recipe = item
    json_object = {'userid': userid,
                   'recipeid': recipeid,
                   'frequency': frequency,
                   'timestamp': timestamp,
                   'history_recipe': history_recipe
                   }
    document = json_object
    es.index(index="user_recipes", doc_type="user_recipe", id=es_id,
             body=document)
