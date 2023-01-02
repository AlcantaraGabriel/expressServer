var express  = require('express');
var router = express.Router();
var dataBase = require('../../basicCode/appDataBase');


// setup session middlewares
const bcrypt = require('bcrypt')
const saltRounds = 10;
const password = null;
const hash = null;

function isValidUser(email, pswd){
	return dataBase.connect(dataBase.UserSchema, email, pswd);	
}

function isValidLoginForm(email,pswd){
	// Is check by database and here
	let emailRegex = new RegExp('[a-z0-9.]+@[a-z]+\.([a-z])\.[a-z]{2,3}');
	let pswdRegex = new RegExp('([a-zA-Z0-9)]{8,15})');
	console.log(emailRegex.test(email));
	console.log(pswdRegex.test(pswd));
	if(emailRegex.test(email) && pswdRegex.test(pswd)){ 
		let password = pswd;
		let hash = bcrypt.hashSync(pswd, saltRounds);
		let isValidHash = bcrypt.compareSync(pswd, hash);
		isValidUser(email,pswd);
		//console.log(isValidUser(email,pswd));	
		return true;
	}
	else { return false; }
}

router.get('/', function(req, res, next){
	res.render('login', { title: 'Login page' });
});

router.post('/', express.urlencoded({ extended: false }), function(req, res, next){
	//console.log(Object.keys(res.req));
	//console.log(res.req.body.csrf);
	if (isValidLoginForm(res.req.body.email, res.req.body.pswd)){
		req.session.regenerate(function (err){
		if (err) next(err)
		req.session.user = req.body.email
		req.session.save(function (err){
			if (err) return next(err)
			res.redirect('/')
		})
	})
	}
	//console.log(res.req.body.email);
	//console.log(res.req.body.pswd);
	
	//console.log(Object.keys(res));
	//console.log(Object.getOwnPropertyNames(res));
	//console.log(Object.keys(res.req));
	//res.render('', { title: 'Express' });

});


module.exports = router;
