const mongoose = require("mongoose");
const User = require("../models/User");
const Favor = require("../models/Favor");
const createUsers = require("./seedsUsers.js");
const createBoons = require("./seedsBoons.js");
const createFavors = require("./seedsFavors.js");
const createTickets = require("./seedsTickets.js");
const {CATEGORIES_ENUM, selectRandomFromArray} = require("../config/constants");

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../../.private.env')});

mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error("Error connecting to mongo", err)});


const calcNumBoons = (role) => {
  switch(role) {
    case 'Bank':
      return 1000;
    case 'Admin':
      return 0;
    case 'User':
      return Math.floor(Math.random() * 20);
    default:
      return 0;
  }
}

createUsers()
  .then(users => {
    console.log(`Created ${users.length} users`);
    users.map(u => {
      let offerCategories = selectRandomFromArray(CATEGORIES_ENUM, 5);
      let needCategories = selectRandomFromArray(CATEGORIES_ENUM, 5);
      let otherUsers = users.filter(us=> (us._id.toString() !== u._id.toString()) && us.role === "User").map(us => us._id.toString());
      let whoNeedsId = selectRandomFromArray(otherUsers,2);
      let whoseFavId = selectRandomFromArray(otherUsers,2);
      let numBoons = calcNumBoons(u.role);
      createBoons(numBoons).then(boons => {
        let fields = {boons, offerCategories, needCategories};
        if (u.role === "User") {
          createFavors(u._id.toString(), whoNeedsId, whoseFavId).then((favors) => {
            let favOffer = favors.filter(f => f.type === "Offer");
            let favNeed = favors.filter(f => f.type === "Need");
            if (favNeed.length > 0) {
              createTickets(selectRandomFromArray(otherUsers, 1)[0], u._id.toString(), favNeed[0]._id.toString()).then(ticket => console.log(`Created ticket`));
            }
            fields = {...fields, favNeed, favOffer};
            User.findByIdAndUpdate(u._id, fields).then(() => console.log(`Created ${favors.length} favors`));
          });
        } else {
          User.findByIdAndUpdate(u._id, fields).then(() => console.log(`Created ${boons.length} boons`));
        }
      });
    })
  }).catch((e) => console.error(e));

setTimeout(()=>mongoose.disconnect(), 5000);
