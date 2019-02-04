const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../.private.env')});

const bcryptSalt = 10;

mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error("Error connecting to mongo", err)});

//lng, lat
let users = [
  {
    username: "test",
    email: "test@hotmail.com",
    password: bcrypt.hashSync("test_1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "ana",
    email: "ana@hotmail.com",
    password: bcrypt.hashSync("ana_1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "boonafide",
    email: "boonafideapp@gmail.com",
    password: bcrypt.hashSync("boonafide_admin!", bcrypt.genSaltSync(bcryptSalt)),
    caption: "When someone does you a big favor, don't pay it back... PAY IT FORWARD!",
    description: "Boonafide administrator.",
    location: {
      type: "Point",
      coordinates: [-3.6678608, 40.5327046]
    },
    offerCategories: [],
    needCategories: [],
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1549110826/profile-pictures/profPicDefault02.png",
    status: "Active",
    role: "Admin",
    boons: [],
    favOffering: [],
    favWishing: [],
    favDone: [],
    favReceived: []
  }
]

User.collection.drop();

User.create(users)
.then(users => {
  console.log(`Created ${users.length} users`);
}).then(() => {mongoose.disconnect()});
