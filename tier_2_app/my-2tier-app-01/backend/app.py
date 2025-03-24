from flask import Flask, make_response, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/') #Add this line
def hello():
    return "Welcome to the backend!"

@app.route('/api/data')
def get_data():
    data = {"message": "Hello from the backend!"}
    response = make_response(json.dumps(data))
    response.headers['Content-Type'] = 'application/json'
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) #check this line.