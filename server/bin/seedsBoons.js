const Boon = require('../models/Boon');

const createBoons = (num) => {
  Boon.collection.drop().catch(() => console.error('Error dropping Favor collection'));
  return (num ? Boon.create(Array(num).fill({}))
    : new Promise((resolve) => resolve([])))
    .then((boons) => boons);
};

module.exports = createBoons;
