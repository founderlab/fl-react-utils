'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var Pagination = (function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    var _this = this;

    _classCallCheck(this, Pagination);

    _get(Object.getPrototypeOf(Pagination.prototype), 'constructor', this).apply(this, arguments);

    this.handlePage = function (page) {
      var _props = _this.props;
      var location = _props.location;
      var pushState = _props.pushState;

      pushState(null, location.pathname + '?page=' + page);
    };
  }

  _createClass(Pagination, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var items_per_page = _props2.items_per_page;
      var current_page = _props2.current_page;
      var total_items = _props2.total_items;

      var links = [];
      var total_pages = Math.ceil(total_items / items_per_page);
      if (!total_pages) return null;

      var handlePageFn = function handlePageFn(i) {
        return function () {
          return _this2.handlePageFn(i);
        };
      };

      for (var i = 1; i <= total_pages; i++) {
        var style = current_page === i ? 'primary' : 'default';
        links.push(_react2['default'].createElement(
          _reactBootstrap.Button,
          { key: i, onClick: handlePageFn(i), bsStyle: style },
          i
        ));
      }

      return _react2['default'].createElement(
        _reactBootstrap.ButtonToolbar,
        null,
        _react2['default'].createElement(
          _reactBootstrap.ButtonGroup,
          { bsSize: 'small' },
          links
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      location: _react.PropTypes.object,
      // pagination: PropTypes.object,
      pushState: _react.PropTypes.func
    },
    enumerable: true
  }]);

  return Pagination;
})(_react.Component);

exports['default'] = Pagination;
module.exports = exports['default'];