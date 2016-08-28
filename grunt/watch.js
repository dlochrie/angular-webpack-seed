module.exports = {
  source_code: {
    files: [
      'app/**/*.js',
      '!app/vendor.js'
    ],
    tasks: ['exec:fixjs', 'exec:lintjs', 'exec:bundle_source']
  },
  vendor_code: {
    files: 'package.json',
    tasks: ['exec:bundle_vendor']
  },
  stylesheets: {
    files: 'app/**/*.{css,less}',
    tasks: ['exec:compile_css']
  },
  html: {
    files: 'app/**/*.html',
    tasks: ['exec:compile_tpls']
  },
  translations: {
    files: 'app/common/translations.csv',
    tasks: ['exec:generate_translations']
  }
};
