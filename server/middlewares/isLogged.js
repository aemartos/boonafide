/* eslint-disable consistent-return */
const isLoggedIn = (req, res, next) => {
  if (req.user) return next();
  // res.status(403).send('NOT AUTHORISED: you have no access! please login');
};

const isLoggedOut = (req, res, next) => {
  if (!req.user) return next();
  // res.status(403).send('you are logged in already!');
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
