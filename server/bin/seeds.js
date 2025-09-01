const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Boon = require('../models/Boon');
const Favor = require('../models/Favor');
const Ticket = require('../models/Ticket');
const createUsers = require('./seedsUsers');
const createBoons = require('./seedsBoons');
const createFavors = require('./seedsFavors');
const createTickets = require('./seedsTickets');
const { CATEGORIES_ENUM, selectRandomFromArray } = require('../config/constants');

dotenv.config();

mongoose.connect(process.env.DBURL, { useNewUrlParser: true })
  .then((x) => { console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`); })
  .catch((err) => { console.error('Error connecting to mongo', err); });

const calcNumBoons = (role) => {
  switch (role) {
    case 'Bank':
      return 1000;
    case 'Admin':
      return 0;
    case 'User':
      return Math.floor(Math.random() * 20);
    default:
      return 0;
  }
};

const runSeeding = async () => {
  try {
    // Drop all collections once at the start
    await User.collection.drop().catch(() => console.log('User collection already empty'));
    await Boon.collection.drop().catch(() => console.log('Boon collection already empty'));
    await Favor.collection.drop().catch(() => console.log('Favor collection already empty'));
    await Ticket.collection.drop().catch(() => console.log('Ticket collection already empty'));
    
    const users = await createUsers();
    console.log(`Created ${users.length} users`);
    
    // Process each user using array methods
    await users.reduce(async (promise, user) => {
      await promise;
      const numBoons = calcNumBoons(user.role);
      const boons = await createBoons(numBoons);
      
      const offerCategories = selectRandomFromArray(CATEGORIES_ENUM, 5);
      const needCategories = selectRandomFromArray(CATEGORIES_ENUM, 5);
      const otherUsers = users.filter((us) => (us._id.toString() !== user._id.toString()) && us.role === 'User').map((us) => us._id.toString());
      const whoNeedsId = selectRandomFromArray(otherUsers, 2);
      const whoseFavId = selectRandomFromArray(otherUsers, 2);
      
      let fields = { boons, offerCategories, needCategories };
      
      if (user.role === 'User') {
        const favors = await createFavors(user._id.toString(), whoNeedsId, whoseFavId);
        const favOffer = favors.filter((f) => f.type === 'Offer');
        const favNeed = favors.filter((f) => f.type === 'Need');
        
        if (favNeed.length > 0) {
          try {
            await createTickets(selectRandomFromArray(otherUsers, 1)[0], user._id.toString(), favNeed[0]._id.toString());
            console.log('Created ticket');
          } catch (ticketError) {
            console.error({ ticketError });
          }
        }
        
        fields = { ...fields, favNeed, favOffer };
        await User.findByIdAndUpdate(user._id, fields);
        console.log(`Created ${favors.length} favors for user ${user.username}`);
      } else {
        await User.findByIdAndUpdate(user._id, fields);
        console.log(`Created ${boons.length} boons for user ${user.username}`);
      }
    }, Promise.resolve());
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

runSeeding();
