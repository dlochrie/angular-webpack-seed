var express = require('express'),
    router = express.Router();
    proxyController = require('./controllers/proxy-controller');

// Get the patterns used to enable the SPA to work correctly.
var serverRequestPattern = /^\/server\/(.+)/,
    nonServerRequestPattern = /^\/(?!server)(.+)/;

router.get('/', proxyController.handleClientGetRequest);

router.get('/watch/:id', proxyController.handleEmbedRequest);

// Enables HTML5-mode for Angular by forwarding all requests that are not to the
// root ('/') to index.html, which lets Angular (UI Router) to pick up the
// routing. See this link: http://stackoverflow.com/q/17777967/1058612.
router.get(nonServerRequestPattern, proxyController.handleClientGetRequest);

// Reroute any backend GET requests and handle server-side.
router.get(serverRequestPattern, proxyController.handleServerGetRequest);

// Reroute any backend POST requests and handle server-side.
router.post(serverRequestPattern, proxyController.handleServerPostRequest);

// Expose the router.
module.exports = router;
