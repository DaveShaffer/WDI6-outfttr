var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var methodOverride = require('method-override');
var aws = require('aws-sdk');
var AWS_ACCESS_KEY  = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY  = process.env.AWS_SECRET_KEY;
var S3_BUCKET     = process.env.S3_BUCKET;

var routes = require('./routes/index');
var users  = require('./routes/users');
var itemsRouter = require('./routes/items');

var app      = express();
var mongoose = require('mongoose');
// connect to database
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/outfttr'

mongoose.connect(mongoUri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    aws.config.update({region: '' , signatureVersion: '' });
    var s3 = new aws.S3();
    console.log(S3_BUCKET)
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

app.use('/', routes);
app.use('/users', users);
app.use('/items', itemsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
} ); // end fnc catch and fwd 404

// error handlers

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    } ); // end render err mssg
  } ); // end fnc status
} // end if development env

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  } ); // end render err mssg
} ); // end fnc status

app.listen(process.env.PORT || 5000);

// make express avail for use
module.exports = app;
