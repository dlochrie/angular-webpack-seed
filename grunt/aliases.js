/**
 * @fileoverview Provides configuration for custom registered Grunt tasks.
 *
 * Replaces calls such as:
 *   grunt.registerTask('taskName', ['job-1', 'job-2', 'job-3']
 *
 */
module.exports = {
  default: [
    'exec:compile_css',
    'exec:compile_tpls',
    'exec:generate_translations',
    'exec:bundle_source',
    'exec:bundle_vendor',
    'exec:server',
    'watch'
  ],
  prod: [
    'exec:compile_css',
    'exec:compile_tpls',
    'exec:generate_translations',
    'exec:bundle_source_prod',
    'exec:server_prod'
  ]
};
