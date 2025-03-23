# Simple Node.js Web App Docker Image

This repository contains the Dockerfile for a basic Node.js web application. It serves a simple HTML page displaying "Hello from Node.js!" and the current time.

## Getting Started

### Prerequisites

* Docker installed on your machine.

### Building the Image

1.  Clone this repository:

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  Build the Docker image:

    ```bash
    docker build -t yourusername/simple-node-app:latest .
    ```

    * Replace `yourusername` with your Docker Hub username.

### Running the Container

1.  Run the Docker container, mapping port 3000:

    ```bash
    docker run -p 3000:3000 yourusername/simple-node-app:latest
    ```

2.  Open your web browser and go to `http://localhost:3000/`.

### Pushing to Docker Hub (Optional)

1.  Log in to Docker Hub:

    ```bash
    docker login
    ```

2.  Push the image:

    ```bash
    docker push yourusername/simple-node-app:latest
    ```

### Dockerfile Explanation

* Uses `node:18-slim` as the base image.
* Copies `package.json` and `package-lock.json` and installs dependencies.
* Copies application code.
* Exposes port 3000.
* Runs the application using `node index.js`.
