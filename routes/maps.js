var express = require('express');
var router = express.Router();

var dustBin = require('../models/dustbin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  dustBin.find(function(err,result){
var locations=[];
		for(i=0;i<result.length;i++)
		{
			locations.push(result[i].lat);
			locations.push(result[i].long);
			
		}
		console.log("jubin"+locations);
		res.render('maps', {'locations':locations});
	 });
});

module.exports = router;
