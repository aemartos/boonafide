const passport = require('passport');
const User = require('../models/User');
const Favor = require('../models/Favor');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession).populate('favOffer').populate('favNeed').populate('currentHelped').populate('favDone').populate('favReceived')
  .populate({ path: "notificationsId", populate: { path: "favorId" }, populate: { path: "personId" }, populate: { path: "receiverId" }, populate: { path: "ticketId" } })
  .then(userDocument => {
    return cb(null, userDocument)})
  .catch(err => {cb(err)})
});
