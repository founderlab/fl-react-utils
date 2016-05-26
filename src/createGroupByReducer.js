import _ from 'lodash'
import warning from 'warning'
import {Set, fromJS} from 'immutable'

export default function createGroupByReducer(actionTypes, groupingKey, options={}) {
  const groupedDefaultState = fromJS({})
  const [loadAction, deleteAction] = actionTypes
  const keyFn = options.keyFn || (val => val ? `${val}` : null)

  return function groupBy(_state=groupedDefaultState, action={}) {
    let state = _state

    if (deleteAction && action.type === deleteAction) {
      const id = action.deletedModel.id
      const _key = groupingKey(action.deletedModel)
      const key = keyFn(_key)
      const current = state.get(key)

      if (_.isNil(key)) {
        warning(false, `[fl-react-utils] groupByReducer: groupingKey(action.deletedModel) was nil for deleted model ${JSON.stringify(action.deletedModel)}`)
      }
      else if (!current) {
        warning(false, `[fl-react-utils] groupByReducer: state.get(key) was nil for key ${key} from deleted model ${JSON.stringify(action.deletedModel)}`)
      }
      else {
        return state.merge({[key]: current.remove(id)})
      }
    }

    else if (action.type === loadAction) {
      const byGroup = _.groupBy(action.models, model => groupingKey(model))

      _.forEach(byGroup, (models, _key) => {
        if (_.isNil(_key)) return
        const key = keyFn(_key)
        let groupState

        if (options.single) {
          groupState = models[0] && models[0].id
        }
        else {
          groupState = state.get(key) || new Set()
          _.forEach(models, model => {
            if (!groupState.includes(model.id)) groupState = groupState.add(model.id)
          })
        }
        state = state.merge({[key]: groupState})
      })
    }

    return state
  }
}
