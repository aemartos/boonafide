const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({path: path.join(__dirname, '../.private.env')});
dotenv.config({path: path.join(__dirname, '../.public.env')});
const http = require('http');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
//const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");

mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error('Error connecting to mongo', err)});

const app_name = require('../package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.enable("trust proxy");
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

// default value for title local
app.locals.title = 'boonafide';

// Enable authentication using session + passport
app.use(session({
  secret: 'project',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(flash());
require('./passport')(app);

app.use((req, res, next) => {
  res.locals.user = req.user;
  //console.log(req.user);
  next();
});

let server = http.createServer(app);
var io = require('socket.io')(server);
global.io = io;

// const index = require('./routes/index');
// app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const favorRoutes = require('./routes/favors');
app.use('/api/favors', favorRoutes);

const boonsRoutes = require('./routes/boons');
app.use('/api/boons', boonsRoutes);

const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

const msgRoutes = require('./routes/messages');
app.use('/api/messages', msgRoutes);

const notificationsRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationsRoutes);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname,'public/index.html'));
});

module.exports = {app:app,server:server};
