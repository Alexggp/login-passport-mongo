const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res) => {
  res.render('index.ejs');
});

router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));


router.get('/signin', async (req, res) => {
  res.render('signin.ejs');
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

router.get('/login/facebook', passport.authenticate('facebok-login'));
router.get('/auth/facebook/callback', passport.authenticate('facebok-login', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//router.use(isAuthenticated);

router.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile.ejs');
});


function isAuthenticated(req, res ,next) {
  if (req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/');
  }
};


module.exports = router;