var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var clientPort = process.env.CLIENT_PORT || 9001; // set our port
var clientHost = process.env.CLIENT_HOST || "127.0.0.1";
var useProxy = process.env.USE_PROXY || false;
var srvPort = process.env.SRV_PORT || 9000;
var srvHost = process.env.SRV_HOST || "127.0.0.1";
var srvPreffix = process.env.SRV_PREFFIX || "tank-game";

var staticdir = process.env.NODE_ENV === 'development' ? 'dist.dev' : 'dist.prod'; // get static files dir

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/' + staticdir)); // set the static files location /public/img will be /img for users

// routes ==================================================
if(useProxy) { // use backend real api
	var httpProxy = require('http-proxy'),
    apiProxy = httpProxy.createProxyServer();

	app.get("/" + srvPreffix + "/*", function(req, res){ 
  		apiProxy.web(req, res, { target: 'http://' + srvHost + ':' + srvPort});
	});
} else { // use local mock api
	require('./devServer/routes')(app); // configure our routes
}

// start app ===============================================
app.listen(clientPort, clientHost);                   // startup our app at http://localhost:8080
console.log('Starting sever on port ' + clientPort);       // shoutout to the user
exports = module.exports = app;             // expose app