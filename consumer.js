const { consumer } = require('./kafka');
const { mongo, databaseName } = require('./mongo');

Promise.all([
  consumer.connect(),
  mongo.connect(),
]).then(() => {
  consumer.subscribe({
    topic: 'purchases',
    fromBeginning: true,
  }).then(() => {
    consumer.run({
      eachBatch: async (payload) => {
        const { batch } = payload;

        const documents = batch.messages.map((message) => {
          const document = JSON.parse(message.value.toString());

          document.latitude = parseFloat(document.latitude);
          document.longitude = parseFloat(document.longitude);
          document.price = parseFloat(document.price);
          document.date = new Date(document.date);

          return document;
        });

        const database = mongo.db(databaseName);

        database.collection('purchases').insertMany(documents).then((result) => {
          console.log(`${result.insertedCount} document(s) were inserted`);
        });
      },
    });
  });
});
