import _ from 'lodash'
import React from 'react'
import {renderToString} from 'react-dom/server'
import createHistory from 'history/lib/createMemoryHistory'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {reduxReactRouter, match} from 'redux-router/server'

import fetchComponentData from './fetch_component_data'

export default function createServerRenderer(options) {
  const {createStore, getRoutes, scripts=[], config={}} = options
  if (!createStore) throw new Error('[fl-react-utils] createServerRenderer: Missing createStore from options')
  if (!getRoutes) throw new Error('[fl-react-utils] createServerRenderer: Missing getRoutes from options')

  return function app(req, res) {
    const server_state = {
      config,
      auth: req.user ? {email: req.user.get('email'), admin: req.user.get('admin')} : {},
    }
    const store = createStore(reduxReactRouter, getRoutes, createHistory, server_state)

    store.dispatch(match(req.originalUrl, (err, redirect_location, router_state) => {
      if (err) {
        console.log(err)
        return res.status(500).send('Internal server error')
      }
      if (redirect_location) return res.redirect(redirect_location.pathname + redirect_location.search)
      if (!router_state) return res.status(404).send('Not found')

      fetchComponentData({store, components: router_state.components}, (err) => {
        if (err) {
          console.log(err)
          return res.status(500).send('Internal server error')
        }

        let initial_state = store.getState()

        // temp solution to rendering admin state
        // todo: make this better. don't include admin reducers / route unless requested
        if (options.omit) initial_state = _.omit(initial_state, options.omit)

        // https://github.com/rackt/redux-router/issues/106
        router_state.location.query = req.query

        const component = (
          <Provider store={store} key="provider">
            <ReduxRouter />
          </Provider>
        )

        const script_tags = scripts.map(script => `<script type="application/javascript" src="${script}"></script>`).join('\n')

        const HTML = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>FounderLab_replaceme></title>
              <script type="application/javascript">
                window.__INITIAL_STATE__ = ${JSON.stringify(initial_state)}
              </script>
            </head>
            <body id="app">
              <div id="react-view">${renderToString(component)}</div>
              ${script_tags}
            </body>
          </html>
        `
        res.type('html').send(HTML)

      })
    }))
  }
}
