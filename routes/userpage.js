var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
	if(req.session.loggedIn&&req.session.user=="register as Customer")
			res.render('userpage',{'sessionValue':req.session.loggedIn});
		else{console.log("login first");

			res.redirect('/maps');
		}



  
});
module.exports = router;