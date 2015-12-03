import Queue from 'queue-async'

export default function fetchComponentData(options, callback) {
  const {store, components, action} = options
  const queue = new Queue()

  components.forEach(_Component => {
    if (!_Component) return
    const Component = _Component.WrappedComponent || _Component
    if (!Component.fetchData) return
    queue.defer(callback => Component.fetchData({store, action}, callback))
  })

  if (callback) queue.await(callback)
}
