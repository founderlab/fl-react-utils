'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = dispatchNeeds;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

function dispatchNeeds(options, callback) {
  var store = options.store;
  var components = options.components;

  var queue = new _queueAsync2['default']();

  components.forEach(function (comp) {
    if (!comp) return;
    var needs = (comp.WrappedComponent || comp).needs || [];
    needs.forEach(function (need) {
      var options = need.options || {};
      var action = need.action;
      if (action) queue.defer(function (callback) {
        return store.dispatch(action(options, callback));
      });else queue.defer(function (callback) {
        return need(store, callback);
      });
    });
  });

  if (callback) queue.await(callback);
}

module.exports = exports['default'];