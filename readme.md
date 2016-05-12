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
