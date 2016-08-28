/**
 * @fileoverview Provides a common service that allows any state or component
 * to change page metadata, such as the <title>, or <meta> description on the
 * fly, helping out analytics and bookmarking.
 */
var constants = require('../../common/constants');



/**
 * The Page Data Service.
 * @constructor
 */
function PageDataService() {
  // Intialize the service.
  this.init();
}


/** Export the module. */
module.exports = PageDataService;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
PageDataService.$inject = [];


/**
 * Initializes the service.
 */
PageDataService.prototype.init = function() {
  // Update the title and description with the application defaults.
  var appConstants = constants.APP_CONSTANTS;
  this.title = appConstants.SITE_NAME;
  this.description = appConstants.SITE_DESCRIPTION;
};


/**
 * Sets the Page Title.
 * @param {string} text The text to use in the page title.
 */
PageDataService.prototype.setDescription = function(text) {
  this.description = text;
};


/**
 * Sets the Page Title.
 * @param {string} text The text to use in the page title.
 */
PageDataService.prototype.setTitle = function(text) {
  this.title = text;
};
