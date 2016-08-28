/**
 * @fileoverview The translate configuration.
 */
var translationConfig = require('./common/translations');


/**
 * The translation configuration.
 * @param {!pascalprecht.translate.$translateProvider} $translateProvider The
 *     Angular Translate provider.
 */
function Translate($translateProvider) {
  // Get a list of all the translations.
  var languageKeys = Object.keys(translationConfig);

  // Register each language configuration.
  languageKeys.forEach(function(lang) {
    $translateProvider.translations(lang, translationConfig[lang]);
  });

  // Set the preferred language to English.
  $translateProvider.preferredLanguage('en');

  // Set the value strategy which determines how the values will be escaped.
  $translateProvider.useSanitizeValueStrategy('escape');
}


/** Export the module. */
module.exports = Translate;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
Translate.$inject = ['$translateProvider'];
