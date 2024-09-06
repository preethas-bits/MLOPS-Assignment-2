from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)
species_dict = {0: 'setosa', 1: 'versicolor', 2: 'virginica'}
# Load the serialized model
with open('best_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200


# Define the function to map integers to species names
def map_species(int_list):
    return [species_dict[i] for i in int_list]


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features)
    output_list = map_species(prediction)
    return jsonify({'prediction': output_list})

if __name__ == '__main__':
     print("Starting Flask server...")
     app.run(host='0.0.0.0', port=5000)
