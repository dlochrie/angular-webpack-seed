/**
 * The Search directive. Displays links associated with help and
 * support-related pages.
 *
 * USAGE:
 *
 *   <div search></div>
 *
 * @return {!angular.Directive} Directive definition object.
 */
module.exports = function() {
  return {
    restrict: 'A',
    controller: 'SearchController',
    controllerAs: 'searchCtrl',
    templateUrl: 'components/search/search.html'
  };
};
