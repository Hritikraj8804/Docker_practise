# Setting up SSH Connection Between Two Ubuntu Containers in Docker

This guide explains how to set up an SSH connection between two Ubuntu containers running in Docker. This setup can be useful for remote management, automated scripting, secure communication, and more.

## Prerequisites

- Docker installed on your machine
- Basic knowledge of Docker and Linux commands

## Steps to Set Up SSH Connection

### 1. Create and Run Two Ubuntu Containers

Start by creating and running two Ubuntu containers:

```bash
# Create and run container 1
docker run -itd --name ubuntu_container_1 ubuntu

# Create and run container 2
docker run -itd --name ubuntu_container_2 ubuntu
```