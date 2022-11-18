var createError = require('http-errors');
var express = require('express');
const cors=require("cors")
var path = require('path');
const bodyParser=require("body-parser")
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//路由
var indexRouter = require('./routes/index');
var imgRouter = require('./routes/img');
const timeRouter = require("./routes/time");

var app = express();
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//应用路由
app.use('/', indexRouter);
app.use('/img', imgRouter);
app.use("/time",timeRouter);

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
