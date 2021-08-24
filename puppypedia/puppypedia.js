var createError = require('http-errors');
var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
require('express-validator')
const fileUpload = require('express-fileupload');

const flash = require('express-flash')
const session = require('express-session')
var adminRouter = require('./routes/routes');
const bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('keyboard cat'));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000000 }}))

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/', adminRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// //error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
// console.log(err.message,'......er');

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// }); 
app.listen(7700,function(){
  console.log("My server is running on Port 7700")
}) 

module.exports = app;
