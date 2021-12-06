const faker = require('faker');

const { producer } = require('./kafka');

producer.connect().then(() => {
  setInterval(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now - (1000 * 60 * 60 * 24 * 7));
    const howManyMessages = faker.datatype.number({
      min: 1,
      max: 10,
    });

    const messagePlaceholders = [...Array(howManyMessages)];
    const messages = messagePlaceholders.map(() => ({
      value: JSON.stringify({
        name: faker.name.findName(),
        email: faker.internet.email(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        product: faker.commerce.productName(),
        date: faker.date.between(sevenDaysAgo, now),
      }),
    }));

    console.log(`Sending ${howManyMessages} message(s)...`);

    producer.send({
      topic: 'purchases',
      messages,
    }).then(() => {
      console.log('Message(s) sent.');
    });
  }, 10 * 1000); // 10 seconds
});
