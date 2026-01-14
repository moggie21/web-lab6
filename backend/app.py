from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

@app.route('/')
def check():
    return jsonify({"message": "Hello from Flask!"})

def is_valid_email(email):
    return re.match(r'^[^@]+@[^@]+\.[^@]+$', email) is not None

@app.route('/api/feedback', methods=['GET'])
def get_feedback_info():
    return jsonify({"info": "Feedback endpoint is ready. Send POST to submit."})

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    errors = []

    if not name:
        errors.append("Имя обязательно")
    if not email:
        errors.append("Email обязателен")
    elif not is_valid_email(email):
        errors.append("Некорректный email")
    if not message:
        errors.append("Сообщение обязательно")

    if errors:
        return jsonify({"errors": errors}), 400

    return jsonify({
        "name": name,
        "email": email,
        "message": message
    }), 200



if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)