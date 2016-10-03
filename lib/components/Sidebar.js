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

var _reactSidebar = require('react-sidebar');

var _reactSidebar2 = _interopRequireDefault(_reactSidebar);

var _components = {
  _$FLSidebar: {
    displayName: 'FLSidebar'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/Sidebar.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var FLSidebar = (function (_Component) {
  _inherits(FLSidebar, _Component);

  _createClass(FLSidebar, null, [{
    key: 'propTypes',
    value: {
      changeKey: _react.PropTypes.string,
      dockedWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
      disableToggle: _react.PropTypes.bool,
      reactSidebarProps: _react.PropTypes.object.isRequired,
      sidebar: _react.PropTypes.element.isRequired,
      children: _react.PropTypes.node.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      reactSidebarProps: {
        sidebarClassName: 'sidebar'
      },
      dockedWidth: 768
    },
    enumerable: true
  }]);

  function FLSidebar() {
    var _this = this;

    _classCallCheck(this, _FLSidebar);

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
    var mql = window.matchMedia('(min-width: ' + this.props.dockedWidth + 'px)');
    mql.addListener(this.handleMediaQueryChanged);
    this.setState({ mql: mql, docked: mql.matches });
  };

  FLSidebar.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (newProps.changeKey !== this.props.changeKey) this.setState({ open: false });
  };

  FLSidebar.prototype.componentWillUnmount = function componentWillUnmount() {
    this.state.mql && this.state.mql.removeListener(this.handleMediaQueryChanged);
  };

  FLSidebar.prototype.render = function render() {
    var sidebarProps = _lodash2['default'].extend(this.props.reactSidebarProps, {
      sidebar: this.props.sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen
    });

    var disableSidebarToggle = this.props.disableToggle || this.state.docked;
    return _react2['default'].createElement(
      _reactSidebar2['default'],
      sidebarProps,
      !disableSidebarToggle && _react2['default'].createElement(
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

  var _FLSidebar = FLSidebar;
  FLSidebar = _wrapComponent('_$FLSidebar')(FLSidebar) || FLSidebar;
  return FLSidebar;
})(_react.Component);

exports['default'] = FLSidebar;
module.exports = exports['default'];