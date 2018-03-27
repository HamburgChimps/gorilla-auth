FROM alpine:edge AS tini-stage
RUN apk add 'tini>0.17' --no-cache

FROM mhart/alpine-node:8.9 AS builder
COPY . /build
WORKDIR /build/server
RUN yarn install --production

FROM mhart/alpine-node:8.9
COPY --from=builder /build/server /app
COPY --from=tini-stage /sbin/tini /sbin/tini

WORKDIR /app

CMD ["/sbin/tini", "-e", "143", "--", "node", "./"]
