/**
 * @fileoverview The Page Data Controller.
 */



/**
 * The Page Data Controller.
 * @param {!awesomeness.components.pageData.pageData} pageData The Page Data service.
 * @constructor
 */
function PageDataController(pageData) {
  this.pageData = pageData;
}


/** Export the module. */
module.exports = PageDataController;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
PageDataController.$inject = ['pageData'];


/**
 * Gets the Page's <meta> description.
 * @return {string} The current page title.
 */
PageDataController.prototype.getDescription = function() {
  var pageData = this.pageData;
  return pageData.description;
};


/**
 * Gets the Page's title.
 * @return {string} The current page title.
 */
PageDataController.prototype.getTitle = function() {
  var pageData = this.pageData;
  return pageData.title;
};
