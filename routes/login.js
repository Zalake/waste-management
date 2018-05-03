var express = require('express');
var router = express.Router();


var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{'sessionValue':req.session.loggedIn});
});

router.post('/',function(req,res){
	var userName = req.body.name;
	var password = req.body.password;
	console.log(userName, password);
	user.findOne({'name':userName},function(err,result){
		if (result!=null) {  
			console.log(result);
			if(result.passwd==password){
				req.session.loggedIn=true;
				req.session.userName=result.name;
				req.session.user=result.status;
				if(result.status=="register as Customer"){
					console.log("userpage");
					res.redirect('/userpage');
				}
				else{

					res.redirect('/maps');
				}
			}
		}
		else
		{	req.session.loggedIn=false;
			var msg="Invalid username or password";
			res.render('login',{'msg':msg,'sessionValue':req.session.loggedIn});
		}
	});

});

module.exports = router;
