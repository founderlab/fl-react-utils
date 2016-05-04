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

var S3Image = (function (_Component) {
  _inherits(S3Image, _Component);

  function S3Image() {
    _classCallCheck(this, S3Image);

    _Component.apply(this, arguments);
  }

  S3Image.prototype.render = function render() {
    var filename = this.props.filename;

    var url = this.context.s3_url + '/' + filename;

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
      s3_url: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return S3Image;
})(_react.Component);

exports['default'] = S3Image;
module.exports = exports['default'];