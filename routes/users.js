var user = require('../models/user');

/*
 * GET users listing.
 */
exports.find = function(req,res) {
	user.findAll(function(result){
		res.send(result);	
	},function(e){
		return next(e);
	});
};

exports.insert = function(req,res){
	user.register(req.body,function(result){
		res.send(result);
	},function(e){
		return next(e);	
	});
};

exports.findOne = function(req,res){
	user.findById(req.params.id, function(result){
		res.send(result);
	},function(e){
		return next(e);
	});
};

exports.update = function(req,res){
	user.update(req.params.id, req.body, function(e,result){
		if (e) console.log(e);
		res.send((result._id)?{msg:'success'}:{msg:'error'});	
	});
};

exports.updateRelation = function(req,res){
	user.updateRelation(req.params.id, req.params.relation_id, function(e,result){
		if (e) console.log(e);
		res.send((result._id)?{msg:'success'}:{msg:'error'});	
	});
};

exports.remove = function(req,res){
	user.unregister(req.params.id, function(e,result){
		if (e) return next(e);
		res.send((result===1)?{msg:'success'}:{msg:'error'})
	});
};