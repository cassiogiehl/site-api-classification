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
    dados = request.get_json(force=True)
    prediction = trained_model.predict(np.array([list(dados.values())]))
    result = prediction[0]
    response = {'predicted': int(result)}
    return jsonify(response)

app.run()