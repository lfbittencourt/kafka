const dotenv = require('dotenv');

const { MongoClient } = require('mongodb');

dotenv.config();

const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const databaseName = process.env.DATABASE_NAME;
const uri = `mongodb://${user}:${password}@${host}/${databaseName}`;

const mongo = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  mongo,
  databaseName,
};
