import _ from 'lodash' // eslint-disable-line
import {createSelector} from 'reselect'

export default function createPaginationSelector(paginate_on, selectState) {
  return createSelector(
    state => state[paginate_on].get('loading'),
    state => state[paginate_on].get('by_id'),
    state => state[paginate_on].get('pagination'),
    selectState,
    (loading, models, pagination, selected_state) => {
      if (loading) return _.extend({}, selected_state, {loading: true})

      const visible_ids = pagination.get('visible').toJSON()
      const total_items = +(pagination.get('total'))
      const visible_items = []

      _.forEach(visible_ids, id => visible_items.push(models.get(id).toJSON()))

      return _.extend({}, selected_state, {visible_items, total_items})
    }
  )
}
