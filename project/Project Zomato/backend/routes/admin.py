from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import users_collection, restaurants_collection, food_collection, orders_collection, notifications_collection
from bson import ObjectId

admin_bp = Blueprint('admin', __name__)

def admin_required(fn):
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user and user.get('role') == 'admin':
            return fn(*args, **kwargs)
        return jsonify({"error": "Admin access required"}), 403
    wrapper.__name__ = fn.__name__
    return wrapper

@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
@admin_required
def get_stats():
    total_orders = orders_collection.count_documents({})
    total_users = users_collection.count_documents({"role": "user"})
    total_restaurants = restaurants_collection.count_documents({})
    unread_notifications = notifications_collection.count_documents({"status": "unread"})
    
    # Simple revenue calculation
    orders = orders_collection.find({})
    total_revenue = sum(order.get('totalAmount', 0) for order in orders)

    return jsonify({
        "totalOrders": total_orders,
        "totalUsers": total_users,
        "totalRestaurants": total_restaurants,
        "totalRevenue": total_revenue,
        "unreadNotifications": unread_notifications
    }), 200

@admin_bp.route('/restaurants', methods=['POST'])
@jwt_required()
@admin_required
def add_restaurant():
    data = request.get_json()
    res_id = restaurants_collection.insert_one(data).inserted_id
    return jsonify({"message": "Restaurant added", "id": str(res_id)}), 201

@admin_bp.route('/food', methods=['POST'])
@jwt_required()
@admin_required
def add_food_item():
    data = request.get_json()
    if 'restaurantId' in data:
        data['restaurantId'] = ObjectId(data['restaurantId'])
    food_id = food_collection.insert_one(data).inserted_id
    return jsonify({"message": "Food item added", "id": str(food_id)}), 201

# Add Edit/Delete functionality as needed
@admin_bp.route('/restaurants/<id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_restaurant(id):
    restaurants_collection.delete_one({"_id": ObjectId(id)})
    # Also delete its food items
    food_collection.delete_many({"restaurantId": ObjectId(id)})
    return jsonify({"message": "Restaurant and its food items deleted"}), 200


@admin_bp.route('/restaurants/<id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_restaurant(id):
    data = request.get_json() or {}
    # Normalize categories if provided as comma string
    if 'categories' in data and isinstance(data['categories'], str):
        data['categories'] = [c.strip() for c in data['categories'].split(',') if c.strip()]
    try:
        restaurants_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        return jsonify({"message": "Restaurant updated"}), 200
    except Exception as e:
        return jsonify({"error": "Invalid ID or update failed", "details": str(e)}), 400

@admin_bp.route('/notifications', methods=['GET'])
@jwt_required()
@admin_required
def get_notifications():
    notifications = list(notifications_collection.find({}).sort('createdAt', -1).limit(10))
    for notification in notifications:
        notification['_id'] = str(notification['_id'])
        notification['orderId'] = str(notification['orderId'])
        notification['createdAt'] = notification['createdAt'].isoformat()
    return jsonify(notifications), 200

@admin_bp.route('/notifications/<id>/read', methods=['POST'])
@jwt_required()
@admin_required
def mark_notification_read(id):
    notifications_collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": "read"}})
    return jsonify({"message": "Notification marked read"}), 200


@admin_bp.route('/food', methods=['GET'])
@jwt_required()
@admin_required
def get_food_items():
    restaurant_id = request.args.get('restaurantId', '')
    query = {}
    if restaurant_id:
        try:
            query = {"restaurantId": ObjectId(restaurant_id)}
        except:
            return jsonify({"error": "Invalid restaurant ID"}), 400
    
    foods = list(food_collection.find(query))
    for food in foods:
        food['_id'] = str(food['_id'])
        if 'restaurantId' in food:
            food['restaurantId'] = str(food['restaurantId'])
    return jsonify(foods), 200


@admin_bp.route('/food/<id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_food_item(id):
    data = request.get_json() or {}
    if 'restaurantId' in data and isinstance(data['restaurantId'], str):
        data['restaurantId'] = ObjectId(data['restaurantId'])
    try:
        food_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        return jsonify({"message": "Food item updated"}), 200
    except Exception as e:
        return jsonify({"error": "Invalid ID or update failed", "details": str(e)}), 400


@admin_bp.route('/food/<id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_food_item(id):
    try:
        food_collection.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "Food item deleted"}), 200
    except:
        return jsonify({"error": "Invalid ID"}), 400
