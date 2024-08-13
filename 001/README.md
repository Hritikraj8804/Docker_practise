# Node.js Dockerized Application

This repository contains a Dockerized Node.js application. The Dockerfile provided will help you create a lightweight and portable Docker image using Node.js 19 on Alpine Linux.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Dockerfile Explanation](#dockerfile-explanation)
- [Building the Docker Image](#building-the-docker-image)
- [Running the Docker Container](#running-the-docker-container)
- [Stopping the Docker Container](#stopping-the-docker-container)
- [Contributing](#contributing)


## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Make sure you have a `package.json` file and a `src` directory with your Node.js application files.

## Project Structure

The project structure should look like this:


- **Dockerfile**: Contains the instructions to build the Docker image.
- **package.json**: Specifies the dependencies and scripts for the Node.js application.
- **src/**: Directory containing the application's source code.
  - **server.js**: The main entry point of your Node.js application.
  - **other-file.js**: Example of another file in the source directory.
- **README.md**: The documentation file you're currently reading.



- **Dockerfile**: Contains instructions to build the Docker image.
- **package.json**: Contains the dependencies and metadata for the Node.js application.
- **src/server.js**: The main file that starts the Node.js server.

## Dockerfile Explanation

The Dockerfile in this repository does the following:

1. **`FROM node:19-alpine`**: Uses a lightweight Node.js 19 image based on Alpine Linux.
2. **`COPY package.json /app/`**: Copies the `package.json` file to the `/app/` directory inside the container.
3. **`COPY src /app/`**: Copies the contents of the `src` directory to the `/app/` directory inside the container.
4. **`WORKDIR /app`**: Sets the working directory inside the container to `/app`.
5. **`RUN npm install`**: Installs the Node.js dependencies.
6. **`CMD ["node", "server.js"]`**: Runs the Node.js application using `node server.js` when the container starts.

## Building the Docker Image

To build the Docker image, run the following command in the root directory of your project:

```bash
docker build -t node-app .
```

## Running the Docker Container

To run the Docker container from the image you just built, use the following command:

```bash
docker run -d -p 3000:3000 node-app
```


## Stopping the Docker Container
To stop the running Docker container, use the following command:

```bash
docker ps  # Find the container ID
docker stop <container-id>
```
Replace <container-id> with the actual ID of the running container.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your changes.
