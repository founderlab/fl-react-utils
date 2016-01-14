'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createPaginationSelector;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _reselect = require('reselect');

function createPaginationSelector(paginate_on, selectState) {
  return _reselect.createSelector(function (state) {
    return state[paginate_on];
  }, selectState, function (to_paginate, selected_state) {
    if (to_paginate.get('loading')) return _lodash2['default'].extend({}, selected_state, { loading: true });

    var visible_ids = to_paginate.get('pagination').get('visible').toJSON();
    var total_items = +to_paginate.get('pagination').get('total');
    var visible_items = [];

    _lodash2['default'].forEach(visible_ids, function (id) {
      return visible_items.push(to_paginate.get('by_id').get(id).toJSON());
    });

    return _lodash2['default'].extend({}, selected_state, { visible_items: visible_items, total_items: total_items });
  });
}

module.exports = exports['default'];