# Simple Flask Application in Docker

This project is a basic Python Flask web application containerized with Docker. It demonstrates how to create a simple web service and deploy it using Docker.

## Overview

The Flask application serves a simple web page or API endpoint. It's designed to be easily containerized and deployed using Docker.

## Prerequisites

* Docker installed on your system.

## Project Structure

.  
├── app.py          # Flask application code  
├── Dockerfile      # Dockerfile for building the image  
└── README.md       # Project documentation  

## Running the Application

### Building the Docker Image

To build the Docker image, navigate to the project directory and run:

```bash
docker build -t flask-app .
```

### Running the Docker Container
To run the Docker container, use the following command:

```bash
docker run -p 5000:5000 flask-app
```
This will start the Flask application, mapping port 5000 on your host machine to port 5000 inside the container.

### Accessing the Application
The application can be accessed at http://localhost:5000 in your web browser or using curl:

```bash
curl http://localhost:5000
```
