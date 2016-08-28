/**
 * @fileoverview Provides the application with constant values.
 */


/**
 * Constant values to use across the application, such as the site name.
 * @const {!Object.<string, string>}
 */
exports.APP_CONSTANTS = {
  SITE_NAME: 'SEED APPLICATION',
  SITE_DESCRIPTION: 'SEED APPLICATION DESCRIPTION'
};


/**
 * The ID of the element to scroll to during a state transition.
 * @const {string}
 */
exports.MAIN_CONTENT_HASH = 'main-content';


/**
 * Dictionary for messages and canned responses to use for diplaying in flash
 * messages, alerts, toasts, etc.
 * @const {!Object.<string, string>}
 */
exports.MESSAGES = {
  BAD_REQUEST: 'There was an error with the request.',
  BAD_LOGIN: 'The email/password combination was not valid.',
  BAD_LOGOUT: 'There was a problem while logging out.',
  SYSTEM_ERROR: 'There was a system error.'
};


/**
 * Common endpoints for service requests and assets.
 * @const {!Object.<string, string>}
 */
exports.SERVICE_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  SEARCH: '/search'
};
