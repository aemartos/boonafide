const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateHash = require('random-hash').generateHash;

const bcryptSalt = 10;

//lng, lat
let users = [
  {
    username: "gillian",
    email: "gillian@hotmail.com",
    password: bcrypt.hashSync("gillian_1234", bcrypt.genSaltSync(bcryptSalt)),
    caption: "Testing user",
    description: "Boonafide testing user",
    location: {
      type: "Point",
      coordinates: [-3.714485, 40.4453307]
    },
    newUser: false,
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1549800115/profile-pictures/gillian.jpg",
    status: "Active",
    role: "User",
    token: generateHash({ length: 32 })
  },
  {
    username: "julianne",
    email: "julianne@hotmail.com",
    password: bcrypt.hashSync("julianne_1234", bcrypt.genSaltSync(bcryptSalt)),
    caption: "Testing user",
    description: "Boonafide testing user",
    location: {
      type: "Point",
      coordinates: [-3.7162688, 40.4211463]
    },
    newUser: false,
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1549800116/profile-pictures/julianne.jpg",
    status: "Active",
    role: "User",
    token: generateHash({ length: 32 })
  },
  {
    username: "ana",
    email: "ana@hotmail.com",
    password: bcrypt.hashSync("ana_1234", bcrypt.genSaltSync(bcryptSalt)),
    caption: "Bonnafide creator :)",
    description: "Boonafide ironhacker creator",
    location: {
      type: "Point",
      coordinates: [-3.7284008, 40.4523805]
    },
    newUser: false,
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1549799760/profile-pictures/ana.jpg",
    status: "Active",
    role: "Admin",
    token: generateHash({ length: 32 })
  },
  {
    username: "boonafide",
    email: "boonafideapp@gmail.com",
    password: bcrypt.hashSync("boonafide_admin!", bcrypt.genSaltSync(bcryptSalt)),
    caption: "When someone does you a big favor, don't pay it back... PAY IT FORWARD!",
    description: "Boonafide main account administrator",
    location: {
      type: "Point",
      coordinates: [-3.6678608, 40.5327046]
    },
    newUser: false,
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1549799496/profile-pictures/boonafide.png",
    status: "Active",
    role: "Admin",
    token: generateHash({ length: 32 })
  },
  {
    username: "IBO",
    email: "ibo@hotmail.com",
    password: bcrypt.hashSync("ibo_1234", bcrypt.genSaltSync(bcryptSalt)),
    location: {
      type: "Point",
      coordinates: [-3.6965963, 40.4186253]
    },
    newUser: false,
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1549799696/profile-pictures/favicon.png",
    status: "Active",
    role: 'Bank',
    token: generateHash({ length: 32 })
  }
]

const createUser = () => {
  User.collection.drop();
  return User.create(users);
}

module.exports = createUser;
