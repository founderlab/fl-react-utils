'use strict';

exports.__esModule = true;

var _reduxRouterLibConstants = require('redux-router/lib/constants');

var _flUtils = require('fl-utils');

var locsEqual = function locsEqual(locA, locB) {
  return locA.pathname === locB.pathname && locA.search === locB.search;
};

exports['default'] = function (store) {
  return function (next) {
    return function (action) {
      var router = store.getState().router;
      if (action.type === _reduxRouterLibConstants.ROUTER_DID_CHANGE && router && !locsEqual(action.payload.location, router.location)) {
        var components = action.payload.components;

        _flUtils.fetchComponentData({ store: store, components: components, action: action });
      }
      next(action);
    };
  };
};

module.exports = exports['default'];