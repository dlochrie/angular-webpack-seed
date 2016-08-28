/**
 * The Footer Directive. Creates the (sticky) footer.
 *
 * USAGE:
 *
 *   <any footer></any>
 *
 * @return {!angular.Directive} Directive definition object.
 */
module.exports = function() {
  return {
    restrict: 'A',
    templateUrl: 'components/footer/footer.html',
    controller: 'FooterController',
    controllerAs: 'footerCtrl'
  };
};
