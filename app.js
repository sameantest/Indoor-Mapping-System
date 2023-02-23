const crypto = require('crypto');
const jwtSecret = crypto.randomBytes(64).toString('hex');
process.env.JWT_SECRET = jwtSecret;

require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mapRouter = require('./routes/map');
var adminRouter = require('./routes/adminreg');
var adminLoginRouter = require('./routes/adminlogin');
var userRegRouter = require('./routes/userreg');
var userLoginRouter = require('./routes/userLogin');

var app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://Indoormapping:12345@cluster0.uzspr3v.mongodb.net/Shopping_Mall?retryWrites=true&w=majority', { useNewUrlParser: true})
.then(console.log("Connection was successful"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/map', mapRouter);
app.use('/admin', adminRouter);
app.use('/login', adminLoginRouter);
app.use('/user', userRegRouter);
app.use('/userlogin', userLoginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
