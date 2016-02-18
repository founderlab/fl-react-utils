import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'

export default function createPaginationReducer(action_type) {

  const default_state = fromJS({
    visible: [],
    current_page: 1,
    endless_page: 1,
  })

  return function pagination(_state=default_state, action={}) {
    let state = _state

    if (action.type === action_type + '_COUNT_SUCCESS') {
      state = state.merge({total: +action.res})
    }

    else if (action.type === action_type + '_DEL_SUCCESS') {
      const visible = state.get('visible').toJSON()
      state = state.merge({visible: _.without(visible, action.deleted_model_id)})
    }

    else if (action.type === action_type + '_LOAD_SUCCESS' && action.page) {
      state = state.merge({visible: action.ids, current_page: action.page})
    }

    return state
  }
}
