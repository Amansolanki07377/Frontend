from flask import Blueprint, request, jsonify
from db import food_collection
from bson import ObjectId

food_bp = Blueprint('food', __name__)

def serialize_doc(doc):
    doc['_id'] = str(doc['_id'])
    if 'restaurantId' in doc:
        doc['restaurantId'] = str(doc['restaurantId'])
    return doc

@food_bp.route('/restaurant/<restaurant_id>', methods=['GET'])
def get_food_by_restaurant(restaurant_id):
    try:
        food_items = list(food_collection.find({"restaurantId": ObjectId(restaurant_id)}))
        return jsonify([serialize_doc(f) for f in food_items]), 200
    except:
        # If it's not a valid ObjectId, maybe it's stored as a string by mistake, or it's just invalid
        food_items = list(food_collection.find({"restaurantId": restaurant_id}))
        return jsonify([serialize_doc(f) for f in food_items]), 200
