var mongoose = require('mongoose');

var wasteSchema = mongoose.Schema({
	id: String,
	long: String,
	lat: String,
	status: String,
});

var dustBin = mongoose.model('garbagecoll', wasteSchema);

module.exports = dustBin;