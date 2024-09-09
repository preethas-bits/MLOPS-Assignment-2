from flask import Flask, request, jsonify
import h2o
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Initialize H2O
h2o.init()

# Load the saved H2O model
model_path = './best_model/StackedEnsemble_AllModels_6_AutoML_1_20240906_151743'
model = h2o.load_model(model_path)

print("model loaded")

def interpret_prediction(probability):
    # Define the threshold
    threshold = 0.5
    
    # Compare the probability to the threshold
    if probability < threshold:
        return "Not Survived"  # or 0
    else:
        return "Survived"  # or 1

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the request
    data = request.json
    print(data)
    # Convert the data into an H2OFrame
    df = pd.DataFrame([data])
    h2o_frame = h2o.H2OFrame(df)
    # Make prediction
    predictions = model.predict(h2o_frame)
    
    # Convert predictions to JSON format
    result = predictions.as_data_frame().to_dict(orient='records')
    # Extract the value of 'predict'
    predict_value = result[0]['predict']

    # Print the result
    print(f"The value of predict is: {interpret_prediction(predict_value)}")
    returnVal = interpret_prediction(predict_value)
    return jsonify(returnVal)

if __name__ == '__main__':
    app.run(debug=True)
