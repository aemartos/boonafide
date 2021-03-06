const Boon = require("../models/Boon");

const createBoons = (num) => {
  Boon.collection.drop();
  return (num ? Boon.create(Array(num).fill({}))
    : new Promise((resolve) => resolve([])))
    .then(boons => boons);
};

module.exports = createBoons;
