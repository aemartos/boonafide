const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const Boon = require('../models/Boon');
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');

const generateHash = require('random-hash').generateHash;

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../../.private.env')});


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


let loginPromise = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, e => e ? reject(e) : resolve(user));
  })
}

router.post("/login", isLoggedOut, (req, res, next) => {
  passport.authenticate("local",(err, theUser, failureDetails) => {
    if (err) return res.status(500).json({ message: 'Something went wrong' });
    if (!theUser) return res.status(401).json(failureDetails);
    loginPromise(req, theUser)
      .then(() => res.status(200).json(req.user))
      .catch(e => res.status(500).send(e.message));
  })(req,res,next)
});

router.post("/signup", isLoggedOut, (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (username === "" || email === "" || password === "") {
    res.status(400).send("Indicate username, email and password");
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(409).send("The username already exists");
      return;
    } else {
        User.findOne({email}, "email", (err, user) => {
          if (user !== null) {
            req.status(409).send("The email already exists");
            return;
          }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        User.findOne({role: "Bank"}, (err, ibo) => {
          const boons = ibo.boons.splice(0, 3).map(b => b._id);
          ibo.save()
            .then(()=> {
              const newUser = new User({
                username,
                email,
                password: hashPass,
                boons,
                token: generateHash({ length: 32 })
              });
              newUser.save()
                .then(user => loginPromise(req,user))
                .then(user => {
                  res.json({user})
                })
                .catch(err => {
                  res.status(500).send("Something went wrong");
                })
            });
        });
      });
    }
  });
});

router.get("/currentuser", (req, res) => {
  const {user} = req;
  if(user){
    res.json({success: "OK", user});
  }
  // else{
  //   res.status(401).send("NO USER LOGGED IN");
  // }
});

router.get("/facebook", isLoggedOut, passport.authenticate("facebook"));
router.get("/facebook/callback", isLoggedOut,
  passport.authenticate("facebook", {
    successRedirect: `${process.env.URL_CLIENT}/profile`,
    failureRedirect: `${process.env.URL_CLIENT}/api/auth/login`
  })
);

router.get("/google", isLoggedOut, passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));
router.get("/google/callback", isLoggedOut, passport.authenticate("google", {
  successRedirect: `${process.env.URL_CLIENT}/profile`,
  failureRedirect: `${process.env.URL_CLIENT}/api/auth/login`
}));

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.json({success: "OK"})
});

module.exports = router;
