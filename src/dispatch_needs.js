import Queue from 'queue-async'

export default function dispatchNeeds(options, callback) {
  const {store, components} = options
  const queue = new Queue()

  components.forEach(comp => {
    if (!comp) return
    const needs = (comp.WrappedComponent || comp).needs || []
    needs.forEach(need => {
      const options = need.options || {}
      const action = need.action || need
      queue.defer(callback => store.dispatch(action(options, callback)))
    })
  })

  if (callback) queue.await(callback)
}
