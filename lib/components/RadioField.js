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

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _reduxForm = require('redux-form');

var _reactBootstrap = require('react-bootstrap');

var _validation = require('../validation');

var _components = {
  _$RadioField: {
    displayName: 'RadioField'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/RadioField.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var RadioField = (function (_React$Component) {
  _inherits(RadioField, _React$Component);

  function RadioField() {
    _classCallCheck(this, _RadioField);

    _React$Component.apply(this, arguments);
  }

  RadioField.prototype.render = function render() {
    var _props = this.props;
    var name = _props.name;
    var label = _props.label;
    var help = _props.help;
    var validationState = _props.validationState;
    var helpTop = _props.helpTop;

    var id = _inflection2['default'].dasherize((label || '').toLowerCase());

    return _react2['default'].createElement(
      _reactBootstrap.FormGroup,
      { controlId: id, validationState: validationState },
      label && _react2['default'].createElement(
        _reactBootstrap.ControlLabel,
        null,
        label
      ),
      help && helpTop && _react2['default'].createElement(
        _reactBootstrap.HelpBlock,
        null,
        help
      ),
      _react2['default'].createElement(
        'div',
        null,
        this.props.options.map(function (opt, i) {
          return _react2['default'].createElement(
            'label',
            { key: i, className: 'radio-inline' },
            _react2['default'].createElement(_reduxForm.Field, {
              name: name,
              value: opt.value,
              component: 'input',
              type: 'radio'
            }),
            opt.label
          );
        })
      ),
      help && !helpTop && _react2['default'].createElement(
        _reactBootstrap.HelpBlock,
        null,
        help
      )
    );
  };

  _createClass(RadioField, null, [{
    key: 'propTypes',
    value: {
      name: _react.PropTypes.string,
      label: _react.PropTypes.string,
      helpTop: _react.PropTypes.bool,
      help: _react.PropTypes.string,
      validationState: _react.PropTypes.string,
      options: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object])
    },
    enumerable: true
  }]);

  var _RadioField = RadioField;
  RadioField = _wrapComponent('_$RadioField')(RadioField) || RadioField;
  return RadioField;
})(_react2['default'].Component);

exports['default'] = RadioField;
module.exports = exports['default'];