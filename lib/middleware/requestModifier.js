// valueMiddleware appends a user id to any superagent request it finds on an action
// It's designed to work alongside requestMiddleware which will perform the requests and dispatch the relevant (sub)-actions
// It must be included *before* redux-request-middleware when combining middleware
// Otherwise the requests will be sent before it has a chance to alter the query

// options:
//  getRequest(action):           Return a request from an action, defaults to returning action.request
//  getValue(store):              A function that takes a store and returns a value object to append to the request
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.setValue = setValue;
exports['default'] = createRequestModifierMiddleware;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function setValue(request, value) {
  if (_lodash2['default'].isObject(request._cursor)) {
    _lodash2['default'].merge(request._cursor, value);
  }
  if (_lodash2['default'].isFunction(request.query)) {
    request.query(value);
  }
  return request;
}

var defaults = {
  getRequest: function getRequest(action) {
    return action.request;
  },
  setValue: setValue
};

function createRequestModifierMiddleware() {
  var _options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var options = _lodash2['default'].merge(defaults, _options);
  if (!options.getValue) return console.error('[fl-react-utils] createQueryMiddleware requires a getValue option');

  return function requestModifierMiddleware(store) {
    return function (next) {
      return function (action) {

        var request = options.getRequest(action);
        var value = options.getValue(store);
        if (request && value) options.setValue(request, value);

        next(action);
      };
    };
  };
}