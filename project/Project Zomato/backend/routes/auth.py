from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from db import users_collection
import bcrypt
from bson import ObjectId

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user') # 'user' or 'admin'

    if not name or not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user_id = users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password,
        "role": role,
        "address": ""
    }).inserted_id

    access_token = create_access_token(identity=str(user_id))
    return jsonify({
        "message": "User registered successfully",
        "access_token": access_token,
        "user": {
            "id": str(user_id),
            "name": name,
            "email": email,
            "role": role
        }
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    user = users_collection.find_one({"email": email})
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "id": str(user['_id']),
                "name": user['name'],
                "email": user['email'],
                "role": user.get('role', 'user')
            }
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401
