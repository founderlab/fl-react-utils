'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = fetchComponentData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

function fetchComponentData(options, callback) {
  var store = options.store;
  var components = options.components;
  var action = options.action;

  var queue = new _queueAsync2['default']();

  components.forEach(function (_Component) {
    if (!_Component) return;
    var Component = _Component.WrappedComponent || _Component;
    if (!Component.fetchData) return;
    queue.defer(function (callback) {
      return Component.fetchData({ store: store, action: action }, callback);
    });
  });

  if (callback) queue.await(callback);
}

module.exports = exports['default'];