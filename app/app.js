// Application-specific modules.
var routes = require('./routes'),
    templateCache = require('./template-cache'),
    translate = require('./translate'),
    components = require('./components/components');


/**
 * The main application module/entry point.
 */
angular.module('awesomeness', [
  'ngAnimate',
  'ngTouch',
  'pascalprecht.translate',
  'ui.bootstrap',
  'ui.router',
  components.name
]).
    config(routes).
    config(translate).
    run(templateCache);
