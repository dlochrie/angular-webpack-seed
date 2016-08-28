/**
 * @fileoverview The Proxy Controller for local and remote requests.
 */



/**
 * Handles client requests for Angular routes.
 * @param {!http.IncomingMessage} req The Node.js server request object.
 * @param {!http.ServerResponse} res The Node.js server response object.
 */
exports.handleClientGetRequest = function(req, res) {
  res.render('layout');
};
