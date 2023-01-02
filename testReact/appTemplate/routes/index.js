var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session.user);
	console.log(Object.getOwnPropertyNames(req.session));
	console.log(Object.getOwnPropertyNames(req.session.id));
	console.log(req.session.id);
	console.log(Object.getOwnPropertyNames(req.session.cookie));
	console.log(req.session.cookie);
	
  res.render('index', { title: 'Main Page' });
});

module.exports = router;
