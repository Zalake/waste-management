var mongoose = require('mongoose');

var wasteSchema = mongoose.Schema({
	long: String,
	lat: String,
});

var dustBin = mongoose.model('garbagecoll', wasteSchema);

module.exports = dustBin;