var express = require('express')
  , path = require('path')
  , routes = require('./routes')
  //, OAuth = require('./lib/oauth')
  , host = process.env.IP || 'localhost'
  , port = process.env.PORT || 59902;


//var app = express()
var express = require('express');
var app = module.exports = express();

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect repects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// setup EJS view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

/* 
app.configure(function(){
  app.use(express.urlencoded());
  // add session
  //app.use(express.cookieParser('somethingsupersecret'));
  //app.use(express.session());

  // serve static files
  app.use(express.static(path.join(__dirname, 'public')));
});
*/

// the root maps to the index of routes in /routes folder
app.get('/', routes.index);

// the foafiaf/map path routes to the foafiaf_map.js in /routes folder
app.get('/foafiaf/map', routes.foafiaf_map);



app.listen(port, host);
console.log('Listening on port http://' + host + ':' + port);
