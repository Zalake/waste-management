var express = require('express');
var router = express.Router();


var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/',function(req,res){
	var userName = req.body.name;
	var password = req.body.password;
	console.log(userName, password);
	user.findOne({'name':userName},'name passwd',function(err,result){
		if(result.passwd==password){
		req.session.loggedIn=userName;
		res.redirect('/maps');
		}
		else
		{
			var msg="Invalid username or password";
			res.render('login',{'msg':msg});
		}
	});

});

module.exports = router;
