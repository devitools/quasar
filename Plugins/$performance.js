/**
 * @type {{}}
 */
const performance = {}

/**
 */
export default {
  start (reference) {
    performance[reference] = window.performance.now()
  },
  end (reference) {
    const t1 = window.performance.now()
    const t0 = performance[reference]
    if (process.env.NODE_ENV !== 'production' && process.env.VUE_APP_PERFORMANCE === 'true') {
      console.warn(`[${reference}] ${Math.round(t1 - t0)}ms`)
    }
  }
}
