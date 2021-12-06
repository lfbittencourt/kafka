# Kafka demo

This is a Kafka demo app made for an MsC assignment. It uses Docker to emulate an
e-commerce data analysis pipeline powered by the following software:

- ZooKeeper
- Kafka with Kafdrop
- MongoDB with Mongo Express
- Metabase
- Node (to run producer and consumer processes)

## How to run it

You will need to have [Docker](https://www.docker.com/products/docker-desktop) installed on your
machine. Then type `docker compose up` in your terminal and you're all set.

## Ports

- Kafdrop is running [on port 9000](http://localhost:9000)
- Mongo Express is running [on port 8081](http://localhost:8081)
- Metabase is running [on port 3000](http://localhost:3000)
