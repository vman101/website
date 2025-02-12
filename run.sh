#!/bin/bash

set -e

# Compile the minishell project
make -C minishell/minishell_src

# stop containers if running
docker compose down -v

# remove volumes
docker volume prune -f
docker image rm website-minishell -f

# start the containers
docker compose up
