var Challenge = function(){
	var mongoose = require("mongoose");
	var _schema = require('../schemas/challenge');
	var _model = mongoose.model('challenges', _schema);

	var _register = function(json, success, fail){
		_model.create(json, function (e,doc) {
			if (e) {
				fail(e);
			}else{
				success(doc);
			}
		});
	};

	var _findAll = function(success, fail){
		_model.find({}).exec(function(e,doc){
			if (e) {
				fail(e);
			}else{
				success(doc);
			}
		});
	};

	var _findById = function(id,success,fail){
		_model.findOne({_id: id},function(e,doc){
			if(e){
				fail(e);
			}else{
				success(doc);
			}
		});
	};

	var _findByTag = function(tag,success,fail){
		_model.findOne({tags: tag},function(e,doc){
			if(e){
				fail(e);
			}else{
				success(doc);
			}
		});
	};

	var _findByOwnerEmail = function(email,success,fail){
		_model.findOne({owner: email},function(e,doc){
			if(e){
				fail(e);
			}else{
				success(doc);
			}
		});
	};

	var _update = function(id,json,callback){
		_model.findByIdAndUpdate(id,json,callback);
	};

	var _addTag = function(id,tag,callback){
		_update(id,{
	      '$push': {tags: tag},
	      '$inc': {tags_count: 1}
	    },callback);
	}

	var _unregister = function(id, callback){
		_model.remove({_id: id}).exec(callback);
	};


	return {
		schema: _schema,
		model: _model,
		register: _register,
		addTag: _addTag,
		findAll: _findAll,
		unregister: _unregister,
		findById: _findById,
		findByTag: _findByTag,
		findByOwnerEmail: _findByOwnerEmail
	}
}();

module.exports = Challenge;
