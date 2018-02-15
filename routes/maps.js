var express = require('express');
var router = express.Router();

var dustBin = require('../models/dustbin');
var user = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  dustBin.find(function(err,result){
		var locations=[];
			for(i=0;i<result.length;i++)
			{	locations.push(result[i]._id);
				locations.push(result[i].lat);
				locations.push(result[i].long);
				locations.push(result[i].status);
				
			}

		if(req.session.loggedIn && req.session.user=="register as Driver")
			res.render('maps', {'locations':locations,'sessionValue':req.session.loggedIn});
		else
			res.redirect('/');
	 });
});
router.post('/',function(req,res){
	var mlat=req.body.lat;
	var mlng=req.body.lng;
	var mylat=req.body.mylat;
	var mylng=req.body.mylng;
	var id=req.body.id;
	dustBin.update({'_id':id},{$set:{status:"notfull"}},function(err,result){
		console.log("result",result);

	})
	res.redirect("https://www.google.co.in/maps/dir/" +String(mylat)+","+String(mylng)+"/"+String(mlat)+","+String(mlng)+"/");
});
module.exports = router;
