import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from routes.auth import auth_bp
from routes.restaurants import restaurant_bp
from routes.food import food_bp
from routes.orders import order_bp
from routes.admin import admin_bp
from routes.users import user_bp

load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default-secret-key')
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(restaurant_bp, url_prefix='/api/restaurants')
app.register_blueprint(food_bp, url_prefix='/api/food')
app.register_blueprint(order_bp, url_prefix='/api/orders')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

@app.route('/')
def home():
    return jsonify({"message": "Food Delivery API is running"}), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('DEBUG', 'True') == 'True')
