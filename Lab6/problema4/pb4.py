import json
import random
import string

from flask import Flask, render_template
from flask import request

app = Flask(__name__)


@app.route('/')
def initialize():
    return render_template('index.html')


def check_winner(data: list[list[str]], user_start: int):
    for row in data:
        if row.count(row[0]) == len(row):
            if row[0] == 'X':
                return 2 - user_start
            else:
                return 1 + user_start

    for j in range(len(data[0])):
        check = []
        for row in data:
            check.append(row[j])
        if check.count(check[0]) == len(check):
            if check[0] == 'X':
                return 2 - user_start
            else:
                return 1 + user_start

    if data[0][0] == data[1][1] == data[2][2]:
        if data[0][0] == 'X':
            return 2 - user_start
        else:
            return 1 + user_start
    if data[0][2] == data[1][1] == data[2][0]:
        if data[0][2] == 'X':
            return 2 - user_start
        else:
            return 1 + user_start

    for i in range(len(data)):
        for j in range(len(data)):
            if data[i][j] in string.digits:
                return 0

    return -1


@app.route('/determine-winner', methods=['POST'])
def determine_winner():
    data = request.get_json()['data']
    user_start = int(request.get_json()['user'])
    result = check_winner(data, user_start)
    return json.dumps(result)


@app.route('/get-char', methods=['POST'])
def get_char():
    list_coords = []
    data = request.get_json()['data']
    character = request.get_json()['character']
    for i in range(len(data)):
        for j in range(len(data[0])):
            if data[i][j] in "0123456789":
                list_coords.append((i, j))

    coord = random.sample(list_coords, 1)
    i, j = coord[0]
    data[i][j] = character
    return json.dumps([i, j])


if __name__ == "__main__":
    app.run(port=8084, debug=True)
