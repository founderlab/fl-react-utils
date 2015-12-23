"use strict";

exports.__esModule = true;
exports["default"] = createGroupedReducer;

function createGroupedReducer(action_types, groupingKey) {
  var grouped_default_state = fromJS({});
  var load_action = action_types[0];
  var delete_action = action_types[1];

  return function grouped() {
    var _state = arguments.length <= 0 || arguments[0] === undefined ? grouped_default_state : arguments[0];

    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var state = _state;

    if (action.type === delete_action) {
      var _state$merge;

      var id = action.deleted_model.id;

      var grouping_key = groupingKey(action.deleted_model);
      var current = state.get(grouping_key);
      return state.merge((_state$merge = {}, _state$merge[grouping_key] = _.without(current, id), _state$merge));
    }

    if (action.type === load_action) {
      var by_group = _.groupBy(action.models, function (model) {
        return groupingKey(model);
      });

      _.forEach(by_group, function (models, grouping_key) {
        var _state$merge2;

        var group_state = state.get(grouping_key) || fromJS([]);
        _.forEach(models, function (model) {
          if (!group_state.includes(model.id)) group_state = group_state.push(model.id);
        });
        state = state.merge((_state$merge2 = {}, _state$merge2[grouping_key] = group_state, _state$merge2));
      });
    }

    return state;
  };
}

module.exports = exports["default"];