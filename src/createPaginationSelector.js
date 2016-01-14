import _ from 'lodash' // eslint-disable-line
import {createSelector} from 'reselect'

export default function createPaginationSelector(paginate_on, selectState) {
  return createSelector(
    state => state[paginate_on],
    selectState,
    (to_paginate, selected_state) => {
      if (to_paginate.get('loading')) return _.extend({}, selected_state, {loading: true})

      const visible_ids = to_paginate.get('pagination').get('visible').toJSON()
      const total_items = +(to_paginate.get('pagination').get('total'))
      const visible_items = []

      _.forEach(visible_ids, id => visible_items.push(to_paginate.get('by_id').get(id).toJSON()))

      return _.extend({}, selected_state, {visible_items, total_items})
    }
  )
}
