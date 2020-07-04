/**
 * @type {{}}
 */
const performance = {}

const $ = process.env.VUE_APP_DEV_PERFORMANCE === 'true'
  ? {
    start (reference) {
      performance[reference] = window.performance.now()
    },
    end (reference) {
      const t1 = window.performance.now()
      const t0 = performance[reference]
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[${reference}] ${Math.round(t1 - t0)}ms`)
      }
    }
  }
  : {
    start () {},
    end () {}
  }

/**
 */
export default $
