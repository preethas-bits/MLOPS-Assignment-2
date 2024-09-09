# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install virtualenv
RUN pip install --no-cache-dir virtualenv

# Create a virtual environment
RUN virtualenv venv

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies inside the virtual environment
RUN . venv/bin/activate && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["sh", "-c", ". venv/bin/activate && python main.py"]

