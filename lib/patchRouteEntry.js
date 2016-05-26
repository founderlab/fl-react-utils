'use strict';

exports.__esModule = true;
exports.makeHooksSafe = makeHooksSafe;
exports['default'] = makeRouteHooksSafe;

var _reactRouterLibRouteUtils = require('react-router/lib/RouteUtils');

// Wrap the hooks so they don't fire if they're called before
// the store is initialised. This only happens when doing the first
// client render of a route that has an onEnter hook

function makeHooksSafe(routes, store) {
  if (Array.isArray(routes)) {
    return routes.map(function (route) {
      return makeHooksSafe(route, store);
    });
  }

  var onEnter = routes.onEnter;

  if (onEnter) {
    routes.onEnter = function safeOnEnter() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      try {
        store.getState();
      } catch (err) {
        if (onEnter.length === 3) {
          args[2]();
        }

        // There's no store yet so ignore the hook
        return;
      }

      onEnter.apply(null, args);
    };
  }

  if (routes.childRoutes) {
    makeHooksSafe(routes.childRoutes, store);
  }

  if (routes.indexRoute) {
    makeHooksSafe(routes.indexRoute, store);
  }

  return routes;
}

function makeRouteHooksSafe(getRoutes) {
  return function (store) {
    return makeHooksSafe(_reactRouterLibRouteUtils.createRoutes(getRoutes(store)), store);
  };
}