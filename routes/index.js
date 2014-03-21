
var Routes = function(){
	var mongoose = require("mongoose");
	var MSchema = mongoose.Schema;

	var _routes = {
		users: require('./users'),
		challenges: require('./challenges')
	};

	// GET home page
	var _index = function(req, res){
	  res.render('index', { title: 'Express' });
	};

	var _dispatch = function(method) {
		return function(req,res){
			_routes[req.route][method](req,res);
		} 
	};

	return {
		index: _index,
		dispatch: _dispatch
	};
}();

module.exports = Routes;