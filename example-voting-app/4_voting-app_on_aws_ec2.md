# From Localhost to the Cloud: Deploying a Dockerized Microservices App on AWS EC2

You've built and run your Dockerized microservices application locally, perhaps using `docker compose`. That's fantastic! Now, let's take the next logical step: deploying it to the cloud. This guide will walk you through deploying our polyglot voting application onto an **AWS EC2 instance**, making it accessible from anywhere in the world.

This tutorial covers:
* Launching an EC2 instance and configuring its security.
* Installing Docker and Docker Compose on a Linux server.
* Deploying your multi-container application to the cloud.

Let's get started!

---

### Understanding Our Voting App's Architecture (A Quick Recap)

Our application is composed of several Docker containers working together:

* **`vote` (Python/Flask):** User-facing voting interface.
* **`redis` (Redis):** Message queue for votes.
* **`worker` (.NET):** Processes votes from Redis and saves to PostgreSQL.
* **`db` (PostgreSQL):** Stores the persistent vote counts.
* **`result` (Node.js/React):** Displays real-time vote results.

All these services are defined in our `docker-compose.yml` file, making local orchestration simple. Now, we'll use that same file to deploy them on a cloud server.

### Prerequisites

Before you begin, ensure you have:

* An **AWS Account**.
* Basic familiarity with the **AWS Management Console**.
* An **SSH client** (like OpenSSH on Linux/macOS, or PuTTY on Windows).
* **Git** installed on your local machine.
* Your project repository cloned locally:
    ```bash
    git clone https://github.com/dockersamples/example-voting-app.git # Replace with your actual repo URL
    cd example-voting-app
    ```

---

### Step 1: Launching Your EC2 Instance on AWS

We'll start by provisioning a virtual server (EC2 instance) where our Docker containers will live.

1.  **Log in to your AWS Management Console.**
2.  Navigate to **EC2** from the Services menu.
3.  Click **"Launch instances"**.
4.  **Name and tags:** Give your instance a memorable name, e e.g., `VotingAppServer`.
5.  **Application and OS Images (Amazon Machine Image - AMI):**
    * Choose `Ubuntu` (e.g., `Ubuntu Server 22.04 LTS (HVM), SSD Volume Type`). This is a popular and well-supported choice for Docker.
6.  **Instance type:**
    * Select `t2.micro` or `t3.micro` (Free tier eligible, suitable for this demo).
7.  **Key pair (login):**
    * Choose an existing key pair or **create a new key pair**. If you create a new one, download the `.pem` file immediately and keep it secure. You'll need this to SSH into your instance.
8.  **Network settings:**
    * Click **"Edit"** next to Network settings.
    * **Security group:** This is CRUCIAL. Create a new security group or select an existing one that allows the necessary inbound traffic.
        * **Rule 1: SSH (Port 22):** Source type: `My IP` or `Anywhere` (less secure for production, but fine for learning).
        * **Rule 2: Custom TCP (Port 8080):** For your Vote App. Source type: `Anywhere`.
        * **Rule 3: Custom TCP (Port 8081):** For your Result App. Source type: `Anywhere`.
        * *Optional:* If you directly expose Redis or PostgreSQL, add their ports (6379, 5432) but this is generally NOT recommended for production.

![security inbounds](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eu4asc2kyp0rl1fo8zhb.png)

9.  **Configure storage:** Default 8 GiB is usually fine for a `t2.micro`.
10. **Launch instance.**
11. Once the instance state changes to `Running`, copy its **Public IPv4 address** or **Public IPv4 DNS** from the EC2 Instances dashboard. You'll need this for connecting.

---

### Step 2: Connecting to Your EC2 Instance via SSH

Now, let's connect to your newly launched server.

1.  Open your terminal (or PuTTY/WSL).
2.  Navigate to the directory where you saved your `.pem` key file.
3.  Set correct permissions for your key (if on Linux/macOS):
    ```bash
    chmod 400 your-key-pair-name.pem
    ```
4.  Connect to your instance. Replace `your-key-pair-name.pem` and `your-ec2-public-ip` with your actual values:
    ```bash
    ssh -i your-key-pair-name.pem ubuntu@your-ec2-public-ip
    ```
    *(`ubuntu` is the default username for Ubuntu AMIs. If you chose a different AMI like Amazon Linux, the username might be `ec2-user`.)*

You should now be logged into your EC2 instance's command line.

---

### Step 3: Install Docker and Docker Compose on EC2

By default, Docker isn't installed on fresh EC2 instances. Let's install it.

1.  **Update package lists:**
    ```bash
    sudo apt update
    ```
2.  **Install essential packages for Docker's repository:**
    ```bash
    sudo apt install ca-certificates curl gnupg lsb-release -y
    ```
3.  **Add Docker's official GPG key:**
    ```bash
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    ```
4.  **Set up the Docker repository:**
    ```bash
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```
5.  **Install Docker Engine and Docker Compose Plugin:**
    ```bash
    sudo apt update
    sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
    ```
6.  **Add your user to the `docker` group:**
    This allows you to run Docker commands without `sudo`.
    ```bash
    sudo usermod -aG docker ubuntu
    ```
    You will need to apply this change. The easiest way is to **log out of your SSH session and log back in**.
    ```bash
    exit # log out
    # Then reconnect from your local machine:
    ssh -i your-key-pair-name.pem ubuntu@your-ec2-public-ip
    ```
7.  **Verify installations:**
    ```bash
    docker --version
    docker compose version # Note: it's 'docker compose' (v2), not 'docker-compose' (v1)
    ```

---

### Step 4: Deploy Your Application to EC2

Now that Docker is ready, let's get your application code onto the EC2 instance and deploy it.

1.  **Clone your project repository on the EC2 instance:**
    ```bash
    git clone https://github.com/dockersamples/example-voting-app.git # Use your actual repo URL
    ```
2.  **Navigate into your project directory:**
    ```bash
    cd example-voting-app
    ```
3.  **Build and run your application using Docker Compose:**
    We'll add `-d` to run it in detached mode (background).
    ```bash
    docker compose up --build -d
    ```
    This command will build the custom images, pull the official ones, set up the network and volumes, and start all your services.

---

### Step 5: Access Your Application from Anywhere!

Your application is now running on your EC2 instance! You can access it using your instance's Public IP address.

* **Voting App:** `http://<your-ec2-public-ip>:8080`
* **Result App:** `http://<your-ec2-public-ip>:8081`

**Troubleshooting Tip:** If you can't access the apps, double-check your EC2 Security Group rules (Step 1) to ensure ports 8080 and 8081(and 22 for SSH) are open to your IP or `Anywhere`.

### Step 6: Monitoring and Management

While your SSH session is open (or you can reconnect), you can manage your running containers:

* **List running containers:**
    ```bash
    docker ps
    ```
* **View logs for a specific service (e.g., the worker):**
    ```bash
    docker logs worker
    ```
* **Stop and remove all services (and clear data volume):**
    ```bash
    docker compose down -v
    ```

---

### Conclusion

You've successfully deployed a multi-service Dockerized application from your local machine to an AWS EC2 instance! This is a fundamental step in building cloud-native applications. You've seen how easy Docker Compose makes orchestrating complex applications, even on a remote server.

What's next?
* Configure a **domain name** for your application instead of an IP address.
* Implement **HTTPS/SSL** for secure communication.
* Explore **AWS Elastic Container Service (ECS)** or **Kubernetes (EKS)** for more advanced container orchestration.
* Add **monitoring and logging** tools to your deployment.

If you found this guide helpful, please share it, and feel free to star the [GitHub Repo Link Here - https://github.com/Hritikraj8804/Docker_practise.git]! Let me know if you have any questions in the comments below.

---
