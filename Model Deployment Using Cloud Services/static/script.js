  function analyzeSentiment() {
            var text = document.getElementById('inputText').value;
            if (!text.trim()) {
               alert('Please fill in all the fields');
            } else {
              fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text
                }),
               })
            .then(response => response.json())
            .then(result => {
              showResults(result);
            })

            }

        }




function showResults(result) {
  var text = document.getElementById('inputText').value;
            var resultDiv = document.getElementById('result');
            var sentimentLabel = document.getElementById('sentimentLabel');
            var sentimentBar = document.getElementById('chart');
            sentimentBar.className = "show";
            // Simulate sentiment analysis result
            var sentiment = result.sentiment; // Replace with actual sentiment result
            var sentimentScore = result.confidence;  // Replace with actual sentiment score (between 0 and 1)

            // Set the sentiment label and color
            if (sentiment === "Positive") {
                sentimentLabel.innerHTML = "Positive";
                sentimentLabel.className = "sentiment-label positive";
                sentimentBar.className = "bar bar-positive";
            } else if (sentiment === "Negative") {
                sentimentLabel.innerHTML = "Negative";
                sentimentLabel.className = "sentiment-label negative";
                sentimentBar.className = "bar bar-negative";
            } else {
                sentimentLabel.innerHTML = "Neutral";
                sentimentLabel.className = "sentiment-label neutral";
                sentimentBar.className = "bar bar-neutral";
            }

            // Set the bar width based on the sentiment score
            sentimentBar.style.width = (sentimentScore * 100) + "%";
            sentimentBar.innerHTML = (sentimentScore * 100).toFixed(0) + "%";

            // Display the result
            resultDiv.innerHTML = "Sentiment: " + sentiment;
}

// Function to upload a CSV file to the server
function uploadFile() {
    var formData = new FormData(document.getElementById('uploadForm'));

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAsTable(data.data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showAsTable(jsonData){
 // Get table body element
        const tbody = document.querySelector('tbody');

        jsonData.forEach(item => {
            const row = document.createElement('tr');

            const cellText = document.createElement('td');
            cellText.textContent = item.text;
            row.appendChild(cellText);

            const cellSentiment = document.createElement('td');
            cellSentiment.textContent = item.sentiment;
            if (item.sentiment == 'Negative') {
              cellSentiment.className = 'red';
            } else if (item.sentiment == 'Positive') {
              cellSentiment.className = 'green';
            }
            row.appendChild(cellSentiment);

            const cellConfidence = document.createElement('td');
            cellConfidence.textContent = item.confidence;
            row.appendChild(cellConfidence);

            tbody.appendChild(row);
        });
}



function openTab(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
