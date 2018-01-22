var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	passwd: String,
});

var user = mongoose.model('users', userSchema);

module.exports = user;