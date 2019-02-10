const Boon = require("../models/Boon");

const createBoons = (ownerId, num) => {
  Boon.collection.drop();
  return (num ? Boon.create(Array(num).fill({ownerId}))
    : new Promise((resolve, reject) => resolve([])))
    .then(boons => boons)
}

module.exports = createBoons;
