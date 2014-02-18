
/*
 * GET users listing.
 */

exports.list = function(db) {
	return function(req,res){
		req.collection.find({},{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
			if (e) return next(e)
			res.send(results)
		});
	} 
};