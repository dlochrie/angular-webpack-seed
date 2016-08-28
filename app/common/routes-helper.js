/**
 * @fileoverview The Routes Helper. Provides some common functionaility for
 * routers - such as providing the Anchor Scroll (for scrolling into the
 * main content, and updating the title).
 */
var constants = require('./constants'),
    translationConfig = require('./translations');



/**
 * The Routes Helper.
 * @param {!angular.$location} $location The Angular $location service.
 * @param {!angular.$rootScope} $rootScope The Angular Root Scope.
 * @param {!ui.router.$state} $state The UI Router $state service.
 * @param {$translate.$translate} $translate The Angular Translate $translate
 *     service.
 * @param {!awesomeness.components.pageData.pageData} pageData The Page Data service.
 * @constructor
 */
function RoutesHelper($location, $rootScope, $state, $translate, pageData) {
  // Scrolls into view. This is useful is a user was on a mobile device and
  // clicked a link at the bottom - we would scroll back to the top.
  document.querySelector('body').scrollIntoView();

  // Catch-all for any lang/locale query params (?lang=, ?locale=).
  // Unfortunately, the ui.router $state service does not provide access to
  // params unless they were defined in the $stateProvide config.
  var params = $location.search();
  var newLocale = params.lang || params.locale;
  if (newLocale) {
    var languageKeys = Object.keys(translationConfig);
    if (languageKeys.indexOf(newLocale) !== -1) {
      $translate.use(newLocale);
    }
  }

  // Check for any custom data to use to update the Page Title and Description.
  // NOTE: We must use the $rootScope here, since there is no local $scope
  // relative to this helper.
  $rootScope.$watch(function() {
    return $state.current && $state.current.data;
  }, function(newValue, oldValue) {
    if (newValue) {
      pageData.setTitle(newValue.title);
      pageData.setDescription(newValue.description);
    }
  });
}


/** Export the module. */
module.exports = RoutesHelper;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
RoutesHelper.$inject = ['$location', '$rootScope', '$state', '$translate',
  'pageData'];
