import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/food_delivery')
client = MongoClient(MONGO_URI)
db = client.get_database()

# Collections
users_collection = db.users
restaurants_collection = db.restaurants
food_collection = db.food_items
orders_collection = db.orders
categories_collection = db.categories
notifications_collection = db.notifications
