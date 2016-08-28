var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    morgan = require('morgan'),
    util = require('util'),
    app = express(),
    router = require('./router');



// Set the template engine to "pug", which used to be known as "Jade". Also set
// the path to our layout.
app.set('view engine', 'pug');
app.set('views', './server/views');

// Setup the logger.
app.use(morgan('dev'));

// Setup body parsing for requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setup cookie parsing.
app.use(cookieParser());

// Serve everything in the "public" directory as static.
app.use(express.static('public'));

// The base URL to use for local requests. Defaults to Stage.
var env = process && process.env ? process.env : {};

// Register the router middleware, which should come last.
app.use(router);

// Finally, start the server.
app.listen(3000, function () {
  // Closure that wraps the message in some color and resets the terminal color
  // when done.
  function wrap(msg) {
    return util.format('%s%s%s', '\x1b[36m', msg, '\x1b[0m');
  }

  console.log(wrap('Dev Server listening on port 3000'));
});
