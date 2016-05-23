// valueMiddleware appends a user id to any superagent request it finds on an action
// It's designed to work alongside requestMiddleware which will perform the requests and dispatch the relevant (sub)-actions
// It must be included *before* redux-request-middleware when combining middleware
// Otherwise the requests will be sent before it has a chance to alter the query

// options:
//  getRequest(action):           Return a request from an action, defaults to returning action.request
//  getValue(store):              A function that takes a store and returns a value object to append to the request
import _ from 'lodash'

export function setValue(request, value) {
  if (_.isObject(request._cursor)) {
    _.merge(request._cursor, value)
  }
  if (_.isFunction(request.query)) {
    request.query(value)
  }
  return request
}

const defaults = {
  getRequest: action => action.request,
  setValue,
}

export default function createRequestModifierMiddleware(_options={}) {
  const options = _.merge(defaults, _options)
  if (!options.getValue) return console.error('[fl-react-utils] createQueryMiddleware requires a getValue option')

  return function requestModifierMiddleware(store) {
    return next => action => {

      const request = options.getRequest(action)
      const value = options.getValue(store)
      if (request && value) options.setValue(request, value)

      next(action)
    }
  }
}
