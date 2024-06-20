from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import traceback
from flask_pymongo import PyMongo

app = Flask(__name__)
CORS(app)

# ตั้งค่าเชื่อมต่อกับ MongoDB
app.config['MONGO_URI'] = "mongodb+srv://saruttaya:1234@shop-news.fjh15tu.mongodb.net/mydata?retryWrites=true&w=majority&appName=shop-news"
mongo = PyMongo(app)

# เลือกหรือสร้างคอลเลคชัน
users_collection = mongo.db.shop_data

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = generate_password_hash(data['password'])

    try:
        users_collection.insert_one({"username": username, "email": email, "password": password})
        return jsonify({"message": "User registered successfully"})
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())
        return jsonify({"message": f"Failed to register user: {str(e)}"}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    try:
        user = users_collection.find_one({"email": email})
        if user and check_password_hash(user['password'], password):
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"message": "Invalid email or password"}), 401
    except Exception as e:
        print(f"Error: {e}")
        print(traceback.format_exc())
        return jsonify({"message": f"Failed to login: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
