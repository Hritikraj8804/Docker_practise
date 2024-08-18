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

### 2. Install SSH Server on Both Containers
Access each container and install the SSH server:

#### In Container 1:
```bash
docker exec -it ubuntu_container_1 bash

# Inside the container
apt-get update
apt-get install -y openssh-server

# Start the SSH service
service ssh start

# Exit the container
exit
```

#### In Container 2:
```bash
docker exec -it ubuntu_container_2 bash

# Inside the container
apt-get update
apt-get install -y openssh-server

# Start the SSH service
service ssh start

# Exit the container
exit
```

### 3. Obtain the IP Addresses of the Containers
Get the IP addresses of both containers:
```bash
# Get the IP address of container 1
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ubuntu_container_1

# Get the IP address of container 2
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ubuntu_container_2
```
