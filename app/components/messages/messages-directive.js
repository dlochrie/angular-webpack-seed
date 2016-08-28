/**
 * The Messages Directive. Displays a toast message for a given type of
 * message: success, info, error, etc.
 *
 * USAGE:
 *
 *   <any messages></any>
 *
 * @return {!angular.Directive} Directive definition object.
 */
module.exports = function() {
  return {
    restrict: 'A',
    controller: 'MessagesController',
    controllerAs: 'messagesCtrl',
    templateUrl: 'components/messages/messages.html'
  };
};
