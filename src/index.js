const express = require('express');
const ejsEngine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const loadingRoutes = require('./routes/index');
const mongo = require('./database');
const passport = require('passport')
require('./passport/local-auth');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

//DB


// settings
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsEngine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT||3000);

// middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'mysecretsession',
  resave: false, 
  saveUninitialized: false
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.user = req.user;
  next();
});

// routes

app.use('/', loadingRoutes);

// start the server
app.listen(app.get('port'), () =>{
  console.log('server on port', app.get('port'));
})