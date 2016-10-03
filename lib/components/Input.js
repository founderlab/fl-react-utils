'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

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

var _components = {
  _$Input: {
    displayName: 'Input'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/Input.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var Input = (function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, _Input);

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

        var onBlur = inputProps.onBlur,
            props = _objectWithoutProperties(inputProps, ['onBlur']);

        feedback = false;
        control = _react2['default'].createElement(_reactSelect2['default'], _extends({
          value: inputProps.value,
          onBlur: function () {
            return onBlur(inputProps.value);
          },
          options: this.props.options
        }, props));
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

  var _Input = Input;
  Input = _wrapComponent('_$Input')(Input) || Input;
  return Input;
})(_react2['default'].Component);

exports['default'] = Input;
module.exports = exports['default'];