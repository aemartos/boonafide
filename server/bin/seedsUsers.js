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
    caption: "Boonafide testing user",
    description: "Lorem ipsum dolor amet kale chips lomo tilde authentic selfies polaroid you probably haven't heard of them kickstarter banh mi waistcoat twee taiyaki four loko bicycle rights dreamcatcher. Slow-carb meggings aesthetic four dollar toast squid. Blog stumptown vinyl coloring book. Church-key polaroid four dollar toast, keffiyeh tacos four loko beard forage celiac whatever snackwave woke.",
    location: {
      type: "Point",
      coordinates: [-3.714485, 40.4453307]
    },
    locationName: "Vallehermoso, 28003 Madrid",
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
    caption: "Boonafide testing user",
    description: "Lorem ipsum dolor amet you probably haven't heard of them vexillologist meh fingerstache hexagon distillery, snackwave biodiesel tofu. Chillwave before they sold out cornhole, chicharrones lyft yuccie affogato chambray squid chartreuse etsy. Tumeric synth master cleanse man bun. Cardigan brooklyn tacos austin activated charcoal iPhone subway tile heirloom sriracha fanny pack hashtag PBR&B pickled taxidermy mlkshk.",
    location: {
      type: "Point",
      coordinates: [-3.7162688, 40.4211463]
    },
    locationName: "Calle Ilustración, 28008 Madrid",
    newUser: false,
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1549800116/profile-pictures/julianne.jpg",
    status: "Active",
    role: "User",
    token: generateHash({ length: 32 })
  },
  {
    username: "trevor",
    email: "trevor@hotmail.com",
    password: bcrypt.hashSync("trevor_1234", bcrypt.genSaltSync(bcryptSalt)),
    caption: "Boonafide testing user",
    description: "Lorem ipsum dolor amet blog typewriter single-origin coffee hell of. Brooklyn venmo polaroid iPhone health goth XOXO, tacos forage bushwick tilde paleo. Cardigan wayfarers bitters polaroid four loko tumblr chillwave migas. Hell of post-ironic before they sold out lomo, gochujang beard XOXO kitsch YOLO chambray slow-carb messenger bag pop-up kale chips.",
    location: {
      type: "Point",
      coordinates: [-3.703421, 40.416752]
    },
    locationName: "Puerta del Sol, 28013 Madrid",
    newUser: false,
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1551707363/profile-pictures/trevor.jpg",
    status: "Active",
    role: "User",
    token: generateHash({ length: 32 })
  },
  {
    username: "paul",
    email: "paul@hotmail.com",
    password: bcrypt.hashSync("paul_1234", bcrypt.genSaltSync(bcryptSalt)),
    caption: "Boonafide testing user",
    description: "Lorem ipsum dolor amet blog narwhal live-edge bicycle rights. Brunch snackwave seitan cronut listicle vaporware semiotics bushwick. Vexillologist pug echo park jianbing crucifix raw denim lomo hexagon vegan deep v. Vice cloud bread tbh try-hard semiotics. Chia la croix taxidermy tbh master cleanse gentrify waistcoat quinoa flexitarian celiac.",
    location: {
      type: "Point",
      coordinates: [-3.678565, 40.419863]
    },
    locationName: "Ibiza, 28009 Madrid",
    newUser: false,
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1551707423/profile-pictures/paul_rudd.jpg",
    status: "Active",
    role: "User",
    token: generateHash({ length: 32 })
  },
  {
    username: "emily",
    email: "emily@hotmail.com",
    password: bcrypt.hashSync("emily_1234", bcrypt.genSaltSync(bcryptSalt)),
    caption: "Boonafide testing user",
    description: "Lorem ipsum dolor amet tattooed tacos organic cloud bread polaroid glossier. Seitan hammock pabst, bicycle rights photo booth tattooed before they sold out 8-bit biodiesel letterpress. Schlitz fam photo booth adaptogen, banjo small batch banh mi deep v locavore gentrify hot chicken synth roof party humblebrag fixie. Meditation letterpress gochujang, church-key sustainable fixie tumeric aesthetic skateboard offal direct trade. Humblebrag whatever locavore, butcher subway tile jean shorts gochujang venmo tbh.",
    location: {
      type: "Point",
      coordinates: [-3.6884545, 40.4269842]
    },
    locationName: "Serrano, 27, 28001 Madrid",
    newUser: false,
    pictureUrl: "https://res.cloudinary.com/boonafide/image/upload/v1551707653/profile-pictures/emilyblunt.jpg",
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
      coordinates: [-3.728057, 40.452699]
    },
    locationName: "Av. Complutense, 30, 28040 Madrid",
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
      coordinates: [-3.652726, 40.539876]
    },
    locationName: "Avenida Valdelaparra, 28100 Alcobendas, Madrid",
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
    locationName: "Calle del Marqués de Casa Riera, 10751, 28014 Madrid",
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
