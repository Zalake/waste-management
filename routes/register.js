var express = require('express');
var router = express.Router();


var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/',function(req,res){
	console.log(req.body.name, req.body.password);
	var newUser = new user({
		name: req.body.name,
		passwd: req.body.password
	});
	newUser.save();
	res.redirect('/login');
});

module.exports = router;
