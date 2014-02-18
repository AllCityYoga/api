
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var users = require('./routes/users');
var http = require('http');
var path = require('path');

// Database
var mongo = require('mongoskin');
var db = mongo.db([
    'localhost:27017/?auto_reconnect'
    ], {
        database: 'allcityyoga-api',
        safe: true
    }
);


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
	req.collection = db.collection(collectionName);
	req.route = collectionName;
	return next()
})

// routes
app.get('/', routes.index);

// TODO: send this to routes :collectionName
app.get('/' + apiVersion + '/:collectionName',routes.users.list(db));

app.post('/' + apiVersion + '/:collectionName', function(req, res) {
	req.collection.insert(req.body, {}, function(e, results){
		if (e) return next(e)
		res.send(results)
	});
});

app.get('/' + apiVersion + '/:collectionName/:id', function(req, res) {
	req.collection.findOne({_id: req.collection.id(req.params.id)}, function(e, result){
		if (e) return next(e)
		res.send(result)
	});
});

app.put('/' + apiVersion + '/:collectionName/:id', function(req, res) {
	req.collection.update({_id: req.collection.id(req.params.id)}, {$set:req.body}, {safe:true, multi:false}, function(e, result){
		if (e) return next(e)
		res.send((result===1)?{msg:'success'}:{msg:'error'})
	});
});

app.del('/' + apiVersion + '/:collectionName/:id', function(req, res) {
	req.collection.remove({_id: req.collection.id(req.params.id)}, function(e, result){
		if (e) return next(e)
		res.send((result===1)?{msg:'success'}:{msg:'error'})
	});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
