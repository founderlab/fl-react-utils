import _ from 'lodash' // eslint-disable-line
import {createSelector} from 'reselect'

function paginationState(state, paginate_on) {
  if (_.isFunction(paginate_on)) return paginate_on(state)
  return state[paginate_on]
}

const defaultSelect = () => {}

export default function createPaginationSelector(paginate_on, selectState=defaultSelect) {
  return createSelector(
    state => state[paginate_on].get('loading'),
    state => state[paginate_on].get('by_id'),
    state => state[paginate_on].get('pagination'),
    selectState,
    (loading, models, pagination, selected_state) => {
      const visible_items = []
      if (loading) return _.extend({}, selected_state, {visible_items, total_items: 0, loading: true})

      const visible_ids = pagination.get('visible').toJSON()
      const total_items = +(pagination.get('total'))

      _.forEach(visible_ids, id => visible_items.push(models.get(id).toJSON()))

      return _.extend({}, selected_state, {visible_items, total_items})
    }
  )
}
