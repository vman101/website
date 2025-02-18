FROM nginx

WORKDIR /server

# COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./html /server/html
COPY ./index.html /server

CMD ["nginx", "-g", "daemon off;"]
