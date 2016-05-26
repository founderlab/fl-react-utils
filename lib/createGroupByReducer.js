'use strict';

exports.__esModule = true;
exports['default'] = createGroupByReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require('immutable');

function createGroupByReducer(actionTypes, groupingKey) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var groupedDefaultState = _immutable.fromJS({});
  var loadAction = actionTypes[0];
  var deleteAction = actionTypes[1];

  return function groupBy() {
    var _state = arguments.length <= 0 || arguments[0] === undefined ? groupedDefaultState : arguments[0];

    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var state = _state;

    if (deleteAction && action.type === deleteAction) {
      var _state$merge;

      var id = action.deletedModel.id;

      var _groupingKey = _groupingKey(action.deletedModel);
      var current = state.get(_groupingKey);
      return state.merge((_state$merge = {}, _state$merge[_groupingKey] = _lodash2['default'].without(current, id), _state$merge));
    }

    if (action.type === loadAction) {
      var byGroup = _lodash2['default'].groupBy(action.models, function (model) {
        return groupingKey(model);
      });

      _lodash2['default'].forEach(byGroup, function (models, groupingKey) {
        var _state$merge2;

        if (_lodash2['default'].isNil(groupingKey)) return;
        var groupState = undefined;

        if (options.single) {
          groupState = models[0] && models[0].id;
        } else {
          groupState = state.get(groupingKey) || _immutable.fromJS([]);
          _lodash2['default'].forEach(models, function (model) {
            if (!groupState.includes(model.id)) groupState = groupState.push(model.id);
          });
        }
        state = state.merge((_state$merge2 = {}, _state$merge2[groupingKey] = groupState, _state$merge2));
      });
    }

    return state;
  };
}

module.exports = exports['default'];