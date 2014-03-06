var User = function(){
	var mongoose = require("mongoose");
	var userSchema = require('../schemas/user').schema;
	var _model = mongoose.model('users', userSchema);

	var _register = function(json, success, fail){
		_model.create(json, function (e,doc) {
			if (e) {
				fail(e);
			}else{
				success(doc);
			}
		});
	};

	var _find = function(query,success, fail){
		_model.find(query).exec(function(e,doc){
			if (e) {
				fail(e);
			}else{
				success(doc);
			}
		});
	};

	return {
		schema : userSchema,
		model : _model,
		register : _register,
		find : _find

	}
}();

module.exports = User;
