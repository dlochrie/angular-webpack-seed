var SearchController = require('./search-controller'),
    SearchService = require('./search-service'),
    searchDirective = require('./search-directive');


/**
 * Definition for the Top Nav module.
 */
module.exports = angular.module('awesomeness.components.search', []).
    controller('SearchController', SearchController).
    directive('search', searchDirective).
    service('search', SearchService);
