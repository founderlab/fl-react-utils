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

var _reactSidebar = require('react-sidebar');

var _reactSidebar2 = _interopRequireDefault(_reactSidebar);

var FLSidebar = (function (_Component) {
  _inherits(FLSidebar, _Component);

  _createClass(FLSidebar, null, [{
    key: 'propTypes',
    value: {
      change_key: _react.PropTypes.string,
      docked_width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
      disable_toggle: _react.PropTypes.bool,
      react_sidebar_props: _react.PropTypes.object.isRequired,
      sidebar: _react.PropTypes.node.isRequired,
      children: _react.PropTypes.node.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      react_sidebar_props: {
        sidebarClassName: 'sidebar'
      },
      docked_width: 768
    },
    enumerable: true
  }]);

  function FLSidebar() {
    var _this = this;

    _classCallCheck(this, FLSidebar);

    _Component.call(this);

    this.onSetOpen = function (open) {
      _this.setState({ open: open });
    };

    this.handleMediaQueryChanged = function () {
      _this.setState({ docked: _this.state.mql && _this.state.mql.matches });
    };

    this.handleSidebarToggle = function (ev) {
      _this.setState({ open: !_this.state.open });
      if (ev) ev.preventDefault();
    };

    this.state = { docked: false, open: false };
  }

  FLSidebar.prototype.componentWillMount = function componentWillMount() {
    if (typeof window === 'undefined') return;
    var mql = window.matchMedia('(min-width: ' + this.props.docked_width + 'px)');
    mql.addListener(this.handleMediaQueryChanged);
    this.setState({ mql: mql, docked: mql.matches });
  };

  FLSidebar.prototype.componentWillReceiveProps = function componentWillReceiveProps(new_props) {
    if (new_props.change_key !== this.props.change_key) this.setState({ open: false });
  };

  FLSidebar.prototype.componentWillUnmount = function componentWillUnmount() {
    this.state.mql && this.state.mql.removeListener(this.handleMediaQueryChanged);
  };

  FLSidebar.prototype.render = function render() {
    var sidebar_props = _lodash2['default'].extend(this.props.react_sidebar_props, {
      sidebar: this.props.sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen
    });

    var disable_sidebar_toggle = this.props.disable_toggle || this.state.docked;
    return _react2['default'].createElement(
      _reactSidebar2['default'],
      sidebar_props,
      !disable_sidebar_toggle && _react2['default'].createElement(
        'div',
        { className: 'sidebar-toggle' },
        _react2['default'].createElement(
          'a',
          { onClick: this.handleSidebarToggle },
          _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'menu-hamburger' })
        )
      ),
      this.props.children
    );
  };

  return FLSidebar;
})(_react.Component);

exports['default'] = FLSidebar;
module.exports = exports['default'];