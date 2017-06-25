const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');

/* eslint-disable no-console */

// Run Browsersync
browserSync({
  port: 9080,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'app/*.html'
  ],

  middleware: [historyApiFallback()]
});