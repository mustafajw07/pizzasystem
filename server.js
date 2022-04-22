require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongodb-session')(session);
const passport = require('passport');

// database connection
main().catch(err => console.log("Connection failed",err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/pizza');
}

// Session store
let mongoStore = new MongoDbStore ({
  uri: 'mongodb://localhost:27017/pizza',
  collection : 'sessions',
})

//Session config
app.use(session({
  secret : process.env.COOKIE_SECRET,
  resave : false,
  saveUninitialized : false,
  store : mongoStore,
  cookie : {maxAge : 1000 * 60 * 60 * 24} //24HRS
}))

// Passport Config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(flash())

// Assets
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

// Global Middleware
app.use(function(req,res,next){
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// server
require("./routes/web")(app);

// PORT
app.listen(PORT, () => console.log('Server Started'));