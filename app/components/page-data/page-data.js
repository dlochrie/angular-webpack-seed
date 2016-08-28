var PageDataController = require('./page-data-controller'),
    PageDataService = require('./page-data-service');


/**
 * Definition for the Page Data module.
 */
module.exports = angular.module('awesomeness.components.pageData', []).
    controller('PageDataController', PageDataController).
    service('pageData', PageDataService);
