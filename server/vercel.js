const dotenv = require('dotenv');

dotenv.config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const app = express();

// Middleware Setup
const corsOptions = {
  origin: true, // Allow all origins in production
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

// default value for title local
app.locals.title = 'boonafide';

// Enable authentication using session + passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'project',
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

// Database connection
mongoose.connect(process.env.DBURL, { useNewUrlParser: true })
  .then((x) => { console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`); })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
    console.log('Continuing without database connection...');
  });

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const boonRoutes = require('./routes/boons');
const favorRoutes = require('./routes/favors');
const messageRoutes = require('./routes/messages');
const notificationRoutes = require('./routes/notifications');
const ticketRoutes = require('./routes/tickets');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/boons', boonRoutes);
app.use('/api/favors', favorRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/tickets', ticketRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export for Vercel
module.exports = app;
