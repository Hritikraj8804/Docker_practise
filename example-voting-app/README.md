# 🗳️ Dockerized Voting Application: A Microservices Learning Sandbox

This repository is a hands-on project designed to help you learn and practice core Docker concepts by building a distributed, polyglot microservices application. It demonstrates how different services, written in various programming languages, can communicate and work together seamlessly using Docker containers.

**Crucially, this repository also showcases various ways to run and orchestrate this multi-container application, providing flexibility for different learning styles and deployment scenarios.**

## 🚀 Project Overview

Our voting application is broken down into five distinct services, each running in its own Docker container:

1.  **`vote` (Python/Flask):** The user-facing web application where users cast their votes (e.g., "Cats" or "Dogs").
2.  **`redis` (Redis):** An in-memory data store used as a fast message queue to temporarily store incoming votes.
3.  **`worker` (.NET):** A background service that consumes votes from Redis and persists them into the PostgreSQL database.
4.  **`db` (PostgreSQL):** The relational database that stores the definitive vote counts.
5.  **`result` (Node.js/React):** Another user-facing web application that fetches and displays the current vote counts from PostgreSQL in real-time.

### Architectural Flow

![workflow](https://github.com/user-attachments/assets/4e415724-7a03-44d2-a369-4ae53beaeec1)


This architecture highlights:

  * **Microservices:** Each component is an independent, deployable service.
  * **Polyglot:** Services are built using different programming languages and technologies.
  * **Asynchronous Communication:** Redis acts as a message queue, decoupling the vote submission from the database write.
  * **Data Persistence:** PostgreSQL ensures vote counts are stored reliably.

## ✨ Features

  * **Containerized Services:** Each component runs in its own Docker container.
  * **Multiple Deployment Methods:** Learn to run the project using either `docker compose` or individual `docker run` commands.
  * **Cross-Language Communication:** Demonstrates how services built with Python, .NET, and Node.js can interact.
  * **Persistent Data:** Uses a Docker volume to ensure PostgreSQL data is saved across container restarts.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your system:

  * **Docker Desktop:** This includes Docker Engine, Docker CLI, and Docker Compose.
      * [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
  * **Git:** To clone this repository.

## 🚀 Getting Started: Choose Your Method\!

### [Introduction](./1_Voting-app.md) 
### [Method 1 : _voting-app with docker](./2_voting-app_with_docker.md)
### [Method 2 : voting-app with docker-compose](./3_voting-app_with_docker-compose.md) 
### [Method_3 : voting-app on aws ec2](./4_voting-app_on_aws_ec2.md)

## 📂 Project Structure

```
.
├── docker-compose.yml       # Defines and orchestrates all services (for Method 1)
├── vote/                    # Python/Flask Voting App (contains Dockerfile & code)
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
├── worker/                  # .NET Background Worker (contains Dockerfile & code)
│   ├── Dockerfile
│   ├── Worker.csproj
│   └── Program.cs
└── result/                  # Node.js/React Results App (contains Dockerfile & code)
    ├── Dockerfile
    ├── server.js
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        └── App.js
```

## 🤝 Contributing

Feel free to fork this repository, open issues, or submit pull requests to improve the project or add new features\!
