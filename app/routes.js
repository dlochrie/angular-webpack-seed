/**
 * @fileoverview Router configuration for the application and static pages.
 * For "state" specific routes (channels/videos), see the directory for the
 * state to it's routes configuration.
 */
var util = require('util'),
    constants = require('./common/constants'),
    RoutesHelper = require('./common/routes-helper');



/**
 * Router configuration for the application and static pages.
 * @param {!angular.$locationProvider} $locationProvider The Angular location
 *     provider.
 * @param {!ui.router.$stateProvider} $stateProvider The UI Router $state
 *     Provider.
 * @param {!ui.router.$urlRouterProvider} $urlRouterProvider The UI Router
 *     "Router" Provider.
 * @constructor
 */
function Router($locationProvider, $stateProvider, $urlRouterProvider) {
  // Set HTML5 mode to true.
  $locationProvider.html5Mode(true);

  // The default state/route for the application.
  $urlRouterProvider.otherwise('/');

  // The route configuration.
  $stateProvider.
      state('home', {
        url: '/',
        onEnter: RoutesHelper,
        data: {
          title: util.format('%s - Home', constants.APP_CONSTANTS.SITE_NAME),
          description: constants.APP_CONSTANTS.SITE_DESCRIPTION
        },
        templateUrl: 'home/home.html'
      });
}


/** Export the module. */
module.exports = Router;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
Router.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
