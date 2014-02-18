
/*
 * GET home page.
 */
var models = {
	users: require('./users')
};

// TODO implement challenges api
//var challenges = require('./challenges')

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.dispatch = function(db, method) {
	return function(req,res){
		models[req.route][method](req,res,db);
	} 
};