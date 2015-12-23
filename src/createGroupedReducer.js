
export default function createGroupedReducer(action_types, groupingKey) {
  const grouped_default_state = fromJS({})
  const [load_action, delete_action] = action_types

  return function grouped(_state=grouped_default_state, action={}) {
    let state = _state

    if (action.type === delete_action) {
      const {id} = action.deleted_model
      const grouping_key = groupingKey(action.deleted_model)
      const current = state.get(grouping_key)
      return state.merge({[grouping_key]: _.without(current, id)})
    }

    if (action.type === load_action) {
      const by_group = _.groupBy(action.models, model => groupingKey(model))

      _.forEach(by_group, (models, grouping_key) => {
        let group_state = state.get(grouping_key) || fromJS([])
        _.forEach(models, model => {
          if (!group_state.includes(model.id)) group_state = group_state.push(model.id)
        })
        state = state.merge({[grouping_key]: group_state})
      })
    }

    return state
  }
}
