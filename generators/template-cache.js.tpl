%s



/**
 * The Template Cache configuration.
 * @param {!angular.$templateCache} $templateCache Angular template cache
 *     factory.
 * @ngInject
 */
function TemplateCacheConfig($templateCache) {
  %s
}


/** Export the module. */
module.exports = TemplateCacheConfig;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
TemplateCacheConfig.$inject = ['$templateCache'];
