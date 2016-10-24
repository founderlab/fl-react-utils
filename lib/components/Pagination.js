'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterBootstrap = require('react-router-bootstrap');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Pagination = (function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    _Component.apply(this, arguments);
  }

  Pagination.prototype.render = function render() {
    var _props = this.props;
    var location = _props.location;
    var itemsPerPage = _props.itemsPerPage;
    var currentPage = _props.currentPage;
    var totalItems = _props.totalItems;

    if (!totalItems) return null;
    var maxLinks = this.props.maxLinks - 1;
    var links = [];
    var totalPages = Math.ceil(totalItems / itemsPerPage);
    if (!totalPages) return null;

    var start = Math.min(Math.floor(currentPage - maxLinks / 2), totalPages - maxLinks);
    if (start < 1) start = 1;
    var end = Math.min(start + maxLinks, totalPages);

    if (start > 1) {
      links.push(_react2['default'].createElement(
        _reactRouterBootstrap.LinkContainer,
        { key: 1, to: { pathname: location.pathname, query: _lodash2['default'].extend({}, location.query, { page: 1 }) } },
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
        { key: i, to: { pathname: location.pathname, query: _lodash2['default'].extend({}, location.query, { page: i }) } },
        _react2['default'].createElement(
          _reactBootstrap.Button,
          { bsStyle: currentPage === i ? 'primary' : 'default' },
          i
        )
      ));
    }

    if (end < totalPages) {
      links.push(_react2['default'].createElement(
        _reactRouterBootstrap.LinkContainer,
        { key: 'next', to: { pathname: location.pathname, query: _lodash2['default'].extend({}, location.query, { page: currentPage + 1 }) } },
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
      itemsPerPage: _react.PropTypes.number.isRequired,
      currentPage: _react.PropTypes.number.isRequired,
      className: _react.PropTypes.string,
      totalItems: _react.PropTypes.number,
      maxLinks: _react.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      maxLinks: 4
    },
    enumerable: true
  }]);

  return Pagination;
})(_react.Component);

exports['default'] = Pagination;
module.exports = exports['default'];