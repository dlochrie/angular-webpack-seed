/**
 * @fileoverview The main entry point for the Grunt configuration and tasks.
 *
 * See "grunt/aliases.js" for registered custom tasks.
 *
 * See the "grunt" directory for configuration files. Files are named for the
 * configuration they represent. For example, where Grunt expects a "watch"
 * property (for the "grunt-contrib-watch" module), this gruntfile will look
 * for it at "grunt/watch.js".
 */
module.exports = function(grunt) {
  // Autoloads the NPM grunt tasks - replaces
  // "grunt.loadNpmTasks('some-module')".
  require('load-grunt-tasks')(grunt);

  // Bootstrap the grunt config plugin.
  require('load-grunt-config')(grunt);
};
