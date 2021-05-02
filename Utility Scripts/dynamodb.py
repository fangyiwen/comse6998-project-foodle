import boto3
import time
from faker import Faker
import random

dynamodb = boto3.resource('dynamodb',
                          aws_access_key_id='aws_access_key_id',
                          aws_secret_access_key='aws_secret_access_key',
                          region_name='us-east-1'
                          )
table = dynamodb.Table('users')


def batchCreateItem(items):
    with table.batch_writer() as batch:
        for item in items:
            userid, email, phoneNumber, age, dislike, height, weight, gender, firstName, lastName, timestamp, current_recipe = item

            batch.put_item(
                Item={
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
                    'timestamp': timestamp,
                    'current_recipe': current_recipe
                }
            )


fake = Faker()
excludeIngredients_1 = ['tomato', 'cheese', 'egg']
excludeIngredients_2 = ['fat', 'sugar', 'sodium']
current_recipes = [
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

    firstName = fake.first_name()
    lastName = fake.last_name()
    email = firstName + '.' + lastName + '@example.com'
    phoneNumber = fake.phone_number()
    age = random.randint(15, 40)

    dislike = ''
    dislike_no = random.randint(0, 2)
    if dislike_no == 0:
        dislike = ''
    elif dislike_no == 1:
        dislike = random.choice(excludeIngredients_1)
    elif dislike_no == 2:
        dislike = random.choice(excludeIngredients_1) + ',' + random.choice(
            excludeIngredients_2)

    height = random.randint(160, 190)
    weight = random.randint(60, 90)
    gender = random.choice(['male', 'female'])
    timestamp = str(time.time_ns())

    current_recipe_no = random.randint(0, 2)
    current_recipe = current_recipes[current_recipe_no:current_recipe_no + 3]

    item = [userid, email, phoneNumber, age, dislike, height, weight, gender,
            firstName, lastName, timestamp, current_recipe]
    items.append(item)

batchCreateItem(items)
print(table.scan()['Count'])
