#!/bin/sh
set -e
#set -x

TTYD_ARGS="login"

# Check if this is the container's first run
if [ -f /etc/.firstrun ]; then
    # Create user account
    echo >> /etc/shells /bin/minishell
    adduser -D --shell=/bin/sh $USERNAME
    echo "#!/bin/sh
        trap '' SIGINT
        while :
        do
            echo "*** Starting Minishell ***"
            minishell
        done" >> /home/$USERNAME/.runshell.sh
    chmod +x /home/$USERNAME/.runshell.sh
    echo >> /home/$USERNAME/.profile "./.runshell.sh"

    # Add a password to the user
    echo "$USERNAME:$PASSWORD" | chpasswd

    # Allow access to sudo if permitted
    if [ $SUDO_OK == "true" ]; then
        addgroup $USERNAME wheel
        sed -i '/%wheel ALL=(ALL) ALL/s/^# //g' /etc/sudoers
    fi

    # Prevent this from running again
    rm /etc/.firstrun
fi

# Optionally set a timezone
CURRENT_TZ=$(cat /etc/timezone)
if [ "$TZ" != "$CURRENT_TZ" ]; then
    echo "Setting timezone to $TZ"

    # delete symlink if it exists
    [ -f /etc/localtime ] && rm /etc/localtime

    # set timezone
    ln -s "/usr/share/zoneinfo/$TZ" /etc/localtime
    echo $TZ > /etc/timezone 
fi

# Auto login the user, if allowed
[ $AUTOLOGIN == "true" ] && TTYD_ARGS="$TTYD_ARGS -f $USERNAME"

passwd -l root

# Start ttyd
exec ttyd -W -m 5 -p 8006 $TTYD_ARGS
