'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createRenderer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

var _sharedCreate_store = require('../../shared/create_store');

var _sharedCreate_store2 = _interopRequireDefault(_sharedCreate_store);

var _sharedRoutes = require('../../shared/routes');

var _sharedRoutes2 = _interopRequireDefault(_sharedRoutes);

var _sharedLibDispatch_needs = require('../../shared/lib/dispatch_needs');

var _sharedLibDispatch_needs2 = _interopRequireDefault(_sharedLibDispatch_needs);

function createRenderer(options) {
  var scripts = options.scripts || [];

  return function app(req, res) {

    var server_state = {
      config: options.config,
      auth: req.user ? { email: req.user.get('email'), admin: req.user.get('admin') } : {}
    };
    var store = (0, _sharedCreate_store2['default'])(_reduxRouterServer.reduxReactRouter, _sharedRoutes2['default'], _historyLibCreateMemoryHistory2['default'], server_state);

    store.dispatch((0, _reduxRouterServer.match)(req.originalUrl, function (err, redirect_location, router_state) {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }
      if (redirect_location) return res.redirect(redirect_location.pathname + redirect_location.search);
      if (!router_state) return res.status(404).send('Not found');

      (0, _sharedLibDispatch_needs2['default'])({ store: store, components: router_state.components }, function (err) {
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

        var component_html = (0, _reactDomServer.renderToString)(_react2['default'].createElement(
          _reactRedux.Provider,
          { store: store, key: 'provider' },
          _react2['default'].createElement(_reduxRouter.ReduxRouter, null)
        ));

        var script_tags = scripts.map(function (script) {
          return '<script type="application/javascript" src="/public/' + script + '"></script>';
        }).join('\n');

        var HTML = '\n          <!DOCTYPE html>\n          <html>\n            <head>\n              <meta charset="utf-8">\n              <title>FounderLab_replaceme></title>\n              <script type="application/javascript">\n                window.__INITIAL_STATE__ = ' + JSON.stringify(initial_state) + '\n              </script>\n            </head>\n            <body id="app">\n              <div id="react-view">' + component_html + '</div>\n              ' + script_tags + '\n            </body>\n          </html>\n        ';

        res.type('html').send(HTML);
      });
    }));
  };
}

module.exports = exports['default'];