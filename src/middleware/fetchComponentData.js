import {ROUTER_DID_CHANGE} from 'redux-router/lib/constants'
import {fetchComponentData} from 'fl-utils'

const locsEqual = (locA, locB) => (locA.pathname === locB.pathname) && (locA.search === locB.search)

export default store => next => action => {
  const router = store.getState().router
  if (action.type === ROUTER_DID_CHANGE && router && !locsEqual(action.payload.location, router.location)) {
    const {components} = action.payload
    fetchComponentData({store, components, action})
  }
  next(action)
}
