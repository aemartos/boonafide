const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const http = require('http');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const socketIo = require('socket.io');

const { chat } = require('./middlewares/chat');

mongoose.connect(process.env.DBURL, { useNewUrlParser: true })
  .then((x) => { console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`); })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
    console.log('Continuing without database connection...');
  });

// eslint-disable-next-line import/extensions
const appName = require('./package.json').name;
// eslint-disable-next-line import/no-extraneous-dependencies
require('debug')(`${appName}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    return callback(null, originIsWhitelisted);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
app.enable('trust proxy');
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());

// To serve app built in PROD
app.use(express.static(path.join(__dirname, 'public')));

// default value for title local
app.locals.title = 'boonafide';

// Enable authentication using session + passport
app.use(session({
  secret: 'project',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DBURL,
  }),
}));
app.use(flash());
require('./passport')(app);

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  },
});
global.io = io;
global.io.on('connection', chat);


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

app.use('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = {
  app,
  server,
};
