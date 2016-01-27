import _ from 'lodash'

function getAssetJSON(webpack_assets_path) {
  return process.env.NODE_ENV === 'development' ? JSON.parse(require('fs').readFileSync(webpack_assets_path).toString()) : require(webpack_assets_path)
}

export function jsAssets(entries, webpack_assets_path) {
  const assets = getAssetJSON(webpack_assets_path)
  return _(entries).map(e => assets[e].js).compact().value()
}

export function cssAssets(entries, webpack_assets_path) {
  if (process.env.NODE_ENV === 'development') return []
  const assets = getAssetJSON(webpack_assets_path)
  return _(entries).map(e => assets[e].css).compact().value()
}
