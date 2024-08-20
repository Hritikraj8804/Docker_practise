🐋 Docker Project: SSH Connection Between Two Ubuntu Containers
This project demonstrates how to set up and establish a Secure Shell (SSH) connection between two Ubuntu containers in Docker.

Overview
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