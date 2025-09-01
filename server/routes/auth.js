const express = require('express');
const passport = require('passport');
// Bcrypt to encrypt passwords
const bcrypt = require('bcryptjs');

const { generateHash } = require('random-hash');

const dotenv = require('dotenv');

const router = express.Router();
const User = require('../models/User');
const { isLoggedOut, isLoggedIn } = require('../middlewares/isLogged');

dotenv.config();

const bcryptSalt = 10;


const loginPromise = (req, user) => new Promise((resolve, reject) => {
  req.login(user, (e) => (e ? reject(e) : resolve(user)));
});

router.post('/login', isLoggedOut, (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) return res.status(500).json({ message: 'Something went wrong' });
    if (!theUser) return res.status(401).json(failureDetails);
    return loginPromise(req, theUser)
      .then(() => res.status(200).json(req.user))
      .catch((e) => res.status(500).send(e.message));
  })(req, res, next);
});

router.post('/signup', isLoggedOut, (req, res) => {
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  if (username === '' || email === '' || password === '') {
    res.status(400).send('Indicate username, email and password');
    return;
  }

  User.findOne({ username }, 'username', (_, user) => {
    if (user !== null) {
      res.status(409).send('The username already exists');
    } else {
      User.findOne({ email }, 'email', (__, userFound) => {
        if (userFound !== null) {
          req.status(409).send('The email already exists');
          return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        User.findOne({ role: 'Bank' }, (err, ibo) => {
          if (!ibo) {
            res.status(500).send('Bank user not found.');
            return;
          }
          
          const boons = ibo.boons.splice(0, 3).map((b) => b._id);
          ibo.save()
            .then(() => {
              const newUser = new User({
                username,
                email,
                password: hashPass,
                boons,
                token: generateHash({ length: 32 }),
              });
              newUser.save()
                .then((createdUser) => loginPromise(req, createdUser))
                .then((loggedUser) => {
                  res.json({ user: loggedUser });
                })
                .catch((e) => {
                  console.log({ error: e });
                  res.status(500).send('Something went wrong');
                });
            });
        });
      });
    }
  });
});

router.get('/currentuser', (req, res) => {
  const { user } = req;
  if (user) {
    res.json({ success: 'OK', user });
  }
  // else{
  //   res.status(401).send("NO USER LOGGED IN");
  // }
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(400).send('Unable to log out');
    } else if (req.session) {
      req.session.destroy((error) => {
        if (error) {
          res.status(400).send('Unable to log out');
        } else {
          res.json({ success: 'OK' });
        }
      });
    } else {
      res.end();
    }
  });
});

module.exports = router;
