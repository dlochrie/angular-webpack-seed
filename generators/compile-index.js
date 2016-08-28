/**
 * @fileoverview Minifies the index.html file for production and to reduce size.
 */
 var fs = require('fs'),
     pug = require('pug'),
     util = require('util');



// Run the code.
(function() {
  var IN_FILE = './server/views/layout.pug',
      OUT_FILE = './build/index.html';

  // Read the template and render/compress it.
  fs.readFile(IN_FILE, 'utf8', function(err, content) {
    if (err) {
      throw new Error(err);
    } else {
      var compileFn = pug.compile(content);
      var compressed = compileFn();
      fs.writeFile(OUT_FILE, compressed, function(err) {
        if (err) {
          throw new Error(err);
        } else {
          console.log('Successfully compressed and wrote index.html');
        }
      });
    }
  });
})();
