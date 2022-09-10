const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession).populate('favOffer').populate('favNeed').populate('currentHelped')
    .populate('favDone')
    .populate('favReceived')
    .populate({ path: 'notificationsId', populate: { path: 'favorId' } })
    .populate({ path: 'notificationsId', populate: { path: 'personId' } })
    .populate({ path: 'notificationsId', populate: { path: 'receiverId' } })
    .populate({ path: 'notificationsId', populate: { path: 'ticketId' } })
    .then((userDocument) => cb(null, userDocument))
    .catch((err) => { cb(err); });
});
