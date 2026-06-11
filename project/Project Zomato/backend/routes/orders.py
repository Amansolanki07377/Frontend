from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import orders_collection, notifications_collection
from bson import ObjectId
from datetime import datetime

order_bp = Blueprint('orders', __name__)

def serialize_doc(doc):
    doc['_id'] = str(doc['_id'])
    if 'userId' in doc:
        doc['userId'] = str(doc['userId'])
    return doc

@order_bp.route('/', methods=['POST'])
@jwt_required()
def place_order():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    items = data.get('items')
    total_amount = data.get('totalAmount')
    address = data.get('address')
    phone = data.get('phone')

    if not items or not total_amount or not address or not phone:
        return jsonify({"error": "Missing order details"}), 400

    order = {
        "userId": ObjectId(user_id),
        "items": items,
        "totalAmount": total_amount,
        "address": address,
        "phone": phone,
        "status": "Placed",
        "createdAt": datetime.utcnow()
    }

    order_id = orders_collection.insert_one(order).inserted_id

    notifications_collection.insert_one({
        "orderId": order_id,
        "message": f"New order: ₹{total_amount} | Phone: {phone}",
        "type": "order",
        "status": "unread",
        "createdAt": datetime.utcnow()
    })

    return jsonify({"message": "Order placed successfully", "orderId": str(order_id)}), 201

@order_bp.route('/history', methods=['GET'])
@jwt_required()
def get_order_history():
    user_id = get_jwt_identity()
    orders = list(orders_collection.find({"userId": ObjectId(user_id)}).sort("createdAt", -1))
    return jsonify([serialize_doc(o) for o in orders]), 200

@order_bp.route('/<id>', methods=['GET'])
@jwt_required()
def get_order_details(id):
    try:
        order = orders_collection.find_one({"_id": ObjectId(id)})
        if order:
            return jsonify(serialize_doc(order)), 200
        return jsonify({"error": "Order not found"}), 404
    except:
        return jsonify({"error": "Invalid ID"}), 400
