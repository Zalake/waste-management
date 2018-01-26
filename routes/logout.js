var express = require('express');
var router = express.Router();
router.get('/',function(req, res, next){
	if(req.session.loggedIn){
		req.session.loggedIn=null;
	}
	res.redirect('/');
});
module.exports = router;
