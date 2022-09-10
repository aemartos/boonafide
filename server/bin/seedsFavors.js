const Favor = require('../models/Favor');
const { CATEGORIES_ENUM, selectRandomFromArray } = require('../config/constants');

const favors = [
  {
    name: 'Taking dogs for a walk',
    description: 'Lorem ipsum dolor amet pinterest narwhal chicharrones copper mug iPhone, paleo ugh trust fund four dollar toast fashion axe helvetica echo park. Edison bulb vexillologist locavore yr lumbersexual quinoa, plaid actually la croix asymmetrical raw denim deep v. DIY keytar artisan skateboard, cray wolf authentic chia activated charcoal brooklyn woke pour-over freegan hell of. Twee man bun austin pug iPhone microdosing fixie, wayfarers tofu polaroid coloring book scenester ramps.',
    remainingFavNum: 5,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Need',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551708418/favor-pictures/dog-walkers-insurance.jpg', 'https://res.cloudinary.com/boonafide/image/upload/v1551708467/favor-pictures/girl-walking-dogs-061917.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.681996, 40.408892],
    },
    locationName: 'Jerónimos, 28014 Madrid',
  },
  {
    name: 'Hair cut',
    description: "Lorem ipsum dolor amet blue bottle sartorial 90's, whatever pitchfork truffaut woke asymmetrical af tbh prism franzen. Organic helvetica four dollar toast 90's, lomo umami unicorn mustache cardigan chicharrones tbh. Raclette chillwave tacos sustainable unicorn neutra. Umami retro farm-to-table chia readymade edison bulb, kinfolk tofu polaroid cardigan next level DIY.",
    remainingFavNum: 8,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Offer',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551708417/favor-pictures/haircut.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.668584, 40.495512],
    },
    locationName: 'Calle Puerto de Somport, 28050 Madrid',
  },
  {
    name: 'Computer repair',
    description: "Lorem ipsum dolor amet blue bottle sartorial 90's, whatever pitchfork truffaut woke asymmetrical af tbh prism franzen. Organic helvetica four dollar toast 90's, lomo umami unicorn mustache cardigan chicharrones tbh. Raclette chillwave tacos sustainable unicorn neutra.",
    remainingFavNum: 2,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Need',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551708418/favor-pictures/computerRepair.jpg', 'https://res.cloudinary.com/boonafide/image/upload/v1551708530/favor-pictures/computerrr.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.688306, 40.459029],
    },
    locationName: 'Av. de Alberto de Alcocer, 7, Madrid',
  },
  {
    name: 'Bed and breakfast',
    description: 'Lorem ipsum dolor amet butcher neutra +1 copper mug master cleanse etsy iceland aesthetic green juice heirloom hoodie air plant. Fingerstache subway tile biodiesel, affogato meggings salvia mixtape shabby chic mustache portland letterpress austin. Keffiyeh asymmetrical listicle, knausgaard flexitarian skateboard activated charcoal health goth la croix unicorn. Flexitarian pour-over actually tacos.',
    remainingFavNum: 3,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Offer',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551708010/favor-pictures/bedandbreakfast.jpg', 'https://res.cloudinary.com/boonafide/image/upload/v1551708645/favor-pictures/breakfast.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.6894094, 40.3993882],
    },
    locationName: 'Calle de Ramírez de Prado, 4, 28045 Madrid',
  },
  {
    name: 'Mathematics learning',
    description: 'Lorem ipsum dolor amet disrupt microdosing sartorial locavore scenester lumbersexual before they sold out four dollar toast four loko succulents neutra. Slow-carb church-key put a bird on it helvetica gentrify polaroid ugh roof party normcore hell of. Sartorial banh mi gastropub, occupy helvetica banjo chia microdosing hashtag humblebrag. Tofu poutine wolf beard umami shabby chic bitters tattooed.',
    remainingFavNum: 10,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Offer',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551708017/favor-pictures/maths.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.701041, 40.414112],
    },
    locationName: 'Calle de las Huertas, 9, 28012 Madrid',
  },
  {
    name: 'Car washing',
    description: 'Lorem ipsum dolor amet literally twee chia dreamcatcher. Fam truffaut artisan typewriter retro, banjo cold-pressed. Lo-fi thundercats forage tacos, bicycle rights franzen woke fam meh PBR&B hell of neutra artisan literally. Beard raclette lo-fi, unicorn ugh kale chips synth shoreditch heirloom everyday carry food truck banjo squid chambray before they sold out.',
    remainingFavNum: 3,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Need',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551709335/favor-pictures/carWashing.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.735844, 40.416143],
    },
    locationName: 'Ronda Lago, 1-3, 28011 Madrid',
  },
  {
    name: 'Elderly care',
    description: 'Lorem ipsum dolor amet slow-carb man braid gentrify prism raclette, cray disrupt twee leggings. Try-hard gluten-free wayfarers bicycle rights hexagon copper mug franzen irony iPhone meggings XOXO vice leggings tousled. Tacos etsy mumblecore lyft umami hot chicken forage selvage tilde helvetica keffiyeh hashtag banjo affogato raclette.',
    remainingFavNum: 6,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Offer',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551709587/favor-pictures/elderlyCare.jpg', 'https://res.cloudinary.com/boonafide/image/upload/v1551709587/favor-pictures/elderlyCcare.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.709288, 40.425904],
    },
    locationName: 'Calle de Amaniel, 10-18, 28015 Madrid',
  },
  {
    name: 'Coding to kids',
    description: 'Lorem ipsum dolor amet slow-carb man braid gentrify prism raclette, cray disrupt twee leggings. Try-hard gluten-free wayfarers bicycle rights hexagon copper mug franzen irony iPhone meggings XOXO vice leggings tousled. Tacos etsy mumblecore lyft umami hot chicken forage selvage tilde helvetica keffiyeh hashtag banjo affogato raclette. Skateboard polaroid man braid distillery cronut kale chips tofu snackwave pop-up chillwave green juice.',
    remainingFavNum: 4,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Need',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551709701/favor-pictures/coding_web23.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.7004556, 40.3925362],
    },
    locationName: 'Paseo de la Chopera, 14, 28045 Madrid',
  },
  {
    name: 'Food share, meal at home',
    description: "Lorem ipsum dolor amet photo booth hella deep v live-edge banh mi shaman. Slow-carb tumblr vinyl prism, hashtag af sartorial 90's organic fashion axe butcher vaporware tilde fingerstache. Blog small batch green juice stumptown humblebrag jean shorts hexagon. Jean shorts subway tile XOXO, etsy dreamcatcher asymmetrical PBR&B craft beer beard vice godard.",
    remainingFavNum: 7,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Need',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551709830/favor-pictures/foodShare.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.709288, 40.425904],
    },
    locationName: 'Salustiano Olózaga, 7, 28001 Madrid',
  },
  {
    name: 'Fortnite lessons',
    description: 'Lorem ipsum dolor amet fam four dollar toast put a bird on it, knausgaard copper mug adaptogen tilde. Sriracha fanny pack food truck PBR&B. Kinfolk art party flexitarian scenester enamel pin. Chartreuse authentic jean shorts hoodie adaptogen messenger bag. Master cleanse austin yr marfa woke godard cray pork belly hell of poutine. Succulents wayfarers chambray la croix tbh. Small batch umami swag offal, mustache iceland shoreditch.',
    remainingFavNum: 3,
    shifts: { '17-03-2019': ['11:30', '12:30', '13:30'], '18-03-2019': ['11:30', '12:30', '13:30'], '19-03-2019': ['11:30', '12:30', '13:30'] },
    type: 'Offer',
    pictureUrls: ['https://res.cloudinary.com/boonafide/image/upload/v1551709933/favor-pictures/fortnite.jpg'],
    location: {
      type: 'Point',
      coordinates: [-3.7019995, 40.4517774],
    },
    locationName: 'Calle Aquilino Domínguez, 61, 28020 Madrid',
  },
];


const createFavors = (creatorId, favNeed, favOffer, whoNeedsId, whoseFavId) => {
  Favor.collection.drop().catch(() => console.error('Error dropping Favor collection'));
  const favorsModified = favors.map((f) => ({
    ...f, creatorId, favNeed, favOffer, whoNeedsId, whoseFavId, categories: selectRandomFromArray(CATEGORIES_ENUM, 5),
  }));
  return Favor.create(favorsModified).then((createdFavors) => createdFavors);
};


module.exports = createFavors;
