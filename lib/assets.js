'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.jsAssets = jsAssets;
exports.cssAssets = cssAssets;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function getAssetJSON(webpack_assets_path) {
  return process.env.NODE_ENV === 'development' ? JSON.parse(require('fs').readFileSync(webpack_assets_path).toString()) : require(webpack_assets_path);
}

function jsAssets(entries, webpack_assets_path) {
  var assets = getAssetJSON(webpack_assets_path);
  return _lodash2['default'](entries).map(function (e) {
    return assets[e].js;
  }).compact().value();
}

function cssAssets(entries, webpack_assets_path) {
  if (process.env.NODE_ENV === 'development') return [];
  var assets = getAssetJSON(webpack_assets_path);
  return _lodash2['default'](entries).map(function (e) {
    return assets[e].css;
  }).compact().value();
}