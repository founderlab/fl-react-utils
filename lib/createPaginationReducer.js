'use strict';

exports.__esModule = true;
exports['default'] = createPaginationReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _immutable = require('immutable');

function createPaginationReducer(actionType) {

  var defaultState = _immutable.fromJS({
    visible: [],
    currentPage: 1,
    endlessPage: 1
  });

  return function pagination() {
    var _state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];

    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var state = _state;

    if (action.type === actionType + '_COUNT_SUCCESS') {
      state = state.merge({ total: +action.res });
    } else if (action.type === actionType + '_DEL_SUCCESS') {
      var visible = state.get('visible').toJSON();
      state = state.merge({ visible: _lodash2['default'].without(visible, action.deletedId) });
    } else if (action.type === actionType + '_LOAD_SUCCESS' && action.page) {
      state = state.merge({ visible: action.ids, currentPage: action.page });
    }

    return state;
  };
}

module.exports = exports['default'];