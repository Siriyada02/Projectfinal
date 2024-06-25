from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import traceback
from flask_pymongo import PyMongo
import pyscrypt
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# ตั้งค่าเชื่อมต่อกับ MongoDB
app.config["MONGO_URI"] = (
    "mongodb+srv://saruttaya:1234@shop-news.fjh15tu.mongodb.net/mydata?retryWrites=true&w=majority&appName=shop-news"
)
mongo = PyMongo(app)

# เลือกหรือสร้างคอลเลคชัน
users_collection = mongo.db.shop_data
product_collection = mongo.db.product 
# เพิ่มproduct_collection

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data["username"]
    email = data["email"]
    password = generate_password_hash(data["password"])

    try:
        users_collection.insert_one(
            {"username": username, "email": email, "password": password}
        )
        return jsonify({"message": "User registered successfully", "redirect": "/login"})
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())
        return jsonify({"message": f"Failed to register user: {str(e)}"}), 500


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    try:
        user = users_collection.find_one({"email": email})
        if user and check_password_hash(user["password"], password):
            return jsonify({"message": "Login successful", "redirect": "/home"})
        else:
            return jsonify({"message": "Invalid email or password"}), 401
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())
        return jsonify({"message": f"Failed to login: {str(e)}"}), 500


@app.route("/scrypt", methods=["POST"])
def scrypt_hash():
    data = request.get_json()
    password = data["password"].encode("utf-8")
    salt = data["salt"].encode("utf-8")

    try:
        key = pyscrypt.hash(password, salt, N=1024, r=1, p=1, dkLen=32)
        return jsonify({"key": key.hex()})
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())
        return jsonify({"message": f"Failed to generate scrypt hash: {str(e)}"}), 500


@app.route("/add-product", methods=["POST"])
def add_product():
    data = request.get_json()
    name = data["name"]
    price = data["price"]
    index = data.get("index", None)  
    image = data.get("image", "")  
    stores = data.get("stores", [])  

    try:
        product = {"name": name, "price": price, "image": image, "stores": stores}
        if index is not None:
            product["index"] = index

        product_collection.insert_one(product)
        return jsonify({"message": "Product added successfully"})
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())
        return jsonify({"message": f"Failed to add product: {str(e)}"}), 500

# แก้ไขเพิ่ม
@app.route("/search", methods=["GET"])
def search_products():
    search_term = request.args.get("q", "")
    try:
        products = product_collection.find(
            {"name": {"$regex": search_term, "$options": "i"}}
        )
        products_list = [
            {
                "name": product["name"],
                "price": product["price"],
                "index": product["index"],
                "image": product.get("image", ""),
                "stores": product.get("stores", [])
            }
            for product in products
        ]
        return jsonify(products_list)
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())
        return jsonify({"message": f"Failed to search products: {str(e)}"}), 500

# เพิ่ม
@app.route("/product/<int:index>", methods=["GET"])
def get_product(index):
    try:
        product = product_collection.find_one({"index": index})
        if product:
            product["_id"] = str(product["_id"])  # แปลง ObjectId เป็น string
            return jsonify(product)
        else:
            return jsonify({"message": "Product not found"}), 404
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())
        return jsonify({"message": f"Failed to get product: {str(e)}"}), 500

# เพิ่มใหม่
@app.route('/product/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.json
    result = product_collection.update_one({'index': product_id}, {'$set': data})
    
    if result.matched_count > 0:
        return jsonify({'message': 'Product updated successfully'}), 200
    else:
        return jsonify({'message': 'Product not found'}), 404


if __name__ == "__main__":
    app.run(debug=True)
