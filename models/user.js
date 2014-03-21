var User = function(){
	var mongoose = require("mongoose");
	var _schema = require('../schemas/user');
	var _model = mongoose.model('users', _schema);

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

	var _findByEmail = function(email,success,fail){
		_model.findOne({email: email},function(e,doc){
			if(e){
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

	var _update = function(id,json,callback){
		_model.findByIdAndUpdate(id,json,callback);
	};

	var _unregister = function(id, callback){
		_model.remove({_id: id}).exec(callback);
	};


	return {
		schema : _schema,
		model : _model,
		register : _register,
		update : _update,
		findAll : _findAll,
		findByEmail : _findByEmail,
		unregister : _unregister,
		findById : _findById
	}
}();

module.exports = User;
