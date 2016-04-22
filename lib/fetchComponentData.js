'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = fetchComponentData;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

function fetchComponentData(options, callback) {
  var store = options.store;
  var components = options.components;
  var action = options.action;

  var result = {};
  var queue = new _queueAsync2['default']();

  components.forEach(function (_Component) {
    if (!_Component) return;
    var Component = _Component.WrappedComponent || _Component;
    if (!Component.fetchData) return;
    queue.defer(function (callback) {
      return Component.fetchData({ store: store, action: action }, function (err, res) {
        if (res) _lodash2['default'].extend(result, res);
        callback(err);
      });
    });
  });

  queue.await(function (err) {
    if (callback) callback(err, result);
  });
}

module.exports = exports['default'];