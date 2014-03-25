
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var users = require('./routes/users');
var http = require('http');
var path = require('path');

// Database

// mongoose implementation
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/acy-api';
var mongoose = require('mongoose');
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

// mongoskin implementation
// var mongo = require('mongoskin');
// var db = mongo.db([
//     'localhost:27017/?auto_reconnect'
//     ], {
//         database: 'acy-api',
//         safe: true
//     }
// );


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// api version
var apiVersion = 'v1';

// api parameters
app.param('collectionName', function(req, res, next, collectionName){
	req.route = collectionName;
	return next()
})

// routes
app.get('/', routes.index);

app.get('/:collectionName',routes.dispatch('find'));

app.post('/:collectionName',routes.dispatch('insert'));

app.get('/:collectionName/:id',routes.dispatch('findOne'));

app.put('/:collectionName/:id',routes.dispatch('update'));

app.put('/:collectionName/:id/:relation/:relation_id',routes.dispatch('updateRelation'));

app.del('/:collectionName/:id',routes.dispatch('remove'));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
