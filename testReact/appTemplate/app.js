// base libaries
var createError = require('http-errors');
var express = require('express');
var path = require('path');

// auth libaries
var cookieParser = require('cookie-parser');
//var csrf = require('csurf');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');

//var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false});

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set('trust proxy', 1)
//const expiryDate = new Date(Date.now() + 1 * 1 * 1) // 10 minutes

app.use(session({
   name: 'session',
   resave: false,
   saveUninitialized: false,
   secret: 'here',
   cookie: { 
   	secure: true,
   	httpOnly: true,
   	expires: 1000
   },
}));

function createSession(req, res, next){
	try{
		//app.use(session(sess));
		//console.log(res.session);
		res.render('login', {title: 'Login page'});
	}catch(err){
		res.status(500).send('Sesssion not started');
	}
}

// setup session middlewares
/*
app.set('trust proxy', 1)
const expiryDate = new Date(Date.now() + 1 * 1 * 1000) // 10 minutes
app.use(session({
   name: 'session',
   resave: false,
   saveUninitialized: false,
   secret: 'here',
   cookie: { 
   	secure: true,
   	httpOnly: true,
   	expires: expiryDate
   }
}));

// cookie is true 'use it' ? 'not use it'!
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// middleware to test if authenticated

function isAuthenticated (req, res, next){
   if (req.session.user) next()
   else next('route')
}
//isAuthenticated
*/


function isAuthenticated (req, res, next){
	try{
		if (req.session.user ) next()
   		else next('route')
	}
	catch(err){
  		res.status(404).send('Something broke!')
	}

}

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
//console.log(res.session);
	console.log(Object.keys(req));
	console.log(req.session);
	//console.log(req.sessionID);
	console.log(req.sessionStore);
	//onsole.log(req.remoteAddress);
	res.render('index', {title: 'Main Page'})
	//res.send(escapeHtml(req.session.user) + '!' + ' <a href="/logout">Logout</a>')
})

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', isAuthenticated, usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('/favicon.ico', (req, res) => {
	res.sendFile("favicon.ico");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
