const CATEGORIES_ENUM = [
  'donations',
  'loans',
  'services',
  'repairs',
  'paperwork',
  'leisure',
  'care',
  'education',
  'feeding',
  'clothes',
  'shelter',
  'electronics',
  'animals',
  'home',
  'others',
];

const NOTIFICATIONS_ENUM = {
  newTicket: '',
  newMessage: '',
  favoriteFavor: '',
  commentInFavor: '',
  ticketValidated: '',
  newBoon: '',
};

const selectRandomFromArray = (array, n) => array.sort(() => 0.5 - Math.random()).slice(0, Math.ceil(Math.random() * n));

module.exports = {
  NOTIFICATIONS_ENUM, CATEGORIES_ENUM, selectRandomFromArray,
};
