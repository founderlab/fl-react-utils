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

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _reduxForm = require('redux-form');

var _reactBootstrap = require('react-bootstrap');

var _validation = require('../validation');

var RadioField = (function (_React$Component) {
  _inherits(RadioField, _React$Component);

  function RadioField() {
    _classCallCheck(this, RadioField);

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

  return RadioField;
})(_react2['default'].Component);

exports['default'] = RadioField;
module.exports = exports['default'];