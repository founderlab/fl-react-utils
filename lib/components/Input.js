'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactBootstrap = require('react-bootstrap');

var _S3Uploader = require('./S3Uploader');

var _S3Uploader2 = _interopRequireDefault(_S3Uploader);

var _validation = require('../validation');

function ensureArray(values) {
  if (_lodash2['default'].isArray(values)) return values;
  if (!values) return [];
  if (_lodash2['default'].isString(values)) return values.split(',');
  _warning2['default'](false, '[fl-react-utils] Input: react-select gave a strange value: ' + JSON.stringify(values));
  return [];
}

var Input = (function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    _React$Component.apply(this, arguments);
  }

  Input.prototype.render = function render() {
    var _props = this.props;
    var label = _props.label;
    var meta = _props.meta;
    var helpTop = _props.helpTop;
    var type = _props.type;
    var bsProps = _props.bsProps;

    var inputProps = _lodash2['default'].extend({
      autoComplete: 'on'
    }, this.props.input, this.props.inputProps);

    var help = this.props.help;
    if (_lodash2['default'].isUndefined(help)) {
      help = _validation.validationHelp(meta) || this.props.defaultHelp;
    }

    var id = _inflection2['default'].dasherize((label || '').toLowerCase());
    var feedback = true;
    var hideLabel = false;
    var control = undefined;

    switch (type) {
      case 'rich':
      case 'rich-text':
      case 'quill':
        control = _react2['default'].createElement(_reactQuill2['default'], _extends({ theme: this.props.quillTheme, format: this.props.quillFormat }, inputProps));
        break;

      case 'date':
      case 'datetime':
        var placeholder = type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY 9:00 AM';
        control = _react2['default'].createElement(_reactDatetime2['default'], _extends({ closeOnSelect: true, inputProps: { placeholder: placeholder } }, inputProps));
        break;

      case 'select':
        if (!this.props.options) {
          _warning2['default'](false, 'select components require an options prop');
          return null;
        }
        control = _react2['default'].createElement(
          _reactBootstrap.FormControl,
          _extends({ componentClass: 'select' }, inputProps, { value: inputProps.value }),
          this.props.includeEmpty && _react2['default'].createElement('option', null),
          _lodash2['default'].map(this.props.options, function (option) {
            return _react2['default'].createElement(
              'option',
              { key: option.value, value: option.value },
              option.label
            );
          })
        );
        break;

      case 'react-select':
        if (!this.props.options) {
          _warning2['default'](false, 'react-select components require an options prop');
          return null;
        }

        var onChange = inputProps.onChange,
            onBlur = inputProps.onBlur,
            value = inputProps.value,
            props = _objectWithoutProperties(inputProps, ['onChange', 'onBlur', 'value']);

        feedback = false;
        var stringValue = _lodash2['default'].isArray(value) ? value.join(',') : value;
        var funcs = {};
        if (onChange) funcs.onChange = function (value) {
          return onChange(inputProps.multi ? ensureArray(value) : value);
        };
        if (onBlur) funcs.onBlur = function () {
          return onBlur(inputProps.multi ? ensureArray(value) : value);
        };

        control = _react2['default'].createElement(_reactSelect2['default'], _extends({
          options: this.props.options,
          value: stringValue
        }, funcs, props));
        break;

      case 'image':
      case 'file':
        control = _react2['default'].createElement(_S3Uploader2['default'], { inputProps: inputProps });
        break;

      case 'static':
        control = _react2['default'].createElement(
          _reactBootstrap.FormControl.Static,
          _extends({}, bsProps, inputProps),
          inputProps.value
        );
        break;

      case 'checkbox':
      case 'boolean':
        inputProps.checked = !!inputProps.value;
        hideLabel = true;
        control = _react2['default'].createElement(
          _reactBootstrap.Checkbox,
          _extends({ inline: true }, bsProps, inputProps),
          label
        );
        break;

      case 'textarea':
        control = _react2['default'].createElement(_reactBootstrap.FormControl, _extends({ componentClass: 'textarea' }, bsProps, inputProps));
        break;

      // case 'text':
      // case 'email':
      // case 'password':
      default:
        control = _react2['default'].createElement(_reactBootstrap.FormControl, _extends({ type: type }, bsProps, inputProps));
    }

    return _react2['default'].createElement(
      _reactBootstrap.FormGroup,
      { controlId: id, validationState: _validation.validationState(meta) },
      label && !hideLabel && _react2['default'].createElement(
        _reactBootstrap.ControlLabel,
        null,
        label
      ),
      help && helpTop && _react2['default'].createElement(
        _reactBootstrap.HelpBlock,
        null,
        help
      ),
      control,
      feedback && _react2['default'].createElement(_reactBootstrap.FormControl.Feedback, null),
      help && !helpTop && _react2['default'].createElement(
        _reactBootstrap.HelpBlock,
        null,
        help
      )
    );
  };

  _createClass(Input, null, [{
    key: 'propTypes',
    value: {
      label: _react.PropTypes.string,
      helpTop: _react.PropTypes.bool,
      help: _react.PropTypes.string,
      defaultHelp: _react.PropTypes.string,
      type: _react.PropTypes.string,
      bsProps: _react.PropTypes.object,
      meta: _react.PropTypes.object,
      input: _react.PropTypes.object,
      inputProps: _react.PropTypes.object,
      options: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
      value: _react.PropTypes.any,
      includeEmpty: _react.PropTypes.bool,
      onBlur: _react.PropTypes.func,
      quillTheme: _react.PropTypes.string,
      quillFormat: _react.PropTypes.array
    },
    enumerable: true
  }]);

  return Input;
})(_react2['default'].Component);

exports['default'] = Input;
module.exports = exports['default'];