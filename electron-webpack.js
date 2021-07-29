const { withExpoAdapter } = require('@expo/electron-adapter');

module.exports = withExpoAdapter({
  projectRoot: __dirname,
  whiteListedModules: [ "react-redux" ]
  // Provide any overrides for electron-webpack: https://github.com/electron-userland/electron-webpack/blob/master/docs/en/configuration.md
});
