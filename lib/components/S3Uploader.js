'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzoneS3Uploader = require('react-dropzone-s3-uploader');

var _reactDropzoneS3Uploader2 = _interopRequireDefault(_reactDropzoneS3Uploader);

var S3Uploader = (function (_React$Component) {
  _inherits(S3Uploader, _React$Component);

  function S3Uploader() {
    var _this = this;

    _classCallCheck(this, S3Uploader);

    _React$Component.apply(this, arguments);

    this.handleFinishedUpload = function (info) {
      _this.props.input_props.onChange(info.filename);
    };
  }

  S3Uploader.prototype.render = function render() {
    var _props = this.props;
    var config = _props.config;
    var size = _props.size;
    var input_props = _props.input_props;
    var url = config.url;
    var s3_url = config.s3_url;

    var max_file_size = config.max_file_upload_size;
    var filename = input_props.value;
    var accept = input_props.accept || '';

    var style = this.props.style || {
      height: size === 'large' ? 200 : 100,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
      cursor: 'pointer'
    };

    var uploader_props = { style: style, max_file_size: max_file_size, s3_url: s3_url, filename: filename, host: url, accept: accept };

    return _react2['default'].createElement(
      'div',
      { className: 'form-group form-group-lg' },
      this.props.label ? _react2['default'].createElement(
        'label',
        { className: 'control-label' },
        this.props.label
      ) : null,
      _react2['default'].createElement(_reactDropzoneS3Uploader2['default'], _extends({ onFinish: this.handleFinishedUpload }, uploader_props))
    );
  };

  _createClass(S3Uploader, null, [{
    key: 'propTypes',
    value: {
      label: _react.PropTypes.string,
      size: _react.PropTypes.string,
      style: _react.PropTypes.object,
      input_props: _react.PropTypes.object.isRequired,
      config: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  return S3Uploader;
})(_react2['default'].Component);

exports['default'] = S3Uploader;
module.exports = exports['default'];