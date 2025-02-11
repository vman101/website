#!/bin/bash

# run qemu vm
qemu-system-x86_64 \
    -m 512M \
    -hda alpine.qcow2 \
    -cdrom alpine.iso \
    -boot d \
    -net nic -net user \
    -vnc :1 \
    -monitor telnet:127.0.0.1:5555,server,nowait
