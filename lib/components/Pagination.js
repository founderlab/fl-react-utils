'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterBootstrap = require('react-router-bootstrap');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _components = {
  _$Pagination: {
    displayName: 'Pagination'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/Pagination.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var Pagination = (function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, _Pagination);

    _Component.apply(this, arguments);
  }

  Pagination.prototype.render = function render() {
    var _props = this.props;
    var location = _props.location;
    var items_per_page = _props.items_per_page;
    var current_page = _props.current_page;
    var total_items = _props.total_items;

    if (!total_items) return null;
    var max_links = this.props.max_links - 1;
    var links = [];
    var total_pages = Math.ceil(total_items / items_per_page);
    if (!total_pages) return null;

    var start = Math.min(Math.floor(current_page - max_links / 2), total_pages - max_links);
    if (start < 1) start = 1;
    var end = Math.min(start + max_links, total_pages);

    if (start > 1) {
      links.push(_react2['default'].createElement(
        _reactRouterBootstrap.LinkContainer,
        { key: 1, to: location.pathname, query: _lodash2['default'].extend({}, location.query, { page: 1 }) },
        _react2['default'].createElement(
          _reactBootstrap.Button,
          { bsStyle: 'default' },
          '1'
        )
      ));
      start = start + 1;
    }

    for (var i = start; i <= end; i++) {
      links.push(_react2['default'].createElement(
        _reactRouterBootstrap.LinkContainer,
        { key: i, to: location.pathname, query: _lodash2['default'].extend({}, location.query, { page: i }) },
        _react2['default'].createElement(
          _reactBootstrap.Button,
          { bsStyle: current_page === i ? 'primary' : 'default' },
          i
        )
      ));
    }

    if (end < total_pages) {
      links.push(_react2['default'].createElement(
        _reactRouterBootstrap.LinkContainer,
        { key: 'next', to: location.pathname, query: _lodash2['default'].extend({}, location.query, { page: current_page + 1 }) },
        _react2['default'].createElement(
          _reactBootstrap.Button,
          { bsStyle: 'default' },
          _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'chevron-right' })
        )
      ));
    }

    return _react2['default'].createElement(
      _reactBootstrap.ButtonToolbar,
      { className: _classnames2['default'](this.props.className, 'pagination-buttons') },
      _react2['default'].createElement(
        _reactBootstrap.ButtonGroup,
        { bsSize: 'small' },
        links
      )
    );
  };

  _createClass(Pagination, null, [{
    key: 'propTypes',
    value: {
      location: _react.PropTypes.object.isRequired,
      items_per_page: _react.PropTypes.number.isRequired,
      current_page: _react.PropTypes.number.isRequired,
      className: _react.PropTypes.string,
      total_items: _react.PropTypes.number,
      max_links: _react.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      max_links: 4
    },
    enumerable: true
  }]);

  var _Pagination = Pagination;
  Pagination = _wrapComponent('_$Pagination')(Pagination) || Pagination;
  return Pagination;
})(_react.Component);

exports['default'] = Pagination;
module.exports = exports['default'];