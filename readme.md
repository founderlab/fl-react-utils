# Boilerplate and helper functions for react/redux that can be shared amongst FounderLab apps

### Components

#####createServerRenderer:
Helper method that takes care of a bunch of bs boilerplate for rendering react components server side. 
Usage: 

```javascript
app.get('*', createServerRenderer({
  createStore, 
  getRoutes,
  scripts: _.map(_.pick(require('../../webpack-assets.json'), ['shared.js', 'app']), entry => entry.js),
  omit: 'admin',
  always_fetch: require('../../shared/modules/app/containers/App'),
  config: _.pick(config, config.client_config_keys),
}))
```

Changes: 

- 0.3.3: always_fetch option for serverRenderer: List components here that should have their fetchData method called regardless of the route
- 0.3.2: createGroupByReducer added
- 0.3.0: Naming scheme updated; pagination added
- 0.2.0: dispatchNeeds changed to fetchComponentData
- 0.1.0: Yoinked things from fl-base-webapp
