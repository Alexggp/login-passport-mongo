const passport = require('passport');
const facebookStrategy = require('passport-facebook');
const fbCredentials = require('./../keys').facebook;
const User = require('../models/user');

const fbCallback = (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    User.findOne({facebook_id: profile.id}, (err, user) => {
      if (err) return done(err)
      if (user) return done(null, user)
      else {
        var newUser = new User()
        newUser.facebook_id = profile.id;
        newUser.email = profile.emails[0].value;
        newUser.name = profile.displayName;
        newUser.photo = profile.photos[0].value;

        newUser.save((err) => {
          if(err) throw err
          return done(null, newUser)
        })
      }
    })
  })
}

passport.use('facebok-login', new facebookStrategy(fbCredentials, fbCallback));
