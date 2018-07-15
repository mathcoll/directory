/*
 * 
 * 
 */
var express			= require('express');
var timeout			= require('connect-timeout');
var morgan			= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');
var bearer			= require('bearer');
var jade			= require('jade');
var compression		= require('compression');
var VERSION			= require("./package.json").version;
fs					= require('fs');
favicon				= require('serve-favicon');
request				= require('request');
path				= require('path');	
loki				= require('lokijs');
sprintf				= require('sprintf-js').sprintf;
moment				= require('moment');
uuid				= require('node-uuid');
os					= require('os');

/* Environment settings */
require(sprintf('./data/settings-%s.js', os.hostname()));

/* Main Database settings */
db	= new loki(path.join(__dirname, 'data', 'directory-'+os.hostname()+'.json'), {autoload: true, autosave: true});
if ( db === null ) console.log('db is failing');
if ( db.getCollection('types') === null ) console.log('Collection types is failing');
if ( db.getCollection('resources') === null ) console.log('Collection resources is failing');
console.log(path.join(__dirname, 'data', 'directory-'+os.hostname()+'.json'), db.getCollection('types'));

var pwa				= require('./routes/pwa');
var app				= express();

/* Logging */
console.log('Setting Access Logs to', logAccessFile);
console.log('Setting Error Logs to', logErrorFile);
var error = fs.createWriteStream(logErrorFile, { flags: 'a' });
process.stdout.write = process.stderr.write = error.write.bind(error);
process.on('uncaughtException', function(err) {
	console.error((err && err.stack) ? err.stack : err);
});

var CrossDomain = function(req, res, next) {
	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
		res.status(200).send('');
	}
	else {
		res.setHeader('X-Powered-By', appName+'@'+version);
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
		if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
			res.setHeader('Cache-Control', 'public, max-age=3600');
		}
		next();
	}
};

app.use(CrossDomain);
app.enable('trust proxy');
app.use(compression());
app.use(morgan(logFormat, {stream: fs.createWriteStream(logAccessFile, {flags: 'a'})}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(timeout(timeoutDuration));
//app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.disable('x-powered-by');
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(session(sessionSettings));
app.use(express.static(path.join(__dirname, '/public'), staticOptions));
app.use('/', pwa);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.status(err.status || 500).render(err.status, {
		title : 'Not Found',
		user: req.session.user,
		currentUrl: req.path,
		err: app.get('env')==='development'?err:{status: err.status, stack: null}
	});
	//next(err);
});

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		if (err.name === 'UnauthorizedError') {
			res.status(401).send({ 'code': err.status, 'error': 'Unauthorized: invalid token...'+err.message, 'stack': err.stack }).end();
		} else if (err.name === 'TokenExpiredError') {
			res.status(410).send({ 'code': err.status, 'error': 'Unauthorized: expired token...'+err.message, 'stack': err.stack }).end();
		} else if (err.name === 'JsonWebTokenError') {
			res.status(401).send({ 'code': err.status, 'error': 'Unauthorized: invalid token...'+err.message, 'stack': err.stack }).end();
		} else if (err.name === 'NotBeforeError') {
			res.status(401).send({ 'code': err.status, 'error': 'Unauthorized: invalid token...'+err.message, 'stack': err.stack }).end();
		} else {
			res.status(err.status || 500).send({ 'code': err.status, 'error': err.message, 'stack': err.stack }).end();
		}
	});
} else {
	app.use(function(err, req, res, next) {
		if (err.name === 'UnauthorizedError') {
			res.status(401).send({ 'code': err.status, 'error': 'Unauthorized: invalid token' }).end();
		} else if (err.name === 'TokenExpiredError') {
			res.status(410).send({ 'code': err.status, 'error': 'Unauthorized: expired token' }).end();
		} else if (err.name === 'JsonWebTokenError') {
			res.status(401).send({ 'code': err.status, 'error': 'Unauthorized: invalid token' }).end();
		} else if (err.name === 'NotBeforeError') {
			res.status(401).send({ 'code': err.status, 'error': 'Unauthorized: invalid token' }).end();
		} else {
			res.status(err.status || 500).send({ 'code': err.status, 'error': err.message }).end();
		}
	});
}

module.exports = app;