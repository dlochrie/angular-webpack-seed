/**
 * @fileoverview The Search Controller.
 */



/**
 * The Search Controller.
 * @param {!angular.$filter} $filter The Angular $filter service.
 * @param {!angular.$window} $window The Angular $window service (wraps the
 *     global window object).
 * @param {!awesomeness.components.messages.messages} messages The messages service.
 * @param {!awesomeness.components.search.search} search The search service.
 * @constructor
 */
function SearchController($filter, $window, messages, search) {
  /**
   * Local reference to injected services/properties.
   * @type {!Object.<string, !Object>}
   */
  this.ij = {
    filter: $filter,
    window: $window,
    messages: messages,
    search: search
  };

  /**
   * The model that represents the selected (from search results) result.
   * @type {!Object}
   */
  this.selected;
}


/** Export the module. */
module.exports = SearchController;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
SearchController.$inject = ['$filter', '$window', 'messages', 'search'];


/**
 * Navigates to the currently selected video.
 */
SearchController.prototype.navigate = function() {
  var selected = this.selected,
      ij = this.ij,
      location = ij.window.location,
      url;

  // Determine whether we are navigating to a static page, or to a video.
  if (selected.type && selected.type === 'page') {
    url = selected.url;
  } else {
    url = '/view/' + selected.id;
  }

  // Navigate to the proper URL.
  // TODO(dlochrie): This is not a recommended approach. Revisit when all
  // routes are handled by ui.router.
  location.href = url;

  // Clear the search input.
  self.selected = null;
};


/**
 * Gets a list of search results matching the provided value/criteria.
 * @param {string} value The search string/criteria.
 * @return {!Array.<!Object>} List of results matching the search criteria.
 */
SearchController.prototype.search = function(value) {
  var ij = this.ij,
      messages = ij.messages,
      search = ij.search,
      staticPages = search.STATIC_PAGES;

  // Make a request with the selected value.
  return search.search(value).then(function(results) {
    var content = results && results.items ? results.items : [];
    var pages = search.getStaticResults(value);
    // Combine the search results with any pages matched.
    return pages.concat(content);
  }, messages.displayError.bind(messages));
};
