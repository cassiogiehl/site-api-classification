from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
trained_model = pickle.load(open('modelo_iris_treinado.pk1', 'rb'))

@app.route("/")
def hello():
    return "Hello World!!!!"

@app.route("/predict", methods=['POST'])
def predict():
    data = request.get_json(force=True)
    values = np.array([list(data.values())])
    prediction = trained_model.predict(values)
    response = {'predicted': int(prediction[0])}
    return jsonify(response)

app.run()