import _ from 'lodash'
import {fromJS} from 'immutable'

export default function createGroupByReducer(actionTypes, groupingKey, options={}) {
  const groupedDefaultState = fromJS({})
  const [loadAction, deleteAction] = actionTypes

  return function groupBy(_state=groupedDefaultState, action={}) {
    let state = _state

    if (deleteAction && action.type === deleteAction) {
      const {id} = action.deletedModel
      const groupingKey = groupingKey(action.deletedModel)
      const current = state.get(groupingKey)
      return state.merge({[groupingKey]: _.without(current, id)})
    }

    if (action.type === loadAction) {
      const byGroup = _.groupBy(action.models, model => groupingKey(model))

      _.forEach(byGroup, (models, groupingKey) => {
        if (_.isNil(groupingKey)) return
        let groupState

        if (options.single) {
          groupState = models[0] && models[0].id
        }
        else {
          groupState = state.get(groupingKey) || fromJS([])
          _.forEach(models, model => {
            if (!groupState.includes(model.id)) groupState = groupState.push(model.id)
          })
        }
        state = state.merge({[groupingKey]: groupState})
      })
    }

    return state
  }
}
