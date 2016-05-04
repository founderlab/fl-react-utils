'use strict';

exports.__esModule = true;
exports['default'] = createPaginationSelector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _reselect = require('reselect');

function paginationState(state, paginate_on) {
  if (_lodash2['default'].isFunction(paginate_on)) return paginate_on(state);
  return state[paginate_on];
}

var defaultSelect = function defaultSelect() {};

function createPaginationSelector(paginate_on) {
  var selectState = arguments.length <= 1 || arguments[1] === undefined ? defaultSelect : arguments[1];

  return _reselect.createSelector(function (state) {
    return state[paginate_on].get('loading');
  }, function (state) {
    return state[paginate_on].get('by_id');
  }, function (state) {
    return state[paginate_on].get('pagination');
  }, selectState, function (loading, models, pagination, selected_state) {
    var visible_items = [];
    if (loading) return _lodash2['default'].extend({}, selected_state, { visible_items: visible_items, total_items: 0, loading: true });

    var visible_ids = pagination.get('visible').toJSON();
    var total_items = +pagination.get('total');

    _lodash2['default'].forEach(visible_ids, function (id) {
      return visible_items.push(models.get(id).toJSON());
    });

    return _lodash2['default'].extend({}, selected_state, { visible_items: visible_items, total_items: total_items });
  });
}

module.exports = exports['default'];