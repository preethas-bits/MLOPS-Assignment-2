# MLOps Assignment 2 - Part 4
## M4: Deployment using cloud services



## Overview

This project hosts a microservice with an endpoint predict using Flask

## Setup Instructions

### Prerequisites

- Python 3.x
- Flask
- Scikit
- numpy

### Installation

1. Download Zip, extract and open command prompt with extracted repository directory.
   
2. Create a virtual environment:
    python -m venv venv

3. Activate the virtual environment:

    - On Windows:
        venv\Scripts\activate
      
    - On macOS/Linux:
        source venv/bin/activate

4. Install the dependencies:
    pip install -r requirements.txt

### Running the Application

1. Start the Flask application:
    python main.py

2. Open your web browser and go to http://127.0.0.1:5000.

### Using the Application

curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d "{\"features\": [5.1, 3.5, 1.4, 0.2]}"


