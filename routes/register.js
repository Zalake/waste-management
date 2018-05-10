var express = require('express');
var router = express.Router();


var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register',{'sessionValue':req.session.loggedIn});
});

router.post('/',function(req,res){
	console.log(req.body.name, req.body.password,req.body.role);
	var newUser = new user({
		name: req.body.name,
		passwd: req.body.password
		// status:req.body.role
	});
	newUser.save(()=> {
		res.redirect('/login');
	});
});

module.exports = router;
