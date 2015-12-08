'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createServerRenderer;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = require('react-dom/server');

var _historyLibCreateMemoryHistory = require('history/lib/createMemoryHistory');

var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);

var _reactRedux = require('react-redux');

var _reduxRouter = require('redux-router');

var _reduxRouterServer = require('redux-router/server');

var _fetch_component_data = require('./fetch_component_data');

var _fetch_component_data2 = _interopRequireDefault(_fetch_component_data);

function createServerRenderer(options) {
  var createStore = options.createStore;
  var getRoutes = options.getRoutes;
  var _options$scripts = options.scripts;
  var scripts = _options$scripts === undefined ? [] : _options$scripts;
  var _options$config = options.config;
  var config = _options$config === undefined ? {} : _options$config;

  if (!createStore) throw new Error('[fl-react-utils] createServerRenderer: Missing createStore from options');
  if (!getRoutes) throw new Error('[fl-react-utils] createServerRenderer: Missing getRoutes from options');

  return function app(req, res) {
    var server_state = {
      config: config,
      auth: req.user ? { email: req.user.get('email'), admin: req.user.get('admin') } : {}
    };
    var store = createStore(_reduxRouterServer.reduxReactRouter, getRoutes, _historyLibCreateMemoryHistory2['default'], server_state);

    store.dispatch(_reduxRouterServer.match(req.originalUrl, function (err, redirect_location, router_state) {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }
      if (redirect_location) return res.redirect(redirect_location.pathname + redirect_location.search);
      if (!router_state) return res.status(404).send('Not found');

      _fetch_component_data2['default']({ store: store, components: router_state.components }, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send('Internal server error');
        }

        var initial_state = store.getState();

        // temp solution to rendering admin state
        // todo: make this better. don't include admin reducers / route unless requested
        if (options.omit) initial_state = _lodash2['default'].omit(initial_state, options.omit);

        // https://github.com/rackt/redux-router/issues/106
        router_state.location.query = req.query;

        var component = _react2['default'].createElement(
          _reactRedux.Provider,
          { store: store, key: 'provider' },
          _react2['default'].createElement(_reduxRouter.ReduxRouter, null)
        );

        var script_tags = scripts.map(function (script) {
          return '<script type="application/javascript" src="' + script + '"></script>';
        }).join('\n');

        var HTML = '\n          <!DOCTYPE html>\n          <html>\n            <head>\n              <meta charset="utf-8">\n              <title>FounderLab_replaceme></title>\n              <script type="application/javascript">\n                window.__INITIAL_STATE__ = ' + JSON.stringify(initial_state) + '\n              </script>\n            </head>\n            <body id="app">\n              <div id="react-view">' + _reactDomServer.renderToString(component) + '</div>\n              ' + script_tags + '\n            </body>\n          </html>\n        ';
        res.type('html').send(HTML);
      });
    }));
  };
}

module.exports = exports['default'];