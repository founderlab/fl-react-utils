'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createPaginationReducer;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _immutable = require('immutable');

function createPaginationReducer(action_type) {

  var default_state = _immutable.fromJS({
    visible: [],
    current_page: 1,
    endless_page: 1
  });

  return function pagination() {
    var _state = arguments.length <= 0 || arguments[0] === undefined ? default_state : arguments[0];

    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var state = _state;

    if (action.type === action_type + '_COUNT_SUCCESS') {
      state = state.merge({ total: +action.res });
    } else if (action.type === action_type + '_DEL_SUCCESS') {
      var visible = state.get('visible').toJSON();
      state = state.merge({ visible: _lodash2['default'].without(visible, action.deleted_model_id) });
    } else if (action.type === action_type + '_LOAD_SUCCESS' && action.page) {
      state = state.merge({ visible: action.ids, current_page: action.page });
    }

    return state;
  };
}

module.exports = exports['default'];