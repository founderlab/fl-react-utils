'use strict';

exports.__esModule = true;
exports['default'] = createPaginationSelector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _reselect = require('reselect');

function paginationState(state, paginateOn) {
  if (_lodash2['default'].isFunction(paginateOn)) return paginateOn(state);
  return state[paginateOn];
}

var defaultSelect = function defaultSelect() {};

function createPaginationSelector(paginateOn) {
  var selectState = arguments.length <= 1 || arguments[1] === undefined ? defaultSelect : arguments[1];

  return _reselect.createSelector(function (state) {
    return state[paginateOn].get('loading');
  }, function (state) {
    return state[paginateOn].get('models');
  }, function (state) {
    return state[paginateOn].get('pagination');
  }, selectState, function (loading, models, pagination, selectedState) {
    var visibleItems = [];
    if (loading) return _lodash2['default'].extend({}, selectedState, { visibleItems: visibleItems, totalItems: 0, loading: true });

    var visibleIds = pagination.get('visible').toJSON();
    var totalItems = +pagination.get('total');

    _lodash2['default'].forEach(visibleIds, function (id) {
      return visibleItems.push(models.get(id).toJSON());
    });

    return _lodash2['default'].extend({}, selectedState, { visibleItems: visibleItems, totalItems: totalItems });
  });
}

module.exports = exports['default'];