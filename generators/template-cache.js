/**
 * Template Cache generator. Generates a stringified version of each html
 * template in order to reduce Ajax requests to the server for them.
 * File content is compressed and written to a template-cache.js file.
 *
 * Usage:
 *
 * 1. First, update the file paths in the constants at the end of this file.
 * 2. Run the following command:
 *
 *     node path/to/template-cache.js
 *
 * Running this command should generate a new template cache file.
 */
var util = require('util'),
    fs = require('fs'),
    glob = require('glob'),
    minify = require('html-minifier').minify;



/**
 * Constructor for the TemplateCache class.
 * @constructor
 */
function TemplateCache() {
  /**
   * List of templates to cache.
   * @private {!Array}
   */
  this.templates_ = [];

  /**
   * List of files (html, jade) to process.
   * @private {!Array.<string>}
   */
  this.fileList_ = [];
}


/**
 * Initializes the template-cache generation process.
 */
TemplateCache.prototype.init = function() {
  var self = this;
  glob(TemplateCache.SOURCE_FILE_GLOB_PATTERN, function(err, files) {
    if (err) {
      console.log('There was an error:', err);
    } else {
      // Register the fileList.
      self.fileList_ = files;

      // Kick the process off.
      self.processFiles(self.fileList_.shift());
    }
  });
};


/**
 * Reads a template file, extracts and formats its contents, and adds it to the
 * templates array to be processed later.
 * @param {string} file The file/template to read and format.
 * @param {!Function} done The callback to fire when done.
 */
TemplateCache.prototype.readFile = function(file, done) {
  var self = this;
  fs.readFile(file, 'utf8', function(err, content) {
    if (!err) {
      content = self.formatContent(file, content);

      // Strip the app root from the partial's path.
      var regex = new RegExp(TemplateCache.FILE_NAME_REPLACEMENT_PATTERN);
      file = file.replace(regex, '$1');

      self.templates_.push(
          util.format(TemplateCache.ENTRY_REPLACEMENT_STRING, file, content));
      done();
    } else {
      done(err);
    }
  });
};


/**
 * Creates a new template entry based on the file's name and the file's content.
 * The template entry is based on the REPLACEMENT_STRING constant.
 * @param {string} file The file that contains the content to format.
 * @param {string} content The text of the file to format.
 * @return {string} The updated and formatted content.
 */
TemplateCache.prototype.formatContent = function(file, content) {
  var output = minify(content, {
    collapseWhitespace: true,
    removeComments: true
  });

  // Escape single-quotes in the template-cache output.
  return output.replace(/'/g, '\\\'');
};


/**
 * Writes out the template-cache file, wrapping it with the contents from the
 * wrapper file.
 */
TemplateCache.prototype.writeOutJSFile = function() {
  var templates = this.templates_,
      header = TemplateCache.GENERATED_FILE_HEADER;
  fs.readFile(TemplateCache.TEMPLATE_CACHE_WRAPPER, 'utf8',
      function(err, content) {
        if (err) {
          console.log('The process failed:\n\t', err);
        } else {
          content = util.format(content, header, templates.join('\r  '));
          fs.writeFile(TemplateCache.TEMPLATE_CACHE_OUT_FILE, content);
          console.log(util.format('Template Cache written to %s.',
              TemplateCache.TEMPLATE_CACHE_OUT_FILE));
        }
      });
};


/**
 * Processes each file serially. If at any point a file fails to be processed,
 * the whole process fails.
 * @param {string} file The File to process.
 */
TemplateCache.prototype.processFiles = function(file) {
  var self = this;
  if (file) {
    this.readFile(file, function(err) {
      if (err) {
        console.log('The process failed:\n\t', err);
      } else {
        self.processFiles(self.fileList_.shift());
      }
    });
  } else {
    // Write out the file.
    this.writeOutJSFile();
  }
};


/**
 * The root application path, where JS and templates are to be found.
 * @const {string}
 */
TemplateCache.APP_ROOT = 'app';


/**
 * Replacement string for template-cache entries. The first placeholder
 * represents the file, and the second represents the (formatted) content.
 * @const {string}
 */
TemplateCache.ENTRY_REPLACEMENT_STRING = "$templateCache.put('%s', '%s');";


/**
 * Replacement pattern for the template cache file router.
 * @const {string}
 */
TemplateCache.FILE_NAME_REPLACEMENT_PATTERN = util.format('%s/%s',
    TemplateCache.APP_ROOT, '(.*?)$');


/**
 * File header for the generated file. Explains that the file is generated.
 * @const {string}
 */
TemplateCache.GENERATED_FILE_HEADER = '/**\n * DO NOT EDIT THIS FILE: IT IS ' +
    'GENERATED BY THE TEMPLATE CACHE GENERATOR.\n */';


/**
 * The glob pattern matching template files.
 * @const {string}
 */
TemplateCache.SOURCE_FILE_GLOB_PATTERN = util.format('%s/%s',
    TemplateCache.APP_ROOT, '**/*.html');


/**
 * Path to the template-cache wrapper file.
 * @const {string}
 */
TemplateCache.TEMPLATE_CACHE_WRAPPER = 'generators/template-cache.js.tpl';


/**
 * Path to the final generated file.
 * @const {string}
 */
TemplateCache.TEMPLATE_CACHE_OUT_FILE = util.format('%s/%s',
    TemplateCache.APP_ROOT, 'template-cache.js');


// Start the process.
var templateCache = new TemplateCache();
templateCache.init();