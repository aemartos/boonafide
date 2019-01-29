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


let users = [
  {
    username: "test",
    email: 'test@hotmail.com',
    password: bcrypt.hashSync("test_1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "ana",
    email: 'ana@hotmail.com',
    password: bcrypt.hashSync("ana_1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "boonafide",
    email: 'boonafideapp@gmail.com',
    password: bcrypt.hashSync("boonafide_admin!", bcrypt.genSaltSync(bcryptSalt)),
    role: "Admin"
  }
]

User.collection.drop();

User.create(users)
.then(users => {
  console.log(`Created ${users}`);
}).then(() => {mongoose.disconnect()});
