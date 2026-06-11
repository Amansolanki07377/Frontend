from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import users_collection
from bson import ObjectId

user_bp = Blueprint('users', __name__)

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = users_collection.find_one({"_id": ObjectId(user_id)}, {"password": 0})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    update_data = {}
    if 'name' in data: update_data['name'] = data['name']
    if 'address' in data: update_data['address'] = data['address']
    
    users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
    return jsonify({"message": "Profile updated successfully"}), 200
