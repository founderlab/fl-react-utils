'use strict';

exports.__esModule = true;
exports.jsAssets = jsAssets;
exports.cssAssets = cssAssets;

function getAssetJSON(webpack_assets_path) {
  return process.env.NODE_ENV === 'production' ? require(webpack_assets_path) : JSON.parse(require('fs').readFileSync(webpack_assets_path).toString());
}

function jsAssets(entries, webpack_assets_path) {
  var assets = getAssetJSON(webpack_assets_path);
  return _.map(entries, function (e) {
    return assets[e].js;
  });
}

function cssAssets(entries, webpack_assets_path) {
  var assets = getAssetJSON(webpack_assets_path);
  return _.map(entries, function (e) {
    return assets[e].css;
  });
}