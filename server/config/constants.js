const NEW_FAVOR_RECEIVED = "newFavorReceived";
const NEW_FAVOR_DONE = "newFavorDone";
const NEW_MESSAGE = "newMessage";
const NEW_BOON = "newBoon";
const NEW_FAVORITE = "newFavorite";

const CATEGORIES_ENUM = [
  "donations",
  "loans",
  "services",
  "repairs",
  "paperwork",
  "leisure",
  "care",
  "education",
  "feeding",
  "clothes",
  "shelter",
  "electronics",
  "animals",
  "home",
  "others"
];

const selectRandomFromArray = (array, n) => array.sort(() => .5 - Math.random()).slice(0, Math.ceil(Math.random() * n));

module.exports = {
  NEW_BOON, NEW_FAVORITE, NEW_FAVOR_DONE, NEW_FAVOR_RECEIVED, NEW_MESSAGE, CATEGORIES_ENUM, selectRandomFromArray
}
