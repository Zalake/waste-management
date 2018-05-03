var express = require('express');
var router = express.Router();
var dustBin = require('../models/dustbin');

router.get('/',function(req,res){
	console.log(req.query.id);
	console.log(req.query.lat);
	console.log(req.query.lng);


	var newDustBin = new dustBin({
		id: req.query.id,
		long: req.query.lng,
		lat: req.query.lat,
		status: "full"
	});
	newDustBin.save(callBack);
	
	function callBack(){

		dustBin.find(function(err,result){
			var locations=[];
			for(i=0;i<result.length;i++)
				{	
					locations.push(result[i].id);
					locations.push(result[i].lat);
					locations.push(result[i].long);
					locations.push(result[i].status);
				
				}
			req.io.emit('newDustBin',locations);
		});
		console.log('new data sent');
		res.redirect('/');
	}

	
});
module.exports = router;