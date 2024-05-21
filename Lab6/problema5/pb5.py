import json
import os
import sqlite3
from flask import request, abort, jsonify
from flask import Flask, render_template
from jinja2 import Template

app = Flask(__name__)


@app.route('/')
def initialize():
    dir_list = os.listdir('./directoare')
    with open('templates/index.html', 'r') as f:
        index_html = f.read()
    template = Template(index_html)
    rendered_html = template.render(list_elements=dir_list)
    with open('templates/rendered_html.html', 'w+') as f1:
        f1.write(rendered_html)
    return render_template('rendered_html.html')


@app.route('/get-file', methods=['POST'])
def get_file():
    path = os.path.join('directoare', *request.get_json()['data'])
    files = os.listdir(path)
    return json.dumps(files)


@app.route('/get-file-data', methods=['POST'])
def get_file_data():
    path = os.path.join('directoare', *request.get_json()['data'])
    with open(path, 'r') as f:
        text = f.read()
    return json.dumps(text)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8085, debug=True)
