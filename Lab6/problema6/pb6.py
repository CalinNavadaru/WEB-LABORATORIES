import json
import sqlite3
from flask import request, abort, jsonify
from flask import Flask, render_template
from jinja2 import Template

app = Flask(__name__)


def get_data(result):
    set_p = set()
    set_r = set()
    set_c = set()
    set_v = set()
    for elem in result:
        set_p.add(elem[1])
        set_r.add(elem[2])
        set_c.add(elem[3])
        set_v.add(elem[4])
    return set_p, set_r, set_c, set_v


@app.route('/')
def initialize():
    connection = sqlite3.connect('pb6.db')
    cursor = connection.cursor()
    r = cursor.execute("SELECT * FROM computers")
    result = r.fetchall()
    set_p, set_r, set_c, set_v = get_data(result)
    with open('templates/index.html', 'r') as f:
        index_html = f.read()
    template = Template(index_html)
    rendered_html = template.render(list_comp=result, set_p=set_p, set_r=set_r, set_c=set_c, set_v=set_v)
    with open('templates/rendered_html.html', 'w+') as f1:
        f1.write(rendered_html)
    return render_template('rendered_html.html')


def construct_query_string(request_args):
    query = "SELECT * FROM computers WHERE id > 0"
    if 'procesor' in request_args:
        query += " AND procesor = '{}'".format(request_args['procesor'])
    if 'ram' in request_args:
        query += " AND memorie = '{}'".format(request_args['ram'])
    if 'capacitate' in request_args:
        query += " AND capacitate = '{}'".format(request_args['capacitate'])
    if 'video' in request_args:
        query += " AND placa_video = '{}'".format(request_args['video'])
    return query


@app.route('/filter', methods=['POST'])
def filter_data():
    connection = sqlite3.connect('pb6.db')
    cursor = connection.cursor()
    filter_args = request.get_json()
    query_string = construct_query_string(filter_args)
    r = cursor.execute(query_string)
    result = r.fetchall()
    if not result:
        abort(404, 'Nu am gasit niciun element')
    return json.dumps(result)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8086, debug=True)
