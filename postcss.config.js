module.exports = {
  sourceMap: true,
  plugins: {
    'postcss-normalize': {},
    'postcss-import': {
      addModulesDirectories: ['node_modules']
    },
    'autoprefixer': {},
  }
};