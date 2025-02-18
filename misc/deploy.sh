#!/bin/bash

cd ..


# reset server_website directory
rm -rf server_website
ssh server rm -rf website
mkdir -p server_website/{minishell,vvsite/{target,debug}}

# Build server binary
cd vvsite && cargo leptos build
cp -r target/site ../server_website/vvsite/target
cp -r target/debug Dockerfile Cargo.toml ../server_website/vvsite/target/


# Build minishell files
cd ../minishell
make -C minishell_src
cp -r ./minishell_src/bin ./Dockerfile ./entrypoint.sh ../server_website/minishell

# Copy to server
cd ..
cp -r ./nginx ./compose.yaml server_website

scp -r server_website server:/home/victor/website

