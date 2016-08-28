/**
 * The Top Nav Directive. Creates the top navigation menu.
 *
 * USAGE:
 *
 *   <any top-nav></any>
 *
 * @return {!angular.Directive} Directive definition object.
 */
module.exports = function() {
  return {
    restrict: 'A',
    controller: 'TopNavController',
    controllerAs: 'topNavCtrl',
    templateUrl: 'components/top-nav/top-nav.html'
  };
};
