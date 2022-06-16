from flask import Flask, request
from engine import get_recommendations
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Members API Route
@app.route("/engine", methods=["GET"])

def engine():
    res = get_recommendations(request.args.get("title"))
    return res


if __name__=='__main__':
    app.run(port = 5000, debug = True)