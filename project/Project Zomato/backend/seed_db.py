from db import restaurants_collection, food_collection, categories_collection, users_collection
import bcrypt
from bson import ObjectId

def seed():
    # Clear existing data (optional)
    # restaurants_collection.delete_many({})
    # food_collection.delete_many({})
    # categories_collection.delete_many({})

    # Add Categories
    categories = [
        {"name": "Burger", "image": "https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg"},
        {"name": "Pizza", "image": "https://img.freepik.com/free-photo/fresh-pizza-with-mushrooms-ham-cheese-tomato-isolated-white-background-top-view_639032-229.jpg"},
        {"name": "Sushi", "image": "https://img.freepik.com/free-photo/sushi-set-maki-and-nigiri-sushi-with-salmon-shrimp-and-tuna_2829-14224.jpg"},
        {"name": "Indian", "image": "https://img.freepik.com/free-photo/chicken-tikka-masala-spicy-curry-meat-food-in-pot-with-rice-and-naan-bread-dark-background_1150-42861.jpg"},
        {"name": "Desserts", "image": "https://img.freepik.com/free-photo/delicious-chocolate-cake-with-strawberries_23-2150734685.jpg"}
    ]
    
    for cat in categories:
        if not categories_collection.find_one({"name": cat["name"]}):
            categories_collection.insert_one(cat)

    # Add Admin User if not exists
    admin_email = "admin@foodie.com"
    if not users_collection.find_one({"email": admin_email}):
        hashed_password = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt())
        users_collection.insert_one({
            "name": "Admin User",
            "email": admin_email,
            "password": hashed_password,
            "role": "admin",
            "address": "Headquarters"
        })
        print("Admin user created: admin@foodie.com / admin123")

    # Add Restaurants
    restaurants = [
        {
            "name": "Burger King",
            "image": "https://img.freepik.com/free-photo/view-of-delicious-burger-and-fries-meal_23-2150491060.jpg",
            "rating": 4.5,
            "deliveryTime": "20-30 min",
            "categories": ["Burger", "Fast Food"],
            "location": "Downtown"
        },
        {
            "name": "Pizza Hut",
            "image": "https://img.freepik.com/free-photo/crispy-mixed-pizza-with-olives-and-cheese_140725-580.jpg",
            "rating": 4.2,
            "deliveryTime": "30-40 min",
            "categories": ["Pizza", "Italian"],
            "location": "Upper East Side"
        },
        {
            "name": "The Sushi Place",
            "image": "https://img.freepik.com/free-photo/side-view-of-japanese-sushi-rolls-with-salmon-and-avocado_140725-11234.jpg",
            "rating": 4.8,
            "deliveryTime": "25-35 min",
            "categories": ["Sushi", "Japanese"],
            "location": "Seaside"
        }
    ]

    for res in restaurants:
        if not restaurants_collection.find_one({"name": res["name"]}):
            res_id = restaurants_collection.insert_one(res).inserted_id
            
            # Add some food items for each restaurant
            if res["name"] == "Burger King":
                food_items = [
                    {"name": "Whopper", "price": 150, "description": "Classic beef burger", "image": "https://img.freepik.com/free-photo/delicious-burger-on-white-background_23-2150857908.jpg", "category": "Burger", "isVeg": False, "restaurantId": res_id},
                    {"name": "Veggie Burger", "price": 120, "description": "Plant-based burger", "image": "https://img.freepik.com/free-photo/gourmet-vegan-veggie-burger-on-white-background_23-2150857922.jpg", "category": "Burger", "isVeg": True, "restaurantId": res_id}
                ]
            elif res["name"] == "Pizza Hut":
                food_items = [
                    {"name": "Margherita", "price": 250, "description": "Cheesy delight", "image": "https://img.freepik.com/free-photo/top-view-of-margherita-pizza_23-2148236245.jpg", "category": "Pizza", "isVeg": True, "restaurantId": res_id},
                    {"name": "Pepperoni", "price": 350, "description": "Classic pepperoni", "image": "https://img.freepik.com/free-photo/pepperoni-pizza-with-salami-and-cheese_140725-540.jpg", "category": "Pizza", "isVeg": False, "restaurantId": res_id}
                ]
            else:
                food_items = [
                    {"name": "Salmon Roll", "price": 200, "description": "Fresh salmon", "image": "https://img.freepik.com/free-photo/sushi-rolls-with-salmon-and-cream-cheese_140725-10111.jpg", "category": "Sushi", "isVeg": False, "restaurantId": res_id}
                ]
            
            food_collection.insert_many(food_items)

    print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
