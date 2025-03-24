# 2-Tier Application Deployment with Docker

This project demonstrates a simple 2-tier application (frontend and backend) deployed using Docker. It highlights common challenges encountered during containerization and provides solutions.

## Project Structure

* **`backend/`**: Contains the Flask backend application.
* **`frontend/`**: Contains the static HTML/JavaScript frontend.
* **`docker-compose.yml`**: Docker Compose configuration file (optional, for easier orchestration).
* **`nginx.conf`**: Nginx configuration file for reverse proxy (solution).

## Problems and Solutions

### 1. Port Conflicts When Scaling Frontend

**Problem:**

When attempting to scale the frontend service using `docker-compose.yml` and `deploy: replicas: 5`, port conflicts occurred because multiple frontend containers tried to bind to the same host port.

**Solution:**

Implemented an Nginx reverse proxy within the frontend container. Nginx acts as a load balancer, routing requests to the backend container. This eliminates the need for multiple exposed host ports.

### 2. `TypeError: Failed to fetch` in Browser Inside Frontend Container
