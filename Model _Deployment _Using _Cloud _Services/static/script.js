async function sendPredictionRequest() {
    if (!validateForm()) {
        return;
    }
    // Get values from form inputs
    const Pclass = document.getElementById('Pclass').value;
    const Sex_encoded = document.querySelector('input[name="Sex_encoded"]:checked').value;
    const Age = document.getElementById('Age').value;
    const SibSp = document.getElementById('SibSp').value;
    const Parch = document.getElementById('Parch').value;
    const Fare = document.getElementById('Fare').value;
    const Embarked_encoded = document.querySelector('input[name="Embarked_encoded"]:checked').value;

    // Create the JSON payload
    const payload = {
        Pclass: parseInt(Pclass),
        Sex_encoded: parseInt(Sex_encoded),
        Age: parseFloat(Age),
        SibSp: parseInt(SibSp),
        Parch: parseInt(Parch),
        Fare: parseFloat(Fare),
        Embarked_encoded: parseInt(Embarked_encoded)
    };

    try {
        fetch('http://4.156.132.129:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
           })
        .then(response => response.json())
        .then(result => {
          if (result.prediction == 'true') {
            document.getElementById('result').innerText = 'Patient survived';
          } else {
            document.getElementById('result').innerText = 'Patient did not survive';
          }
        })

    } catch (error) {
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
}

function validateForm() {
    const pclass = parseInt(document.getElementById('Pclass').value, 10);
    const age = parseInt(document.getElementById('Age').value, 10);
    const sibsp = parseInt(document.getElementById('SibSp').value, 10);
    const parch = parseInt(document.getElementById('Parch').value, 10);

    let valid = true;
    let errorMessage = '';

    // Validate Pclass
    if (isNaN(pclass) || pclass < 1 || pclass > 3) {
        valid = false;
        errorMessage += 'Pclass must be 1, 2, or 3.\n';
    }

    // Validate Age
    if (isNaN(age) || age < 0 || age > 100) {
        valid = false;
        errorMessage += 'Age must be between 0 and 100.\n';
    }

    // Validate SibSp
    if (isNaN(sibsp) || sibsp < 0 || sibsp > 10) {
        valid = false;
        errorMessage += 'SibSp must be between 0 and 10.\n';
    }

    // Validate Parch
    if (isNaN(parch) || parch < 0 || parch > 2) {
        valid = false;
        errorMessage += 'Parch must be between 0 and 2.\n';
    }

    if (!valid) {
        alert(errorMessage);
    }

    return valid;
}

