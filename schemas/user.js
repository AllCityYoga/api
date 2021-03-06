var Schema = function(){
	var mongoose = require("mongoose");
	var MSchema = mongoose.Schema;

	var _schema = new MSchema({
	  name: {
	    first: String,
	    last: { type: String, trim: true }
	  },
	  age: { type: Number, min: 0},
	  email: {type: String, trim: true},
	  challenge_ids: {type: Array, index: true},
	  challenges_count: Number
	});

	return _schema;
}();

module.exports = Schema;