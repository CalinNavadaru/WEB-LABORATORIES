import json
import re
import sqlite3
from flask import request, abort
from flask import Flask, render_template
from jinja2 import Template

app = Flask(__name__)


@app.route('/')
def initialize():
    return render_template('index.html')


@app.route('/get-id', methods=['GET'])
def get_list_id():
    connection = sqlite3.connect("pb3.db")
    cursor = connection.cursor()
    r = cursor.execute("SELECT id FROM main.Users")
    ids = r.fetchall()
    return json.dumps(ids)


@app.route('/get-data', methods=['GET'])
def get_data_person():
    person_id = int(request.values.get("id"))
    connection = sqlite3.connect("pb3.db")
    cursor = connection.cursor()
    r = cursor.execute("SELECT * FROM main.Users WHERE id = ?", (person_id,))
    person = r.fetchall()
    return json.dumps(person)


def validate_data(data):
    if not data['first_name'] or not data['last_name']:
        return "First name and last name are required."

    if not re.match(r'^(0|\+40)\d{9}$', data['phone_number']):
        return "Invalid Romanian phone number."

    if not re.match(r'[^@]+@[^@]+\.[^@]+', data['email']):
        return "Invalid email address."

    value = int(data['id'])
    if not isinstance(value, int) or value <= 0:
        return "Invalid ID."

    return ""


@app.route('/update-user', methods=['POST'])
def update_user():
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    phone_number = request.get_json()['phone_number']
    email = request.get_json()['email']
    id = request.get_json()['id']
    print(request.get_json())
    error = validate_data(request.get_json())
    if error:
        abort(400, error)
    connection = sqlite3.connect("pb3.db")
    cursor = connection.cursor()
    r = cursor.execute("UPDATE Users SET first_name = ?, "
                       "last_name = ?, phone_number = ? "
                       ",email = ? WHERE id = ?",
                       (first_name, last_name, phone_number, email, id,))

    connection.commit()
    return json.dumps({"status": "success", "message": "User updated successfully"})


if __name__ == "__main__":
    app.run(debug=True)
