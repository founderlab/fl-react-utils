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

var S3Image = (function (_Component) {
  _inherits(S3Image, _Component);

  function S3Image() {
    _classCallCheck(this, S3Image);

    _Component.apply(this, arguments);
  }

  S3Image.prototype.render = function render() {
    var filename = this.props.filename;

    var url = this.context.s3Url + '/' + filename;

    return _react2['default'].createElement('img', _extends({ src: url }, this.props));
  };

  _createClass(S3Image, null, [{
    key: 'propTypes',
    value: {
      filename: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      s3Url: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return S3Image;
})(_react.Component);

exports['default'] = S3Image;
module.exports = exports['default'];