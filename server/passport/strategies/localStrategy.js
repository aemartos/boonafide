const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({username})
      .populate('favOffer').populate('favNeed').populate('currentHelped').populate('favDone').populate('favReceived')
      .populate({ path: "notificationsId", populate: { path: "favorId" }})
      .populate({ path: "notificationsId", populate: { path: "personId" }})
      .populate({ path: "notificationsId", populate: { path: "receiverId" }})
      .populate({ path: "notificationsId", populate: { path: "ticketId" }})
      .then(foundUser => {
        if (!foundUser) {
          done(null, false, {message: 'Incorrect username or password'});
          return;
        }
        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, {message: 'Incorrect username or password'});
          return;
        }
        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));
