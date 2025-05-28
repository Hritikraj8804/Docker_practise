# Docker Practice Repository

This repository is dedicated to practicing and learning Docker concepts. It contains various Dockerfiles, `docker-compose.yml` files, and scripts to demonstrate different aspects of Docker, from basic image building to complex multi-container applications.

## Contents

* **`basic-image/`**: Contains examples of building simple Docker images.
    * `Dockerfile`: Example Dockerfile for a basic application.
* **`multi-stage-build/`**: Demonstrates multi-stage builds for optimized image sizes.
    * `Dockerfile`: Multi-stage Dockerfile.
* **`docker-compose/`**: Examples of using Docker Compose to manage multi-container applications.
    * `docker-compose.yml`: Docker Compose file for a simple web application with a database.
* **`volumes-bind-mounts/`**: Examples demonstrating Docker volumes and bind mounts.
    * `Dockerfile`: Dockerfile showing volume and bind mount usage.
* **`networking/`**: Examples covering Docker networking concepts.
    * `Dockerfile`: Dockerfile used in networking examples.
    * `network_script.sh`: Script to create and manage docker networks.
* **`scripts/`**: Utility scripts for automating Docker tasks.
    * `build_all.sh`: Script to build all Docker images in the repository.
    * `cleanup.sh`: Script to remove all Docker containers and images.
* **`README.md`**: This file, providing an overview of the repository.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [<repository_url>](https://github.com/Hritikraj8804/Docker_practise.git)
    cd Docker_practise
    ```

2.  **Ensure Docker is installed:**

    Verify that Docker is installed and running on your system. You can check the version using:

    ```bash
    docker --version
    docker-compose --version
    ```

3.  **Navigate to the desired directory and follow the instructions within that directory.**

    For example, to build the basic image:

    ```bash
    cd basic-image
    docker build -t my-basic-image .
    docker run my-basic-image
    ```

4.  **For Docker Compose examples:**

    Navigate to the `docker-compose/` directory and use the `docker-compose` command:

    ```bash
    cd docker-compose
    docker-compose up -d
    docker-compose down
    ```

5.  **For scripts:**

    Ensure the scripts are executable:

    ```bash
    chmod +x scripts/*.sh
    ```

    Then run the desired script:

    ```bash
    ./scripts/build_all.sh
    ```

## Examples

* **Basic Image:**

    Demonstrates how to create a simple Docker image using a Dockerfile.

* **Multi-Stage Build:**

    Shows how to use multi-stage builds to reduce image sizes by separating build dependencies from runtime dependencies.

* **Docker Compose:**

    Illustrates how to define and manage multi-container applications using Docker Compose.

* **Volumes and Bind Mounts:**

    Explains the difference between volumes and bind mounts and how to use them to persist data and share files between the host and containers.

* **Networking:**

    Covers various Docker networking concepts, including creating custom networks, linking containers, and exposing ports.

## Contributing

Contributions are welcome! If you have any improvements, bug fixes, or new examples, please submit a pull request.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes.
4.  Push to your branch.
5.  Submit a pull request.

## License

This repository is licensed under the [MIT License](LICENSE).
