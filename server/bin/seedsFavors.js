const mongoose = require("mongoose");
const Favor = require("../models/Favor");

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../.private.env')});

mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error("Error connecting to mongo", err)});

//lng, lat
// let example = [
//   {
//     name: "Taking dogs for a walk",
//     description: "",
//     creatorId: {type: Schema.Types.ObjectId, ref:'User'},
//     remainingFavNum: 5,
//     date: [{type: Date, default: Date.now}],
//     type: {type: String, enum: ["offer", "need"]},
//     category: ["services", "care", "animals"],
//     picturesUrls: [""],
//     reviewsId: [{type: Schema.Types.ObjectId, ref:'Review'}],
//     whoseFavId: [{type: Schema.Types.ObjectId, ref:'User'}],
//     whoNeedsId: [{type: Schema.Types.ObjectId, ref:'User'}],
//     location: {
//       type: "Point",
//       coordinates: [-3.6678608, 40.5327046]
//     }
//   }
// ]

let favors = [
  {
    name: "Taking dogs for a walk",
    description: "",
    remainingFavNum: 5,
    type: "need",
    categories: ["services", "care", "animals"],
    picturesUrls: [""],
    location: {
      type: "Point",
      coordinates: [-3.6678608, 40.5327046]
    }
  },
  {
    name: "Hair cut",
    description: "",
    remainingFavNum: 5,
    type: "offer",
    categories: ["services", "care"],
    picturesUrls: [""],
    location: {
      type: "Point",
      coordinates: [-3.6704829, 40.4941498]
    }
  },
  {
    name: "Computer repair",
    description: "",
    remainingFavNum: 5,
    type: "need",
    categories: ["services", "electronics"],
    picturesUrls: [""],
    location: {
      type: "Point",
      coordinates: [-3.6675343, 40.4955688]
    }
  },
  {
    name: "Bed and breakfast",
    description: "",
    remainingFavNum: 5,
    type: "offer",
    categories: ["care", "shelter", "feeding"],
    picturesUrls: [""],
    location: {
      type: "Point",
      coordinates: [-3.6890858, 40.39887]
    }
  },
  {
    name: "Mathematics learning",
    description: "",
    remainingFavNum: 5,
    type: "offer",
    categories: ["services", "education"],
    picturesUrls: [""],
    location: {
      type: "Point",
      coordinates: [-3.6890858, 40.39887]
    }
  }
]

Favor.collection.drop();

Favor.create(favors)
.then(favors => {
  console.log(`Created ${favors.length} favors`);
}).then(() => {mongoose.disconnect()});
