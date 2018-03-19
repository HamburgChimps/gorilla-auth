echo Starting install script

docker pull mhart/alpine-node:8.9

docker run --rm -v $(pwd)/server:${pwd}/server \
-w /server \
mhart/alpine-node:8.9 yarn install

echo Finished installing
