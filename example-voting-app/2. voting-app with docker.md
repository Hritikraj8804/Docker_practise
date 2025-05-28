# Running Your Dockerized Voting App (Without Docker Compose)

### Prerequisites

Before we begin, ensure you have the following installed on your machine:

Docker Desktop: This includes the Docker Engine and Docker CLI. You can download it from Docker's official website.

Git: To clone the project repository.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n1zrhmg0r8b6queushi7.png)

## Step 1: Clone the GitHub Repository

First, you need to get the application code and Dockerfiles onto your local machine. Replace <https://github.com/dockersamples/example-voting-app.git> with the actual URL of your GitHub repository.

```
git clone https://github.com/dockersamples/example-voting-app.git
cd example-voting-app # Navigate into the cloned project directory
```

Now, your current terminal directory should be the root of your cloned repository, where you'll find the vote/, worker/, result/ directories, and potentially a docker-compose.yml (though we won't be using that file for these instructions).

## Step 2: Build Docker Images for Each Service

Navigate into each service's directory from your repository root and build its Docker image.

#### 1. Build vote app image:

```
cd vote
docker build -t voting-app .
cd ..
```
#### 2. Build worker app image:

```
cd worker
docker build -t worker-app .
cd ..
```
#### 3. Build result app image:

```
cd result
docker build -t result-app .
cd ..
```
## Step 3: Run Docker Containers (Order Matters!)

Now, we'll run each container. It's crucial to start the database and Redis first, as the worker and result apps depend on them.

#### 4. Run redis container:

This uses the official redis image

```
docker run -d --name=redis redis
```
#### 5. Run db (PostgreSQL) container:

This uses the official postgres image, sets up the database name and credentials.

```
docker run -d --name=db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password postgres
```
(Note: Docker will automatically create the db-data volume if it doesn't exist.)

#### 6. Run worker container:

This uses the worker-app image we built and passes the necessary environment variables for connecting to Redis and PostgreSQL.

```
docker run -d --link redis=redis --link db=db worker-app
```
#### 7. Run vote container:

This uses the vote-app image and maps host port 5000 to container port 80 for web access.

```
docker run -d --link redis=redis -p 5000:80 voting-app
```
#### 8. Run result container:

This uses the result-app image, maps host port 5001 to container port 80, and passes environment variables for PostgreSQL connection.

```
docker run -d -p 5001:80 --link db=db result-app
```
## Step 4: Verify and Access Your Application

After running all the commands, you can check if all containers are running:
```
docker ps
```
You should see redis, db, worker, vote, and result listed with Up status.

Now, open your web browser to access the applications:

Voting App: `http://localhost:5000`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ai0tz3gevak5so95f20i.png)

Result App: `http://localhost:5001`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uff8j6gblttuphxzzpop.png)

(caste your vote)
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k7rrvnkkluyxcnu4si51.png)
(check result)
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xjf5tam4xsvo8gknfdh2.png)



## Step 5: Clean Up (Stop and Remove Containers/Network)

When you're done, it's good practice to stop and remove the containers and the custom network to free up resources.

#### 9. Stop all containers:

```
docker stop vote result worker db redis
```
#### 10. Remove all containers:

```
docker rm vote result worker db redis
```
This detailed sequence of docker commands will get your multi-service voting application up and running without relying on Docker Compose.
