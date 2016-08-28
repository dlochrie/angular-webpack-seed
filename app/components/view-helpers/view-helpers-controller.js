/**
 * @fileoverview The (View) Helpers Controller. Provides view helpers for views
 * and any application HTML markup.
 *
 * Add any view helpers here.
 *
 * USAGE:
 *
 * Ex - Getting an image asset path:
 *
 *   <img ng-src="{{ helperCtrl.getAssetPath('images/play-app-logo.png') }}" />
 *
 */
var path = require('path'),
    lib = require('../../common/lib');



/**
 * The Helpers Controller.
 * @constructor
 */
function HelpersController() {}


/** Export the module. */
module.exports = HelpersController;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
HelpersController.$inject = [];


/**
 * Formats the path to an asset. Prepends version path where necessesary, and
 * fixes issues such as 2 leading slashes, etc.
 * @param {string} resource The resource to get a path for.
 * @return {string} The formatted path to the resource.
 */
HelpersController.prototype.getAssetPath = function(resource) {
  var prependPath = window.ui_path ? window.ui_path : '';
  return resource ? path.join(prependPath, resource) : prependPath;
};


/**
 * Gets the full URL for the channel/author's profile photo..
 * @param {string} authorID The ID of the author to get the profile image for.
 * @return {string} The formatted URL for the profile image.
 */
HelpersController.prototype.getProfileURL = lib.GET_PROFILE_URL;


/**
 * Gets the full URL for the video thumbnail.
 * @param {string} videoID The ID of the video to get the thumbnail image for.
 * @return {string} The formatted URL for the video thumbnail.
 */
HelpersController.prototype.getThumbnailURL = lib.GET_THUMBNAIL_URL;
