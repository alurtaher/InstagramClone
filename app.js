var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//This is used to save our user data in the server without this our user will not log in
const expressSession = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//The resave false means the same data will not be save and saveUninitialized:false means the unINitialized data will not be saved
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:"hey hey hey"
}));

//The passport is a piece of code which handles all the login or logout operations and it makes the protected routes
app.use(passport.initialize())

//From this line the user data is saving in the server
app.use(passport.session())

passport.serializeUser(usersRouter.serializeUser())

passport.deserializeUser(usersRouter.deserializeUser())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
