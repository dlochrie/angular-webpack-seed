var MessagesController = require('./messages-controller'),
    messagesDirective = require('./messages-directive'),
    MessagesService = require('./messages-service');


/**
 * Definition for the Channels Banner module.
 */
module.exports = angular.module('awesomeness.components.messages', []).
    controller('MessagesController', MessagesController).
    directive('messages', messagesDirective).
    service('messages', MessagesService);
