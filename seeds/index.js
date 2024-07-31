const mongoose = require('mongoose');
const cities = require('./cities'); 
const { places,descriptors} = require('./seedsHelpers')
const Campground = require('../model/campground');
const axios = require('axios');

mongoose.connect('mongodb://localhost:27017/yelpcamp')

const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection, error"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

  async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'rr0w11FMu_Otz67IEu2n2KWTrpcRj_WDbHwHGfxV0ow',
          collections: 'p2bLSJgDPjk',
          count: 30 
        },
        headers: { Accept: "application/json", "Accept-Encoding": "identity" }
      })
      return resp.data.map((a) => a.urls.small)
    } catch (err) {
      console.error(err)
    }
  }

  const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
      // setup
      const placeSeed = Math.floor(Math.random() * places.length)
      const descriptorsSeed = Math.floor(Math.random() * descriptors.length)
      const citySeed = Math.floor(Math.random() * cities.length)
      const price = Math.floor(Math.random() * 25) + 10;
      const imgs = await seedImg();
   
      // seed data into campground
      const camp = new Campground({
        author: '6698718b43043f6fa8fc8e0a',
        image: sample(imgs),
        title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
        location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!',
        price,
      })
   
      await camp.save()
    }
  }

seedDB().then(() => {
    mongoose.connection.close()
});