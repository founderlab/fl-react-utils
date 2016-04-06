# Boilerplate and helper functions for react/redux that can be shared amongst FounderLab apps

Changes: 

- 0.4.2: Pass classNames to Pagination component
- 0.4.0: Moved server renderer to fl-sever-utils
- 0.3.5: Pagination links are real links
- 0.3.4: added createPaginationSelector to auto create a `reselect` selector
- 0.3.3: createServerRenderer takes an always_fetch parameter for components that should awlays have their fetchData method called
- 0.3.2: createGroupByReducer added
- 0.3.0: Naming scheme updated; pagination added
- 0.2.0: dispatchNeeds changed to fetchComponentData
- 0.1.0: Yoinked things from fl-base-webapp


#####createGroupByReducer
Use this to take an action parsed by responseParser and generate a list of model ids grouped by a given key

e.g. here the by_lesson property of the state will be a list of file ids that share a lesson_id 
```
const byLesson = createGroupByReducer([TYPES.FILE_LOAD + '_SUCCESS'], file => file.lesson_id)

...

export default function fileReducer(state=default_state, action={}) {

  switch (action.type) {
    ...

    case TYPES.FILE_LOAD + '_SUCCESS':
      return = state.mergeDeep({
        loading: false,
        error: null,
        by_lesson: byLesson(state.get('by_lesson'), action),
      })

    ...
  }
}
```
