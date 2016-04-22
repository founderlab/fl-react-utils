import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'

export default function fetchComponentData(options, callback) {
  const {store, components, action} = options
  const result = {}
  const queue = new Queue()

  components.forEach(_Component => {
    if (!_Component) return
    const Component = _Component.WrappedComponent || _Component
    if (!Component.fetchData) return
    queue.defer(callback => Component.fetchData({store, action}, (err, res) => {
      if (res) _.extend(result, res)
      callback(err)
    }))
  })

  queue.await(err => {
    if (callback) callback(err, result)
  })
}
