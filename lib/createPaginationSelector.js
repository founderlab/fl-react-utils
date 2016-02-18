'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createPaginationSelector;

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
    return state[paginate_on];
  }, function (state) {
    return state[paginate_on].get('loading');
  }, function (state) {
    return state[paginate_on].get('by_id');
  }, function (state) {
    return state[paginate_on].get('pagination');
  }, selectState, function (all_state, loading, models, pagination, selected_state) {
    if (loading) return _lodash2['default'].extend({}, selected_state, { loading: true });
    console.log('UPDATED', paginate_on, pagination.get('visible').toJSON());

    var visible_ids = pagination.get('visible').toJSON();
    var total_items = +pagination.get('total');
    var visible_items = [];

    _lodash2['default'].forEach(visible_ids, function (id) {
      return visible_items.push(models.get(id).toJSON());
    });

    return _lodash2['default'].extend({}, selected_state, { visible_items: visible_items, total_items: total_items });
  });
}

// export default function createPaginationSelector(paginate_on, selectState=defaultSelect) {
//   return createSelector(
//     state => state[paginate_on].get('pagination'),
//     (pagination) => {
//       console.log('UPDATED', pagination.get('loading'), pagination.toJSON(), pagination.get('visible').toJSON())
//       if (pagination.get('loading')) return {loading: true}

//       const visible_ids = pagination.get('visible').toJSON()
//       const total_items = +(pagination.get('total'))
//       const visible_items = []

//       _.forEach(visible_ids, id => visible_items.push({id}))

//       return _.extend({}, {visible_items, total_items})
//     }
//   )
// }
module.exports = exports['default'];