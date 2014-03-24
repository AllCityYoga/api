var model = require('../models/challenge');

/*
 * GET users listing.
 */
exports.find = function(req,res) {
	model.findAll(function(result){
		res.send(result);	
	},function(e){
		return next(e);
	});
};

exports.insert = function(req,res){
	model.register(req.body,function(result){
		res.send(result);
	},function(e){
		return next(e);	
	});
};

exports.findOne = function(req,res){
	model.findById(req.params.id, function(result){
		res.send(result);
	},function(e){
		return next(e);
	});
};

exports.update = function(req,res){
	model.update(req.params.id, req.body, function(e,result){
		if (e) console.log(e);
		res.send((result._id)?{msg:'success'}:{msg:'error'});	
	});
};

exports.remove = function(req,res){
	model.unregister(req.params.id, function(e,result){
		if (e) return next(e);
		res.send((result===1)?{msg:'success'}:{msg:'error'})
	});
};