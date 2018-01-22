var express = require('express');
var router = express.Router();


var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.post('/',function(req,res){
	var userName = req.body.name;
	var password = req.body.password;
	user.findOne({'user.name':userName},function(err,result){
		console.log(result);
	});
});

module.exports = router;
