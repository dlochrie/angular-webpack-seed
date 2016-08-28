/**
 * @fileoverview The webpack configuration for vendor (third-party) files.
 * Typically, these are files that should be loaded before our source code.
 *
 *   IN_FILE: app/vendor.js
 *   OUT_FILE: public/js/vendor.js
 *
 * Because of the total number of 3rd-pary dependencies, and the amount of time it takes to run the script, this
 * bundler should ONLY be run when absolutely necessary, such as (1) startup,
 * and (2) whenever `package.json` changes (which indicates that deps have
 * changed).
 */
var webpack = require('webpack'),
    path = require('path'),
    IN_FILE = path.resolve(__dirname, 'app/vendor.js'),
    OUT_DIR = path.resolve(__dirname, 'public/js'),
    OUT_FILE = 'vendor.js';



/**
 * Create the configuration for the WebPack build.
 */
module.exports = {
  entry: {
    // The key here ('vendor') MUST match the key we supply to the CommonsChunkPlugin.
    vendor: IN_FILE
  },
  output: {
    path: OUT_DIR,
    filename: OUT_FILE
  },
  plugins: [
    // Create a chunk for just the vendor files.
    // The name we pass ('vendor') MUST match the "entry" key we want to process.
    new webpack.optimize.CommonsChunkPlugin('vendor', OUT_FILE, Infinity),
    // Minify the output.
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: true}})
  ]
};
