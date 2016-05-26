'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reduxRouterLibConstants = require('redux-router/lib/constants');

var _fetchComponentData = require('../fetchComponentData');

var _fetchComponentData2 = _interopRequireDefault(_fetchComponentData);

var locsEqual = function locsEqual(locA, locB) {
  return locA.pathname === locB.pathname && locA.search === locB.search;
};

exports['default'] = function (store) {
  return function (next) {
    return function (action) {
      var router = store.getState().router;
      if (action.type === _reduxRouterLibConstants.ROUTER_DID_CHANGE && router && !locsEqual(action.payload.location, router.location)) {
        var components = action.payload.components;

        _fetchComponentData2['default']({ store: store, components: components, action: action });
      }
      next(action);
    };
  };
};

module.exports = exports['default'];