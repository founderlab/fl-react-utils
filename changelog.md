
## [Unreleased]
  

## [0.10.3]
 - Single option added to groupByReducer. Set to true when creating the reducer to output a mapping of {id: target_id} rather than {id: [list_of_target_ids]}

## [0.10.0]
 - Code style switched to camelCase for variables. 
 - Frameworkstein initial release.

## [0.6.0]
 - Now an npm package
 - added requestLoggerMiddleware (moved from fl-auth-redux)

## [0.5.0]
 - Added Sidebar component

## [0.4.2]
 - Pass classNames to Pagination component

## [0.4.0]
 - Moved server renderer to fl-sever-utils

## [0.3.5]
 - Pagination links are real links

## [0.3.4]
 - added createPaginationSelector to auto create a `reselect` selector

## [0.3.3]
 - createServerRenderer takes an alwaysFetch parameter for components that should awlays have their 
   fetchData method called

## [0.3.2]
 - createGroupByReducer added

## [0.3.0]
 - Naming scheme updated; pagination added

## [0.2.0]
 - dispatchNeeds changed to fetchComponentData

## [0.1.0]
 - Yoinked things from fl-base-webapp

