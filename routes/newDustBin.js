var express = require('express');
var router = express.Router();
var dustBin = require('../models/dustbin');

router.get('/',function(req,res){
	console.log(req.query.id);
	console.log(req.query.lat);
	console.log(req.query.lng);

	dustBin.findOne({'id':req.query.id},function(err,result){
		if(result==null){
			var newDustBin = new dustBin({
			id: req.query.id,
			long: req.query.lng,
			lat: req.query.lat,
			status: "full"
			});
			newDustBin.save(callBack);
		}
		else{
			dustBin.update({'id':req.query.id},{$set:{'long':req.query.lng,'lat':req.query.lat}},function(err,result){
				console.log(err);
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
			});
		}
	});
	
	
	
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