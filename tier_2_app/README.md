# Docker Tier 2 Application

This repository contains a simple Tier 2 application built for Docker practice. It demonstrates a basic architecture with a frontend application and a backend API, both containerized and orchestrated with Docker Compose.

## Architecture

* **Frontend:** A simple web application (e.g., using Flask or Node.js) that provides a user interface.
* **Backend:** An API (e.g., using Flask, FastAPI, or Node.js) that handles data processing and storage.
* **Docker Compose:** Used to define and run multi-container Docker applications.

## Prerequisites

* Docker installed on your system.
* Docker Compose installed on your system.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Build and run the Docker containers:**

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker images and start the containers defined in the `docker-compose.yml` file.

3.  **Access the application:**

    * The frontend application should be accessible at `http://localhost:<frontend_port>`. Replace `<frontend_port>` with the port number specified in your `docker-compose.yml` file.
    * The backend API should be accessible at `http://localhost:<backend_port>`. Replace `<backend_port>` with the port number specified in your `docker-compose.yml` file.

4.  **Stop the containers:**

    ```bash
    docker-compose down
    ```
