var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	passwd: String,
	status: String,
});

var user = mongoose.model('user', userSchema);

module.exports = user;