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

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react2 = _interopRequireDefault(_react);

var _components = {
  _$S3Image: {
    displayName: 'S3Image'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/S3Image.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var S3Image = (function (_Component) {
  _inherits(S3Image, _Component);

  function S3Image() {
    _classCallCheck(this, _S3Image);

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

  var _S3Image = S3Image;
  S3Image = _wrapComponent('_$S3Image')(S3Image) || S3Image;
  return S3Image;
})(_react.Component);

exports['default'] = S3Image;
module.exports = exports['default'];