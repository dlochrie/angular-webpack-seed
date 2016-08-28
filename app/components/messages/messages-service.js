/**
 * @fileoverview The Messages Service.
 * Please see below for notes on how to consume this service.
 *
 * USAGE:
 *
 *   Using in a promise:
 *
 *     someService.someMethod().then(function(result) {
 *       messages.displaySuccess(result);
 *     }, function(reason) {
 *       messages.displayError(reason);
 *     });
 *
 *   The above could also be shortened:
 *
 *     someService.someMethod().then(
 *         messages.displaySuccess.bind(messages),
 *         messages.displayError.bind(messages));
 *
 *   NOTE: When you are using the shortened version, make sure you bind the
 *   "messages" context to the method, since the context of "this" is lost in
 *   the promise.
 */



/**
 * The Messages Service.
 * @param {!angular.$timeout} $timeout The Angular $timeout service.
 * @constructor
 */
function MessagesService($timeout) {
  /**
   * Local reference to injected services/properties.
   * @type {!Object.<string, !Object>}
   */
  this.ij = {
    timeout: $timeout
  };

  /**
   * The current message.
   * @type {!Object}
   */
  this.current;

  /**
   * The current transition, if any. This is a reference to the current timeout,
   * and allows us to cancel it if a new incoming message is detected.
   * @type {!angular.$q.Promise}
   */
  this.currentTransition;
}


/** Export the module. */
module.exports = MessagesService;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
MessagesService.$inject = ['$timeout'];


/**
 * Displays a message with the given message text for the given type. An
 * optional duration can be provided to determine how long the message should
 * be displayed.
 * @param {string} msg The message text.
 * @param {string} type The type of message to display (error, success, etc).
 * @param {number=} opt_duration An optional duration for the message.
 */
MessagesService.prototype.display = function(msg, type, opt_duration) {
  var ij = this.ij,
      self = this;

  // Set the duration for the message.
  var duration = !!opt_duration ? parseInt(opt_duration) :
      MessagesService.DEFAULT_MESSAGE_DURATION;

  // Update the duration so that it calculates the number of milliseconds.
  duration = duration * 60 * 10;

  // Get the message text, or a default value for the type.
  var messageText = this.getMessage(msg, type);

  // Set the message object.
  self.current = {
    message: messageText,
    type: type
  };

  // Cancel any transitions still in operation.
  if (this.currentTransition) {
    ij.timeout.cancel(this.currentTransition);
  }

  // Set a new transition timeout for the duration specified.
  this.currentTransition = ij.timeout(function() {
    // Clear the object.
    self.current = null;
  }, duration);
};


/**
 * Convenience wrapper for the display method. Assumes that this is (1) an
 * "error", and (2), it will use the default display duration.
 * @param {string} msg The message text.
 */
MessagesService.prototype.displayError = function(msg) {
  this.display(msg, 'error');
};


/**
 * Convenience wrapper for the display method. Assumes that this is (1) a
 * "info" message, and (2), it will use the default display duration.
 * @param {string} msg The message text.
 */
MessagesService.prototype.displayInfo = function(msg) {
  this.display(msg, 'info');
};


/**
 * Convenience wrapper for the display method. Assumes that this is (1) a
 * "success" message, and (2), it will use the default display duration.
 * @param {string} msg The message text.
 */
MessagesService.prototype.displaySuccess = function(msg) {
  this.display(msg, 'success');
};


/**
 * Gets the message text for the current type, or falls back to a default for
 * the message type.
 * @param {string} msg The message text.
 * @param {string} type The type of message to display (error, success, etc).
 * @return {string} The formatted message text.
 */
MessagesService.prototype.getMessage = function(msg, type) {
  var message = msg || null;

  // If there is message text, return it. Otherwise, fallback to defaults.
  if (message) {
    message = message.trim();
  } else {
    switch (type) {
      case 'error':
        message = 'There was an error with the last operation.';
        break;
      case 'success':
        message = 'The operation was successful.';
        break;
      case 'info':
        message = '';
        break;
    }
  }
  return message;
};


/**
 * The default duration to display a message.
 * @const {number}
 */
MessagesService.DEFAULT_MESSAGE_DURATION = 5;
