'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

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
      _this.props.inputProps.onChange(info.filename);
    };
  }

  S3Uploader.prototype.render = function render() {
    var _props = this.props;
    var config = _props.config;
    var size = _props.size;
    var inputProps = _props.inputProps;
    var url = config.url;
    var s3Url = config.s3Url;

    var maxFileSize = config.maxFileUploadSize;
    var filename = inputProps.value;
    var accept = inputProps.accept || '';

    var style = this.props.style || {
      height: size === 'large' ? 200 : 100,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
      cursor: 'pointer'
    };

    var uploaderProps = { style: style, maxFileSize: maxFileSize, s3Url: s3Url, filename: filename, host: url, accept: accept };

    return _react2['default'].createElement(
      'div',
      { className: 'form-group form-group-lg' },
      this.props.label ? _react2['default'].createElement(
        'label',
        { className: 'control-label' },
        this.props.label
      ) : null,
      _react2['default'].createElement(_reactDropzoneS3Uploader2['default'], _extends({ onFinish: this.handleFinishedUpload }, uploaderProps))
    );
  };

  _createClass(S3Uploader, null, [{
    key: 'propTypes',
    value: {
      label: _react.PropTypes.string,
      size: _react.PropTypes.string,
      style: _react.PropTypes.object,
      inputProps: _react.PropTypes.object.isRequired,
      config: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  return S3Uploader;
})(_react2['default'].Component);

exports['default'] = S3Uploader;
module.exports = exports['default'];