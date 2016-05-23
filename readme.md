# Boilerplate and helper functions for react/redux that can be shared amongst FounderLab apps

createGroupByReducer
--------------------
Use this to take an action parsed by responseParser and generate a list of model ids grouped by a given key

e.g. here the byLesson property of the state will be a list of file ids that share a lessonId 
```javascript
const byLesson = createGroupByReducer([TYPES.FILE_LOAD + '_SUCCESS'], file => file.lessonId)

...

export default function fileReducer(state=defaultState, action={}) {

  switch (action.type) {
    ...

    case TYPES.FILE_LOAD + '_SUCCESS':
      return = state.mergeDeep({
        loading: false,
        error: null,
        byLesson: byLesson(state.get('byLesson'), action),
      })

    ...
  }
}
```

Sidebar
-------
Wrapper for react-sidebar with some useful defaults.

```javascript
...
import {Sidebar} from 'fl-react-utils'

class SomeComponent extends React.Component {
  render() {
    const {model} = this.props

    return (
      <Sidebar
        sidebar: <SidebarContent />,    // Required, component to be rendered inside the sidebar
        changeKey: model.id,           // Sidebar will close when this key changes (useful for closing on navigation)
        disableToggle: false,          // Hide the open/close toggle button when not in docket mode (< 768px)
      >
        <div>App content goes here</div>
      </Sidebar>
    )
  }
}
```

requestLoggerMiddleware
-----------------------
Auto logs all requests to the console.
Add to your redux middleware to have each request logged, useful for mobile debugging.


requestModifierMiddleware
-------------------------

Appends a user id to any superagent request or BackboneORM cursor function it finds on an action.

It's designed to work alongside redux-request-middleware which will perform the request and dispatch the relevant (sub)-actions.

It must be included *before* redux-request-middleware when combining middleware, otherwise the requests will be sent before it has a chance to alter the query.


- options:
  --------
    getValue(store):              A function that takes a store and returns a value object to append to the request. You need to supply this.

    getRequest(action):           Return a request from an action, defaults to returning action.request

    setValue(request, value):     A function that appends `value` to the request somehow. By default it's this:

      ```javascript
      export function setValue(request, value) {
        if (_.isObject(request._cursor)) {
          _.merge(request._cursor, value)
        }
        if (_.isFunction(request.query)) {
          request.query(value)
        }
        return request
      }
      ```


- Usage
  ----- 

  This example creates middleware that adds a $user_id param with the current user's id to requests

  ```javascript
  const requestModifierMiddleware = createRequestModifierMiddleware({
    getValue: store => {
      const {auth} = store.getState()
      const value = {}
      if (auth.get('user')) value.$user_id = auth.get('user').get('id')
      return value
    },
  })
  ```

  i.e. if you have a user with id `1234`, all modified requests will now look like `/api/some_model/?$user_id=1234`
