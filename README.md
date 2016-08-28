# Prerequisites

1. The Grunt CLI:

    `npm install -g grunt-cli`

2. Less and the clean/minify plugin:

   `npm install -g less less-plugin-clean-css`

3. Webpack:

  `npm install -g webpack`

4. nodemon (for a long running Node.js server that restarts on crash)

  `npm install -g nodemon`

5. Other NPM dependencies specified in package.json

  `npm install`

6. Python pip (recommendation: use a virtual environment):

  `sudo apt-get install python-pip`

7. gjslint (see Linting - gjslint & fixjsstyle):

  To install, simply run `pip install closure-linter`

  Note the original URL
  `sudo pip install https://closure-linter.googlecode.com/svn/trunk/` no longer
  works. The project is now hosted on github at
  `https://github.com/google/closure-linter`.


# Running the Application

## Quick Start

Provided you have met all the prerequisites, you can just do the following:

    grunt

...which will run the `grunt default` task.

# Development

## Code Organization

Following the Angular Style Guide, we use the `Folders-by-Feature` convention,
as seen
[here](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure).

Outside of the many benefits explained at the link above, the
`Folders-by-Feature` conventions is _ridiculously close_ to what Angular 2 uses
natively (see
[here](https://angular.io/docs/ts/latest/guide/style-guide.html#!#overall-structural-guidelines)),
and helps to prepare us for an easier transition to Angular 2
when we are ready, and when _IT_ it ready :-)

## JS Compiling

`Webpack` will be handling our JavaScript compiling. A couple of the benefits
that `Webpack` provides for us is allowing us to use
[CommonJS](https://webpack.github.io/docs/commonjs.html), which is what
`Node.js` uses, and allows us to use our `Node.js` `package.json` to handle our
dependencies. `Webpack` also has native support for `UglifyJS`.

`CommonJS` allows us to do the following:

```
// Require a module:
var angular = require('angular');

// Provide a module:
// (as function):
module.exports = function MyModule() {}

// (as object):
module.exports = {'someKey': ['val1', 'val2']};
```

We have `Webpack` configured for 2 types of builds: one, for `dev-mode`, which
compiles without minifying, and `deploy-mode`, which performs minification (via
`UglifyJS`). Skipping minification during `dev-mode` saves us a good 10 seconds
or more on compilation time.

## Less Compiling

Following the `Folders-by-Feature` convention, our `less` files are usually
stored with the component/module the styles are associated with. For example,
in the `messages` component, any styles associated with the
`messages` directive/HTML are stored in the `messages.less` file,
and should be wrapped so that they do not override any other styles in the
global scope.

### Specificity - Reducing Accidental/Unintentional Overrides

The following shows how we can style a native `Bootstrap` style
(`.nav-pills>li.active>a`) for the `messages` directive exclusively, so that we
don't accidentally override the style(s) for all other uses.

    [messages] {
      .nav-pills>li.active>a,
      .nav-pills>li.active>a:focus,
      .nav-pills>li.active>a:hover {
        background-color: transparent;
        color: #333;
        font-weight: bold;
      }
    }

Also, note that if your `directive` is restricted to `A`, your rule's will be
defined by `[messages]`, and if it used/restricted to `E`, the rule will
be defined by `messages`, sans brackets.

## Template Compiling

Templates are stored along with the feature/component they are associated with,
and are automatically written to the `template-cache.js` file, to reduce XHR
requests for templates. To see the path to a template, you can refer to the
`template-cache.js` file, or just use the path that it is stored in locally,
with the root being `app/`, or `public/js/`.

## Linting - gjslint & fixjsstyle

For linting JavaScript, we use the `gjslint` utility, which is part of the
Google Closure suite. The `gjslint` linter not only checks for various syntax
and style errors, but it also comes bundled with `fixjsstyle`, which fixes most
of common errors automatically, from minor things like adding missing
semicolons, to fixing indentation in files. There are some of the things that
cannot be auto-fixed, but show up as errors, such as dead code, unused
variables, etc. These items will be pointed out, but will have to be fixed manually.

The `gjslint` tool follows the very thorough
[Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml).

Common errors, outside of syntax rules, are missing JSDoc descriptions. Good
resources for JSDoc are the [JSDoc Site](http://usejsdoc.org/), and the `Tag
Reference` in the Style Guide
[here](https://google.github.io/styleguide/javascriptguide.xml#JavaScript_Style_Rules#JSDoc_Tag_Reference).

### "use strict";

Since we pass a `--strict` argument to the `gjslint` utility, we can omit adding
the `"use strict";` declaration to our scripts. `gjslint` will validate that
each file adheres to the `strict` policy.

# Testing

## Unit Tests

...coming soon.

## E2E Tests / Protractor

...coming soon.
