#!/bin/bash

# Download alpine iso
wget https://dl-cdn.alpinelinux.org/alpine/v3.19/releases/x86_64/alpine-standard-3.19.0-x86_64.iso -O alpine/alpine.iso

# Create qemu volume
qemu-img create -f qcow2 alpine.qcow2 2
