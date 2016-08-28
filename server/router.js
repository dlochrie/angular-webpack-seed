var express = require('express'),
    router = express.Router();
    proxyController = require('./controllers/proxy-controller');


router.get('/', proxyController.handleClientGetRequest);

// Expose the router.
module.exports = router;
