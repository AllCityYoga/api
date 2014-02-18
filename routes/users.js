
/*
 * GET users listing.
 */
exports.find = function(req,res,db) {
	db.collection('users').find({},{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
		if (e) return next(e)
		res.send(results)
	});
};

exports.insert = function(req,res,db){
	db.collection('users').insert(req.body, {}, function(e, results){
		if (e) return next(e)
		res.send(results)
	});
};

exports.findOne = function(req,res,db){
	db.collection('users').findOne({_id: db.collection('users').id(req.params.id)}, function(e, result){
		if (e) return next(e)
		res.send(result)
	});
};

exports.update = function(req,res,db){
	db.collection('users').update({_id: db.collection('users').id(req.params.id)}, {$set:req.body}, {safe:true, multi:false}, function(e, result){
		if (e) return next(e)
		res.send((result===1)?{msg:'success'}:{msg:'error'})
	});
};

exports.remove = function(req,res,db){
	db.collection('users').remove({_id: db.collection('users').id(req.params.id)}, function(e, result){
		if (e) return next(e)
		res.send((result===1)?{msg:'success'}:{msg:'error'})
	});
};