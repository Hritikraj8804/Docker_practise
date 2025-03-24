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

**Problem:**

The JavaScript `fetch()` call inside the frontend container's browser failed with `TypeError: Failed to fetch` and `net::ERR_NAME_NOT_RESOLVED`. This was because browsers inside Docker containers often have issues resolving container names using Docker's internal DNS.

**Solution:**

Configured Nginx as a reverse proxy inside the frontend container. The frontend JavaScript now makes requests to Nginx, which then forwards them to the backend container. This approach bypasses the browser's DNS resolution limitations.

### 3. Permission Denied for Docker Commands

**Problem:**

Running Docker commands like `docker ps` resulted in a "permission denied" error, indicating the user lacked access to the Docker daemon socket.

**Solution:**

Added the user to the `docker` group using `sudo usermod -aG docker $USER` and logged out and back in (or ran `newgrp docker`).

### 4. Ephemeral Changes Inside Containers

**Problem:**

Changes made directly inside running containers using `docker exec` were lost after the container was stopped and removed.

**Solution:**

Modified the `Dockerfile` for the respective service (frontend or backend) to persist changes. Rebuilt the Docker image and re-ran the container.

### 5. Windows Line Endings (`^M`)

**Problem:**

The `index.html` file contained Windows line endings (`^M`), causing potential issues on Linux-based Docker containers.

**Solution:**

Used `dos2unix index.html` (or `sed -i 's/\r$//' index.html`) to convert the file to Unix line endings.

### 6. Correct Hostname Inside Docker Containers

**Problem:**

Using `localhost` inside a Docker container did not resolve to the host machine.

**Solution:**

Replaced `localhost` with the container name (e.g., `backend-container`) when making requests from one container to another within the same Docker network.
