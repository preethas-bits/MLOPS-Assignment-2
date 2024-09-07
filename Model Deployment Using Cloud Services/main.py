from flask import Flask, request, jsonify,render_template
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Load the serialized model
with open('titanic_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)
    
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200




@app.route('/')
def index():
    # Render the main index.html page
    return render_template('index.html')

@app.route('/predict', methods=['POST','OPTIONS'])
def predict():
    data = request.get_json(force=True)
    # Print the received values for debugging
    print("Received features:", data)
    feature_names = ['Pclass', 'Sex_encoded', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked_encoded']
     # Extract features from the request data
    features = {
        'Pclass': [data['Pclass']],
        'Sex_encoded': [data['Sex_encoded']],
        'Age': [data['Age']],
        'SibSp': [data['SibSp']],
        'Parch': [data['Parch']],
        'Fare': [data['Fare']],
        'Embarked_encoded': [data['Embarked_encoded']]
    }

    # Convert features to a DataFrame and apply scaling
    features_df = pd.DataFrame(features, columns=feature_names)
    features_scaled = scaler.transform(features_df)

    prediction = model.predict(features_scaled)[0]
    result = 'true' if prediction == 1 else 'false'
  
    return jsonify({'prediction': result , 'ok': 'true'})

if __name__ == '__main__':
     print("Starting Flask server...")
     app.run(host='0.0.0.0', port=5000)
