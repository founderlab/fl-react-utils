'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createPaginationReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _immutable = require('immutable');

function createPaginationReducer(action_type) {

  var default_state = (0, _immutable.fromJS)({
    visible: [],
    current_page: 1,
    endless_page: 1
  });

  // loading: false,
  return function pagination() {
    var _state = arguments.length <= 0 || arguments[0] === undefined ? default_state : arguments[0];

    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var state = _state; //.merge({loading: false})
    if (action.type === action_type + '_COUNT_SUCCESS') {
      return state.merge({ total: +action.res });
    }

    if (action.type === action_type + '_DEL_SUCCESS') {
      var visible = state.get('visible');
      return state.merge({ visible: _lodash2['default'].without(visible, action.deleted_id) });
    }

    if (action.page && action.page !== state.current_page) {
      state = state.merge({ visible: _lodash2['default'].keys(action.by_id), current_page: action.page });
    }

    return state;
  };
}

module.exports = exports['default'];