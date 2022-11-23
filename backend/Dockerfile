FROM python:3.9-slim

WORKDIR /usr/src/app

COPY . .

RUN apt update -y
RUN apt upgrade -y
RUN apt install -y gcc cmake make g++ musl musl-dev build-essential clang libffi-dev python3-dev ffmpeg libsm6 libxext6
RUN make

EXPOSE 3002