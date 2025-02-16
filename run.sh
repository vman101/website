#!/bin/bash

set -e

# Compile the minishell project
make -C minishell/minishell_src

# stop containers if running
docker compose down -v

# remove volumes
docker volume prune -f
docker network rm website_website_net -f
docker rmi website-nginx

# start the containers
docker compose up
