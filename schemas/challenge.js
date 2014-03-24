var Schema = function(){
	var mongoose = require("mongoose");
	var MSchema = mongoose.Schema;

	var _schema = new MSchema({
	  owner: String,
	  name: String,
	  date: Date,
	  detail: {
	  	unit: Number,
	  	measurement: String
	  },
	  tags: {type: Array, index: true},
	  tags_count: Number
	});

	return _schema;
}();

module.exports = Schema;