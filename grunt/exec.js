module.exports = {
  server: {command: 'node server/app.js &'},
  bundle_source: {command: 'env IS_LOCAL=true webpack --config webpack.source.js'},
  bundle_vendor: {command: 'webpack --config webpack.vendor.js'},
  compile_css: {command: './bin/compile-less.sh'},
  compile_tpls: {command: './bin/compile-tpls.sh'},
  generate_translations: {command: './bin/generate-translations.sh'},
  fixjs: {command: './bin/fixjs.sh'},
  lintjs: {command: './bin/lintjs.sh'}
}
