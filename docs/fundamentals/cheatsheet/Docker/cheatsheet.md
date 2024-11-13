
# Docker Cheatsheet

## Basic Docker Commands

```bash
# Check Docker version
docker --version

# Get detailed Docker information
docker info

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List all local images
docker images

# Inspect a container
docker inspect container_id_or_name

# Create and start a container from an image
docker run -d --name container_name image_name

# Stop a container
docker stop container_name_or_id

# Start a stopped container
docker start container_name_or_id

# Remove a container
docker rm container_name_or_id

# Remove an image
docker rmi image_name_or_id

# Run a command inside a running container
docker exec -it container_name_or_id bash

# Run a command inside a container without interactive shell
docker exec container_name_or_id command

# Load an image from a tar file
docker load < path_to_image.tar

# Save an image to a tar file
docker save image_name -o path_to_image.tar
```

## Docker Compose

```bash
# Check Docker Compose version
docker-compose --version

# Run services defined in docker-compose.yml
docker-compose up -d

# Stop services
docker-compose down

# View service logs
docker-compose logs

# Build or rebuild services
docker-compose build

# Create a new container from a service defined in docker-compose.yml
docker-compose run service_name
```

## Docker Volumes and Networks

```bash
# Create a Docker volume
docker volume create volume_name

# List volumes
docker volume ls

# Inspect a volume
docker volume inspect volume_name

# Create a Docker network
docker network create network_name

# List networks
docker network ls

# Connect a container to a network
docker network connect network_name container_name
```