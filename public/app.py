from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

def create_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='new_registration_db'
    )

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = generate_password_hash(data['password'])

    try:
        connection = create_connection()
        cursor = connection.cursor()
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
        connection.commit()
        return jsonify({"message": "User registered successfully"})
    except Error as e:
        print(f"Error: '{e}'")
        return jsonify({"message": "Failed to register user"}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    try:
        connection = create_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        if user and check_password_hash(user[3], password):
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"message": "Invalid email or password"}), 401
    except Error as e:
        print(f"Error: '{e}'")
        return jsonify({"message": "Failed to login"}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
