FROM alpine
ENV USERNAME="shelluser" \
    PASSWORD="" \
    SUDO_OK="false" \
    AUTOLOGIN="true" \
    TZ="Etc/UTC"

COPY ./entrypoint.sh /
COPY --chmod=011 ./minishell_src/bin/minishell /bin/minishell

RUN apk update && \
    apk add --no-cache tini ttyd tzdata vim nano && \
    chmod 700 /entrypoint.sh && \
    touch /etc/.firstrun && \
    ln -s "/usr/share/zoneinfo/$TZ" /etc/localtime && \
    echo $TZ > /etc/timezone 

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/entrypoint.sh"]
