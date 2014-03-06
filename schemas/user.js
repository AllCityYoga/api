var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { type: Number, min: 0},
  email: {type: String, trim: true}
});

module.exports = {
	schema: userSchema
}
