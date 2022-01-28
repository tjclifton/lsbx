/* eslint-disable @typescript-eslint/no-var-requires */
const {alias, aliasJest, configPaths} = require('react-app-rewire-alias');
const path = require('path');
const { merge } = require('lodash');

const aliasMap = configPaths('./tsconfig.paths.json');

module.exports = config => {
  config.module.rules.splice(1, 0, {
    test: /\.m?js$/i,
    use: ['smart-source-map-loader'],
    enforce: 'pre'
  });

  merge(config, {
    resolve: {
      alias: {
        '~~images': path.resolve(__dirname, 'src/images/'),
      }
    }
  });

  return alias(aliasMap)(config);
};

module.exports.jest = aliasJest(aliasMap);
