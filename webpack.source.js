/**
 * @fileoverview  The webpack configuration for source code.
 *
 * When invoked with `env IS_LOCAL=true` (or having that environmental variable set), this script will skip uglifying
 * the source code (which saves some time and helps speed up development).
 */
var webpack = require('webpack');




// Check if we are running locally - if we are, we skip the Uglify task, which
// saves about 8-10 seconds on local grunt-watch tasks.
var isLocal = process.env.IS_LOCAL;

/**
 * Create the configuration for the WebPack build.
 */
module.exports = function makeWebpackConfig () {
  /**
   * Config.
   * Reference: http://webpack.github.io/docs/configuration.html
   */
  var config = {};

  /**
   * Entry.
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry = {
    application: './app/app.js'
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = {
    // Absolute output directory
    path: __dirname + '/public/js/',

    // Output path from the view of the page
    publicPath: '/',

    // Filename for entry points
    filename: isLocal ? '[name].js' : '[name].js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isLocal ? '[name].js' : '[name].js'
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   */
  if (isLocal) {
    config.devtool = 'source-map';
  };

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules.
   */

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
     }]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [];

  /**
   * Add build specific plugins.
   */
  config.plugins.push(
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Dedupe modules in the output
    new webpack.optimize.DedupePlugin()
  );

  /**
   * Reference:
   *
   *   http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
   *
   * Minify all javascript, switch loaders to minimizing mode
   */
  if (!isLocal) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: true }
    }));
  }

  return config;
}();
