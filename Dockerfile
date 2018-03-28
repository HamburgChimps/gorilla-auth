FROM alpine:edge AS tini-stage
RUN apk add 'tini>0.17' --no-cache

FROM gorilla/builder:8.9 AS builder
COPY . /build
WORKDIR /build/
RUN yarn install --production --build-from-source

FROM mhart/alpine-node:8.9
COPY --from=builder /build /app
COPY --from=tini-stage /sbin/tini /sbin/tini

WORKDIR /app

CMD ["/sbin/tini", "-e", "143", "--", "node", "./"]
