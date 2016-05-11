# Boilerplate and helper functions for react/redux that can be shared amongst FounderLab apps

Changes: 

- 1.0.0 Code style switched to camelCase for variables. Frameworkstein initial release.
- 0.6.0: Now an npm package; added requestLoggerMiddleware
- 0.5.0: Added Sidebar component
- 0.4.2: Pass classNames to Pagination component
- 0.4.0: Moved server renderer to fl-sever-utils
- 0.3.5: Pagination links are real links
- 0.3.4: added createPaginationSelector to auto create a `reselect` selector
- 0.3.3: createServerRenderer takes an alwaysFetch parameter for components that should awlays have their fetchData method called
- 0.3.2: createGroupByReducer added
- 0.3.0: Naming scheme updated; pagination added
- 0.2.0: dispatchNeeds changed to fetchComponentData
- 0.1.0: Yoinked things from fl-base-webapp


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
