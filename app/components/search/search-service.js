/**
 * @fileoverview The Search Service.
 */
var util = require('util'),
    constants = require('../../common/constants');



/**
 * The Search Service.
 * @param {!angular.$filter} $filter The Angular $filter service.
 * @param {!angular.$http} $http The Angular $http service.
 * @param {!angular.$q} $q The Angular $q service.
 * @constructor
 */
function SearchService($filter, $http, $q) {
  /**
   * Local reference to injected services/properties.
   * @type {!Object.<string, !Object>}
   */
  this.ij = {
    filter: $filter,
    http: $http,
    q: $q
  };

  /**
   * The endpoint to use during a search.
   * @type {string}
   */
  this.searchEndpoint;

  // Initialize the service.
  this.init();
}


/** Export the module. */
module.exports = SearchService;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
SearchService.$inject = ['$filter', '$http', '$q'];


/**
 * Initializes the service.
 */
SearchService.prototype.init = function() {
  this.searchEndpoint = constants.SERVICE_ENDPOINTS.SEARCH;
};


/**
 * Filters the static pages based on the search criteria using the native
 * filter service.
 * @param {string} value The value or substring to seach for.
 * @return {!Array} An array containing the results.
 */
SearchService.prototype.getStaticResults = function(value) {
  var ij = this.ij,
      filter = ij.filter;

  var staticPages = SearchService.STATIC_PAGES;
  return filter('filter')(staticPages, value);
};


/**
 * Perform a search with the provided values.
 * @param {string} value The search value/criteria to search for.
 * @return {!angular.$q.Promise} The promise containing the response.
 */
SearchService.prototype.search = function(value) {
  var ij = this.ij,
      http = ij.http,
      deferred = ij.q.defer();

  // Format the search URL.
  var queryURL = util.format('%s/%s', this.searchEndpoint, value);

  // Perform the query.
  http.get(queryURL).then(function(response) {
    var result = response && response.data ? response.data : null;
    if (result) {
      if (result.items && !!result.items.length) {
        var max = SearchService.MAX_RESULTS;
        var newLength = result.items.length > max ? max : result.items.length;
        result.items = result.items.slice(0, newLength);
      }
      deferred.resolve(result);
    } else {
      deferred.reject();
    }
  }, deferred.reject);

  // Return the promise.
  return deferred.promise;
};


/**
 * The maximum number of results to display.
 * @const {number}
 */
SearchService.MAX_RESULTS = 15;


/**
 * List of known pages that are prepended to search results.
 * TODO(dlochrie): When Angular/UI Router provides more control over routes,
 * we can possibly pull this list from UI Router through the $state service.
 * @const {Array.<!Object>}
 */
SearchService.STATIC_PAGES = [{
  type: 'page',
  name: 'Home',
  url: '/'
}, {
  type: 'page',
  name: 'About',
  url: '/about'
}];
