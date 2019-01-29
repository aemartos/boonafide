const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../../.private.env')});


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


let loginPromise = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, e => e? reject(e):resolve(user))
  })
}

router.post("/login", (req, res, next) => {
  passport.authenticate("local",(err, theUser, failureDetails) => {
    if (err) return res.status(500).json({ message: 'Something went wrong' });
    if (!theUser) return res.status(401).json(failureDetails);
    loginPromise(req, theUser)
      .then(() => res.status(200).json(req.user))
      .catch(e => res.status(500).send(e.message));
  })(req,res,next)
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.status(400).send("Indicate username and password");
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(409).send("The username already exists");
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      pictureUrl: "https://picsum.photos/200/300/?random"
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

router.get("/currentuser", (req, res) => {
  const {user} = req;
  if(user){
    res.json({success: "OK", user});
  }else{
    res.status(401).send("NO USER LOGGED IN");
  }
});

router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${process.env.URL_CLIENT}/profile`,
    failureRedirect: `${process.env.URL_CLIENT}/api/auth/login`
  })
);

router.get("/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));
router.get("/google/callback", passport.authenticate("google", {
  successRedirect: `${process.env.URL_CLIENT}/profile`,
  failureRedirect: `${process.env.URL_CLIENT}/api/auth/login`
}));

router.get("/logout", (req, res) => {
  req.logout();
  res.json({success: "OK"})
});

module.exports = router;
