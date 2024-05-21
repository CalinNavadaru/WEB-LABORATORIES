import json
import sqlite3
from flask import request
from flask import Flask, render_template
from jinja2 import Template

app = Flask(__name__)


@app.route('/')
def initialize():
    connection = sqlite3.connect("pb1.db")
    cursor = connection.cursor()
    arrival = []
    r = cursor.execute("SELECT destinatie FROM trenuri t INNER JOIN main.routes r on t.id = r.departure")
    departure = r.fetchall()
    with open("templates/index.html", "r") as f:
        template_content = f.read()
    template = Template(template_content)
    rendered_html = template.render(list1=departure, list2=arrival)
    with open("templates/rendered_html.html", "w") as f1:
        f1.write(rendered_html)
    return render_template('rendered_html.html')


@app.route('/get-arrivals', methods=['POST'])
def get_arrivals():
    departure = request.get_json()['departure']
    connection = sqlite3.connect("pb1.db")
    cursor = connection.cursor()
    r = cursor.execute("SELECT t.destinatie FROM routes r INNER JOIN main.trenuri t on t.id = r.arrival "
                       "INNER JOIN main.trenuri t2 on t2.id = r.departure WHERE t2.destinatie = ?", (departure,))
    arrival = [x[0] for x in r.fetchall()]
    return json.dumps(arrival)


if __name__ == '__main__':
    app.run(port=8081, debug=True)
