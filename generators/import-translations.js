/**
 * @fileoverview The Import Translations script. This script takes the CSV
 * translations and writes them to a JS file that Angular and Angular-Translate
 * can consume.
 *
 * Since a CSV is our common file format between engineers and marketing, this
 * script allows us to automatically read and parse the CSV translation tokens.
 */
var fs = require('fs'),
    readline = require('readline'),
    util = require('util');



/**
 * The TranslationImporter class.
 * @constructor
 */
function TranslationImporter() {
  /**
   * The list of locales.
   * @type {!Array}
   */
  this.locales;

  /**
   * The CSV file to read.
   * @type {string}
   */
  this.inFile = './app/common/translations.csv';

  /**
   * The JS file to write to when done.
   * @type {string}
   */
  this.outFile = './app/common/translations.js';

  /**
   * The template to use for the JS file.
   * @type {string}
   */
  this.template = './generators/translations.js.tpl';

  // Initialize the TranslationImporter.
  this.init();
}


/**
 * Initializes the TranslationImporter.
 */
TranslationImporter.prototype.init = function() {
  // Prepare the configObject.
  this.configObject = {};
};


/**
 * Fully reads, parses, and writes out the translations.
 */
TranslationImporter.prototype.build = function() {
  // Read the file, line-by-line.
  var lineReader = readline.createInterface({
    input: fs.createReadStream(this.inFile)
  });

  // Process each line, adding the configuration for the token.
  lineReader.on('line', this.processLine.bind(this));

  // Write the file out.
  lineReader.on('close', this.writeFile.bind(this));
};


/**
 * Processes an individual line on the CSV, and stores the translations for that
 * token in the configuration object.
 * @param {string} line The comma-seperated line to parse/process.
 */
TranslationImporter.prototype.processLine = function(line) {
  var configObject = this.configObject,
      locales = this.locales,
      lineContents = line.split(',');

  // Determine if this line is the header or not.
  var isHeader = lineContents &&
      (lineContents[0]).toString().toLowerCase() === 'token';

  // Parse/assign the locales if this is the header.
  // If it is NOT the header, process the line.
  if (isHeader) {
    // Get rid of the "Token" column in the header, leaving only locales.
    this.locales = lineContents.splice(1);

    // Create a sub-configuration for each locale.
    this.locales.forEach(function(locale) {
      configObject[locale] = {};
    });
  } else {
    // For each locale, read and store the key-value pair for token and
    // translation value.
    locales.forEach(function(locale, i) {
      var localeConfig = configObject[locale];
      var localeToken = lineContents[0];
      var localeValue = (lineContents[i + 1] || '').trim();

      // Add the value to the proper token.
      localeConfig[localeToken] = localeValue;
    });
  }
};


/**
 * Writes the configuration to the new file.
 */
TranslationImporter.prototype.writeFile = function() {
  var template = this.template,
      outFile = this.outFile;

  // Format the configuration as JSON for writing.
  var config = JSON.stringify(this.configObject, null, 2);

  // Read the template, and use the template write the contents to.
  fs.readFile(template, 'utf8', function(err, contents) {
    if (err) {
      throw new Error(err);
    } else {
      contents = util.format(contents, config);
      fs.writeFile(outFile, contents, function(err) {
        if (err) {
          throw new Error(err);
        } else {
          console.log('Successfully imported the translations.');
        }
      });
    }
  });
};


// Perform the import.
(function() {
  var importer = new TranslationImporter();
  importer.build();
})();
