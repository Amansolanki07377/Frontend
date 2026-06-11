from flask import Blueprint, request, jsonify
from db import restaurants_collection
from bson import ObjectId

restaurant_bp = Blueprint('restaurants', __name__)

def serialize_doc(doc):
    doc['_id'] = str(doc['_id'])
    return doc

@restaurant_bp.route('', methods=['GET'])
@restaurant_bp.route('/', methods=['GET'])
def get_restaurants():
    search = request.args.get('search', '')
    query = {}
    if search:
        query = {"name": {"$regex": search, "$options": "i"}}
    
    restaurants = list(restaurants_collection.find(query))
    return jsonify([serialize_doc(r) for r in restaurants]), 200

@restaurant_bp.route('/<id>', methods=['GET'])
def get_restaurant(id):
    try:
        restaurant = restaurants_collection.find_one({"_id": ObjectId(id)})
        if restaurant:
            return jsonify(serialize_doc(restaurant)), 200
        return jsonify({"error": "Restaurant not found"}), 404
    except:
        return jsonify({"error": "Invalid ID"}), 400
