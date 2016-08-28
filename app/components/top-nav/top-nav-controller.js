/**
 * @fileoverview The Top-Nav Controller.
 */



/**
 * The Top Nav Controller.
 * @constructor
 */
function TopNavController() {
  /**
   * Flag inidcating the display status of the Nav Menu (in mobile mode).
   * @type {boolean}
   */
  this.showMenu;

  // Intialize the controller.
  this.init();
}


/** Export the module. */
module.exports = TopNavController;


/**
 * List of dependencies required for this controller.
 * Necessary for Strict DI for safe dependency injection.
 * @type {!Array.<string>}
 */
TopNavController.$inject = [];


/**
 * Initializes the contoller.
 */
TopNavController.prototype.init = function() {};


/**
 * Explicitly closes the menu.
 */
TopNavController.prototype.closeMenu = function() {
  this.showMenu = false;
};


/**
 * Toggles the display of the top-nav menu (only applicable in the mobile view).
 */
TopNavController.prototype.toggleMenu = function() {
  this.showMenu = !this.showMenu;
};
