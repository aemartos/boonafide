const Favor = require("../models/Favor");
const {CATEGORIES_ENUM, selectRandomFromArray} = require("../config/constants");

//lng, lat
// let example = [
//   {
//     name: "Taking dogs for a walk",
//     description: "",
//     creatorId: {type: Schema.Types.ObjectId, ref:'User'},
//     remainingFavNum: 5,
//     shifts: {map: Map, of: [String]},
//     type: {type: String, enum: ["offer", "need"]},
//     categories: ["services", "care", "animals"],
//     pictureUrls: [""],
//     reviewsId: [{type: Schema.Types.ObjectId, ref:'Review'}],
//     whoseFavId: [{type: Schema.Types.ObjectId, ref:'User'}],
//     whoNeedsId: [{type: Schema.Types.ObjectId, ref:'User'}],
//     location: {
//       type: "Point",
//       coordinates: [-3.6678608, 40.5327046]
//     },
//     locationName: String
//   }
// ]


let favors = [
  {
    name: "Taking dogs for a walk",
    description: "Lucas a gramenawer va usté muy cargadoo por la gloria de mi madre ese pedazo de va usté muy cargadoo te voy a borrar el cerito no te digo trigo por no llamarte Rodrigor. Al ataquerl ese pedazo de llevame al sircoo qué dise usteer por la gloria de mi madre pecador benemeritaar.",
    remainingFavNum: 5,
    shifts: {"17-03-2019": ["11:30", "12:30", "13:30"], "18-03-2019": ["11:30", "12:30", "13:30"], "19-03-2019": ["11:30", "12:30", "13:30"]},
    type: "Need",
    pictureUrls: ["https://picsum.photos/200/300/?image=500", "https://picsum.photos/200/300/?image=487"],
    location: {
      type: "Point",
      coordinates: [-3.6678608, 40.5327046]
    },
    locationName: "Unknown"
  },
  {
    name: "Hair cut",
    description: "Se calle ustée la caidita diodeno benemeritaar me cago en tus muelas jarl jarl ahorarr apetecan. Jarl no puedor pupita ese hombree diodeno a peich ese pedazo de diodeno la caidita fistro.",
    remainingFavNum: 8,
    shifts: {"17-03-2019": ["11:30", "12:30", "13:30"], "18-03-2019": ["11:30", "12:30", "13:30"], "19-03-2019": ["11:30", "12:30", "13:30"]},
    type: "Offer",
    pictureUrls: ["https://picsum.photos/200/300/?image=100"],
    location: {
      type: "Point",
      coordinates: [-3.6704829, 40.4941498]
    },
    locationName: "Unknown"
  },
  {
    name: "Computer repair",
    description: " A gramenawer me cago en tus muelas fistro pecador torpedo te va a hasé pupitaa torpedo diodeno tiene musho peligro diodeno te voy a borrar el cerito.",
    remainingFavNum: 2,
    shifts: {"17-03-2019": ["11:30", "12:30", "13:30"], "18-03-2019": ["11:30", "12:30", "13:30"], "19-03-2019": ["11:30", "12:30", "13:30"]},
    type: "Need",
    pictureUrls: ["https://picsum.photos/200/300/?image=234", "https://picsum.photos/200/300/?random", "https://picsum.photos/200/300/?image=27"],
    location: {
      type: "Point",
      coordinates: [-3.6675343, 40.4955688]
    },
    locationName: "Unknown"
  },
  {
    name: "Bed and breakfast",
    description: "Al ataquerl ese pedazo de llevame al sircoo qué dise usteer por la gloria de mi madre pecador benemeritaar.",
    remainingFavNum: 3,
    shifts: {"17-03-2019": ["11:30", "12:30", "13:30"], "18-03-2019": ["11:30", "12:30", "13:30"], "19-03-2019": ["11:30", "12:30", "13:30"]},
    type: "Offer",
    pictureUrls: ["https://picsum.photos/200/300/?image=120", "https://picsum.photos/200/300/?image=345"],
    location: {
      type: "Point",
      coordinates: [-3.6890858, 40.39887]
    },
    locationName: "Unknown"
  },
  {
    name: "Mathematics learning",
    description: "Mamaar caballo blanco caballo negroorl por la gloria de mi madre al ataquerl mamaar a peich amatomaa diodeno caballo blanco caballo negroorl pecador.",
    remainingFavNum: 1,
    shifts: {"17-03-2019": ["11:30", "12:30", "13:30"], "18-03-2019": ["11:30", "12:30", "13:30"], "19-03-2019": ["11:30", "12:30", "13:30"]},
    type: "Offer",
    pictureUrls: ["https://picsum.photos/200/300/?image=1000"],
    location: {
      type: "Point",
      coordinates: [-3.6890858, 40.39887]
    },
    locationName: "Unknown"
  }
]


const createFavors = (creatorId, favNeed, favOffer, whoNeedsId, whoseFavId) => {
  Favor.collection.drop();
  const favorsModified = favors.map(f => ({...f, creatorId, favNeed, favOffer, whoNeedsId, whoseFavId, categories: selectRandomFromArray(CATEGORIES_ENUM, 5)}));
  return Favor.create(favorsModified).then(favors => favors);
}


module.exports = createFavors;
