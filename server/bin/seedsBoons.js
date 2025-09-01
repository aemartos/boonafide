const Boon = require('../models/Boon');

const createBoons = async (num) => {
  if (num <= 0) return [];

  return Boon.create(Array(num).fill({}));
};

module.exports = createBoons;
