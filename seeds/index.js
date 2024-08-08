const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedsHelpers')
const Campground = require('../model/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection, error"));
db.once("open", () => {
  console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '66a85b2039c40882bf3a09cf',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dhknjxmpc/image/upload/v1723078030/yelpCamp/u1pv2q3pruwfluxeabci.png',
          filename: 'yelpCamp/u1pv2q3pruwfluxeabci',
        },
        {
          url: 'https://res.cloudinary.com/dhknjxmpc/image/upload/v1723078030/yelpCamp/m45eimex8fsqpexzno3m.png',
          filename: 'yelpCamp/m45eimex8fsqpexzno3m',
        }
      ],
    })

    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
});