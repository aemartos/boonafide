const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
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

createUsers()
  .then((users) => {
    console.log(`Created ${users.length} users`);
    users.forEach((u) => {
      const offerCategories = selectRandomFromArray(CATEGORIES_ENUM, 5);
      const needCategories = selectRandomFromArray(CATEGORIES_ENUM, 5);
      const otherUsers = users.filter((us) => (us._id.toString() !== u._id.toString()) && us.role === 'User').map((us) => us._id.toString());
      const whoNeedsId = selectRandomFromArray(otherUsers, 2);
      const whoseFavId = selectRandomFromArray(otherUsers, 2);
      const numBoons = calcNumBoons(u.role);
      createBoons(numBoons).then((boons) => {
        let fields = { boons, offerCategories, needCategories };
        if (u.role === 'User') {
          createFavors(u._id.toString(), whoNeedsId, whoseFavId).then((favors) => {
            const favOffer = favors.filter((f) => f.type === 'Offer');
            const favNeed = favors.filter((f) => f.type === 'Need');
            if (favNeed.length > 0) {
              createTickets(selectRandomFromArray(otherUsers, 1)[0], u._id.toString(), favNeed[0]._id.toString()).then(() => console.log('Created ticket')).catch((ticketError) => console.error({ ticketError }));
            }
            fields = { ...fields, favNeed, favOffer };
            User.findByIdAndUpdate(u._id, fields).then(() => console.log(`Created ${favors.length} favors`));
          }).catch((favorError) => console.error({ favorError }));
        } else {
          User.findByIdAndUpdate(u._id, fields).then(() => console.log(`Created ${boons.length} boons`));
        }
      }).catch((boonError) => console.error({ boonError }));
    });
  }).catch((e) => console.error(e));

setTimeout(() => mongoose.disconnect(), 10000);
