import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'

export default function createPaginationReducer(action_type) {

  const default_state = fromJS({
    visible: [],
    current_page: 1,
    endless_page: 1,
    // loading: false,
  })

  return function pagination(_state=default_state, action={}) {
    let state = _state//.merge({loading: false})
    if (action.type === action_type + '_COUNT_SUCCESS') {
      return state.merge({total: +action.res})
    }

    if (action.type === action_type + '_DEL_SUCCESS') {
      const visible = state.get('visible')
      return state.merge({visible: _.without(visible, action.deleted_id)})
    }

    if (action.page && (action.page !== state.current_page)) {
      state = state.merge({visible: _.map(action.models, m => m.id), current_page: action.page})
    }

    return state
  }

}
