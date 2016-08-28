/**
 * @fileoverview The Messages Controller.
 */



/**
 * Controller for the Messages Directive.
 * @param {!angular.Scope} $scope The current $scope.
 * @param {!awesomeness.components.messages.messages} messages The
 *     Messages service.
 * @constructor
 */
function MessagesController($scope, messages) {
  /**
   * Local reference to injected services/properties.
   * @type {!Object.<string, !Object>}
   */
  this.ij = {
    scope: $scope,
    messages: messages
  };

  /**
   * The current message to display. This is a local reference, and should not
   * be confused with the authoritative property of the same name on the
   * service.
   * @type {!Object}
   */
  this.current;

  // Initialize the controller.
  this.init();
}


/** Export the module. */
module.exports = MessagesController;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
MessagesController.$inject = ['$scope', 'messages'];


/**
 * Initializes the controller properties.
 */
MessagesController.prototype.init = function() {
  var ij = this.ij,
      scope = ij.scope,
      messages = ij.messages,
      self = this;

  // Set the current value to what it is in the messages service
  // (authoritative).
  this.current = messages.current;

  // Look for changes to the current value in the service, and update locally.
  scope.$watch(function() {
    return messages.current;
  }, function(newValue, oldValue) {
    if (!angular.equals(newValue, oldValue)) {
      self.current = newValue;
    }
  });
};
