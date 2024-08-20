🐋 Docker Project: SSH Connection Between Two Ubuntu Containers
This project demonstrates how to set up and establish a Secure Shell (SSH) connection between two Ubuntu containers in Docker.

# Overview
In this setup, Container 1 acts as the SSH server, and Container 2 connects to it as the SSH client.
```bash
[ Container 1 (Ubuntu) ] --(OpenSSH Server)-->
          |
          |
          v
        SSH Connection
          |
          |
[ Container 2 (Ubuntu) ] --(OpenSSH Client)-->
```

## Steps
### 1. Pull the Ubuntu image from Docker Hub:
```bash
docker pull ubuntu
```

### 2. Create Container 1 using the Ubuntu image:
```bash
docker run -it --name container1 ubuntu
```

### 3. Install SSH Server in Container 1:
```bash
apt-get update
apt-get install openssh-server
apt-get install nano
```

### 4. Edit the SSH configuration to allow root login:
```bash
nano /etc/ssh/sshd_config
```
Set PermitRootLogin to yes.


### 5. Start the SSH service in Container 1:
```bash
service ssh start
```

### 6. Exit from Container 1:
```bash
exit
```

### 7. Create Container 2 using the Ubuntu image:
```bash
docker run -it --name container2 ubuntu
```

### 8. Install SSH Client in Container 2:
```bash
apt-get install openssh-client
```

### 9. Start Container 1:

Set the root password in Container 1:
```bash
docker start container1
docker exec -it container1 bash
```

Set the root password:
```bash
passwd root
```

### 10. Connect from Container 2 to Container 1 via SSH:

Start Container 2:
```bash
docker start container2
docker exec -it container2 bash
```

Connect to Container 1
```bash
ssh root@<IPAddress of Container1>
```
Enter the root password set earlier.
