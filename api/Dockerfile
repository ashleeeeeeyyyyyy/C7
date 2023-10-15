FROM python:3.7-alpine

RUN apk update && apk add bash
RUN apk add --no-cache mariadb-dev build-base

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt
RUN pip install gunicorn

EXPOSE 80