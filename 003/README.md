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

### 4. Configure Hostnames (Optional but Recommended)
You can set up hostnames in each container to make SSH connections easier:

#### In Container 1:
```bash
docker exec -it ubuntu_container_1 bash

# Edit /etc/hosts to add container 2's IP address
echo "172.17.0.3 container2" >> /etc/hosts

# Exit the container
exit
```
#### In Container 2:
```bash
docker exec -it ubuntu_container_2 bash

# Edit /etc/hosts to add container 1's IP address
echo "172.17.0.2 container1" >> /etc/hosts

# Exit the container
exit
```

### 5. SSH from One Container to the Other
You can now SSH from one container to the other:

#### From Container 1 to Container 2:
```bash
docker exec -it ubuntu_container_1 bash

# SSH into container 2 using the hostname or IP address
ssh root@container2
```
#### From Container 2 to Container 1:
```bash
docker exec -it ubuntu_container_2 bash

# SSH into container 1 using the hostname or IP address
ssh root@container1
```
