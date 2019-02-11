var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var port = process.env.PORT||3000;
var server = require('http').Server(app).listen(port,function(err,success){
  console.log("server running");
});
var io = require('socket.io').listen(server);


var index = require('./routes/index');
var maps = require('./routes/maps');
var login = require('./routes/login');
var register = require('./routes/register');
var logout = require('./routes/logout');
var userpage = require('./routes/userpage');
var newDustBin = require('./routes/newDustBin');
var session = require('express-session');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://client:shri@ds211088.mlab.com:11088/wmanagement');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('LOGGED | MongoDB Connected - ' + new Date());
});

app.use(function(req,res,next){
  req.io = io;
  next();
});

app.use(session({
    secret:"qwerty",
    resave:true,
    cookie:true,
    saveUninitialized:false
}));

app.use('/', index);
app.use('/maps', maps);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/userpage', userpage);
app.use('/newDustBin', newDustBin);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
