const dotenv = require('dotenv');

const { Kafka } = require('kafkajs');

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKERCONNECT],
});

const producer = kafka.producer();
const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID,
});

module.exports = {
  producer,
  consumer,
};
