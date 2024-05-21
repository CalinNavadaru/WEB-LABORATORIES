import json
import sqlite3
from flask import request, abort
from flask import Flask, render_template
from jinja2 import Template

app = Flask(__name__)
offset = 0
limit = 3
total_number = 0


@app.route('/')
def initialize():
    connection = sqlite3.connect("pb2.db")
    cursor = connection.cursor()
    r = cursor.execute("SELECT * FROM Users LIMIT ? OFFSET ?", (limit, offset))
    persons = r.fetchall()
    r = cursor.execute("SELECT * FROM Users")
    global total_number
    total_number = len(r.fetchall())
    with open("templates/index.html", "r") as f:
        template_content = f.read()
    template = Template(template_content)
    rendered_html = template.render(list_persons=persons)
    with open("templates/rendered_html.html", "w") as f1:
        f1.write(rendered_html)
    return render_template('rendered_html.html')


@app.route('/get-page')
def get_page():
    global offset, limit
    next_page = int(request.values.get("next"))
    if next_page:
        if offset + limit > total_number:
            abort(404, description="Pagina nu exista!")
        offset += limit
    else:
        if offset - limit < 0:
            abort(404, description="Pagina nu exista!")
        offset -= limit
    connection = sqlite3.connect("pb2.db")
    cursor = connection.cursor()
    r = cursor.execute("SELECT * FROM Users LIMIT ? OFFSET ?", (limit, offset))
    persons = r.fetchall()
    return json.dumps(persons)


if __name__ == "__main__":
    app.run(port=8082, debug=True)
