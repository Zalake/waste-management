var express = require('express');
var router = express.Router();


var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session.loggedIn)
	if(req.session.loggedIn)
		res.render('home',{'sessionValue':req.session.loggedIn});
	else
		res.render('home',{'sessionValue': null});
});



module.exports = router;
