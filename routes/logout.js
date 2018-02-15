var express = require('express');
var router = express.Router();
router.get('/',function(req, res, next){
	if(req.session.loggedIn){
		req.session.destroy(function(err) {
		  // cannot access session here
		});
	}
	res.redirect('/');
});
module.exports = router;
