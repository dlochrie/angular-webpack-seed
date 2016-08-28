/**
 * @fileoverview Entry point for the "vendor" bundler. See `webpack.vendor.js`.
 *
 * This file is used to generate a file (also called "vendor.js") for our application to use, with compressed and
 * minified versions of our 3rd-party deps.
 *
 * This file simply tells WebPack what dependencies we want to bundle, and make available globally. This file lists
 * dependencies that will not be reference directly in our source code. Referencing 3rd-party libraries through a
 * "requires" statement causes our "source" build script to bundle the 3rd party dep with our source code. DON'T
 * do that unless you have to.
 */
require('angular');
require('angular-animate');
require('angular-touch');
require('angular-translate');
require('angular-ui-bootstrap');
require('angular-ui-router');
require('clipboard');
