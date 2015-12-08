'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

exports.__esModule = true;

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = require('react-dom/server');

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _reactDocumentMeta = require('react-document-meta');

var _reactDocumentMeta2 = _interopRequireDefault(_reactDocumentMeta);

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
var _components = {
  _$Html: {
    displayName: 'Html'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/Html.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var Html = (function (_Component) {
  _inherits(Html, _Component);

  function Html() {
    _classCallCheck(this, _Html);

    _Component.apply(this, arguments);
  }

  Html.prototype.render = function render() {
    var _props = this.props;
    var assets = _props.assets;
    var component = _props.component;
    var store = _props.store;

    var content = component ? _reactDomServer2['default'].renderToString(component) : '';

    return _react2['default'].createElement(
      'html',
      { lang: 'en-us' },
      _react2['default'].createElement(
        'head',
        null,
        _reactDocumentMeta2['default'].renderAsReact(),
        _react2['default'].createElement('link', { rel: 'shortcut icon', href: '/favicon.ico' }),
        _react2['default'].createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        _Object$keys(assets.styles).map(function (style, key) {
          return _react2['default'].createElement('link', { href: assets.styles[style], key: key, media: 'screen, projection',
            rel: 'stylesheet', type: 'text/css', charSet: 'UTF-8' });
        })
      ),
      _react2['default'].createElement(
        'body',
        null,
        _react2['default'].createElement('div', { id: 'content', dangerouslySetInnerHTML: { __html: content } }),
        _react2['default'].createElement('script', { dangerouslySetInnerHTML: { __html: 'window.__INITIAL_STATE__=' + _serializeJavascript2['default'](store.getState()) + ';' }, charSet: 'UTF-8' }),
        _react2['default'].createElement('script', { src: assets.javascript.main, charSet: 'UTF-8' })
      )
    );
  };

  _createClass(Html, null, [{
    key: 'propTypes',
    value: {
      assets: _react.PropTypes.object,
      component: _react.PropTypes.node,
      store: _react.PropTypes.object
    },
    enumerable: true
  }]);

  var _Html = Html;
  Html = _wrapComponent('_$Html')(Html) || Html;
  return Html;
})(_react.Component);

exports['default'] = Html;
module.exports = exports['default'];
/* styles (will be present only in production with webpack extract text plugin) */ /* (will be present only in development mode) */ /* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */ /* can smoothen the initial style flash (flicker) on page load in development mode. */ /* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */ /* Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../theme/bootstrap.config.js') + require('../containers/App/App.scss')._style}}/> : null */