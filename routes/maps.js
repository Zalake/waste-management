var express = require('express');
var router = express.Router();


var dustBin = require('../models/dustbin');
var user = require('../models/user');
var user;

/* GET users listing. */
router.get('/', function(req, res, next) {



	
	if(user != req.session.userName){
		user = req.session.userName;
		req.io.on('connection', function(socket){
	
			dustBin.find(function(err,result){
				var locations=[];
				for(i=0;i<result.length;i++)
				{	locations.push(result[i].id);
					locations.push(result[i].lat);
					locations.push(result[i].long);
					locations.push(result[i].status);
			
				}
				socket.emit('initData',locations);
				console.log("data sent");
			});
			
			
			socket.on('locationData',function(data){
				var mlat=data.mlat;
				var mlng=data.mlng;
				var mylat=data.mylat;
				var mylng=data.mylng;
				var id=data.id;
				dustBin.update({'id':id},{$set:{status:"notfull"}},function(err,result){
					console.log("result",result);
				});
				dustBin.find(function(err,result){
					var locations=[];
					for(i=0;i<result.length;i++)
					{	locations.push(result[i].id);
						locations.push(result[i].lat);
						locations.push(result[i].long);
						locations.push(result[i].status);
			
					}
					socket.broadcast.emit('updateMaps',locations);
					console.log(" refresh data sent");
					var url = "https://www.google.co.in/maps/dir/" +String(mylat)+","+String(mylng)+"/"+String(mlat)+","+String(mlng)+"/"
					socket.emit('mapsPage', url);
				});

			});
		});
	}


	if(req.session.loggedIn)
	{
		res.render('maps', {'sessionValue':req.session.loggedIn});
		
	}
	else
		res.redirect('/');
});
  	




router.post('/',function(req,res){

	var mlat=req.body.mlat;
	var mlng=req.body.mlng;
	var mylat=req.body.mylat;
	var mylng=req.body.mylng;
	var id=req.body.id;
	dustBin.update({'_id':id},{$set:{status:"notfull"}},function(err,result){
		console.log("result",result);
		req.io.on('connection', function(socket){
			console.log("maps connected");
			
			dustBin.find(function(err,result){
				var locations=[];
				for(i=0;i<result.length;i++)
				{	locations.push(result[i]._id);
					locations.push(result[i].lat);
					locations.push(result[i].long);
					locations.push(result[i].status);
					
				}
				socket.broadcast.emit('refreshData',locations);
				console.log("refreshed data sent");
			});

			
			
		});
  		// }

	});
	
	res.redirect("https://www.google.co.in/maps/dir/" +String(mylat)+","+String(mylng)+"/"+String(mlat)+","+String(mlng)+"/");
});
module.exports = router;
