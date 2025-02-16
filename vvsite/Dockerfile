FROM archlinux

WORKDIR /website
COPY  ./target/site /website/target/site
COPY ./target/debug/vvsite /website/vvsite

COPY ./Cargo.toml /website/Cargo.toml
RUN chmod +x /website/vvsite

CMD ["/website/vvsite"]
