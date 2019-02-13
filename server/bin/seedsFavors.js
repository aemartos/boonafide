const Favor = require("../models/Favor");
const {CATEGORIES_ENUM, selectRandomFromArray} = require("../config/constants");

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
    description: "Lucas a gramenawer va usté muy cargadoo por la gloria de mi madre ese pedazo de va usté muy cargadoo te voy a borrar el cerito no te digo trigo por no llamarte Rodrigor. Al ataquerl ese pedazo de llevame al sircoo qué dise usteer por la gloria de mi madre pecador benemeritaar.",
    remainingFavNum: 5,
    date: new Date("09-21-18 20:30"),
    type: "Need",
    picturesUrls: ["https://picsum.photos/200/300/?image=500", "https://picsum.photos/200/300/?image=487"],
    location: {
      type: "Point",
      coordinates: [-3.6678608, 40.5327046]
    }
  },
  {
    name: "Hair cut",
    description: "Se calle ustée la caidita diodeno benemeritaar me cago en tus muelas jarl jarl ahorarr apetecan. Jarl no puedor pupita ese hombree diodeno a peich ese pedazo de diodeno la caidita fistro.",
    remainingFavNum: 8,
    date: new Date("12-13-18 15:30"),
    type: "Offer",
    picturesUrls: ["https://picsum.photos/200/300/?image=100"],
    location: {
      type: "Point",
      coordinates: [-3.6704829, 40.4941498]
    }
  },
  {
    name: "Computer repair",
    description: " A gramenawer me cago en tus muelas fistro pecador torpedo te va a hasé pupitaa torpedo diodeno tiene musho peligro diodeno te voy a borrar el cerito.",
    remainingFavNum: 2,
    date: new Date("05-06-18 15:30"),
    type: "Need",
    picturesUrls: ["https://picsum.photos/200/300/?image=234", "https://picsum.photos/200/300/?random", "https://picsum.photos/200/300/?image=27"],
    location: {
      type: "Point",
      coordinates: [-3.6675343, 40.4955688]
    }
  },
  {
    name: "Bed and breakfast",
    description: "Al ataquerl ese pedazo de llevame al sircoo qué dise usteer por la gloria de mi madre pecador benemeritaar.",
    remainingFavNum: 3,
    date: new Date("01-13-19 11:30"),
    type: "Offer",
    picturesUrls: ["https://picsum.photos/200/300/?image=120", "https://picsum.photos/200/300/?image=345"],
    location: {
      type: "Point",
      coordinates: [-3.6890858, 40.39887]
    }
  },
  {
    name: "Mathematics learning",
    description: "Mamaar caballo blanco caballo negroorl por la gloria de mi madre al ataquerl mamaar a peich amatomaa diodeno caballo blanco caballo negroorl pecador.",
    remainingFavNum: 1,
    date: new Date("02-07-19 18:30"),
    type: "Offer",
    picturesUrls: ["https://picsum.photos/200/300/?image=1000"],
    location: {
      type: "Point",
      coordinates: [-3.6890858, 40.39887]
    }
  }
]


const createFavors = (creatorId, favNeed, favOffer, whoNeedsId, whoseFavId) => {
  Favor.collection.drop();
  const favorsModified = favors.map(f => ({...f, creatorId, favNeed, favOffer, whoNeedsId, whoseFavId, categories: selectRandomFromArray(CATEGORIES_ENUM, 5)}));
  return Favor.create(favorsModified).then(favors => favors);
}


module.exports = createFavors;
