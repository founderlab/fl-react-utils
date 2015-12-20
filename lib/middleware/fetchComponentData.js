'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reduxRouterLibConstants = require('redux-router/lib/constants');

var _fetchComponentData = require('../fetchComponentData');

var _fetchComponentData2 = _interopRequireDefault(_fetchComponentData);

var locsEqual = function locsEqual(loc_a, loc_b) {
  return loc_a.pathname === loc_b.pathname && loc_a.search === loc_b.search;
};

exports['default'] = function (store) {
  return function (next) {
    return function (action) {
      var router = store.getState().router;
      if (action.type === _reduxRouterLibConstants.ROUTER_DID_CHANGE && router && !locsEqual(action.payload.location, router.location)) {
        var components = action.payload.components;

        (0, _fetchComponentData2['default'])({ store: store, components: components, action: action });
      }
      next(action);
    };
  };
};

module.exports = exports['default'];