#!/bin/bash

set -e

# Compile the minishell project
make -C minishell/minishell_src

# rebuild website
cd vvsite && cargo leptos build
cd ..

# stop containers if running
docker compose down -v

# remove volumes
docker volume prune -f

docker rmi website-website website-minishell website-nginx -f


# start the containers
docker compose up
