import $store from './Util/store'
import { read, write } from './Util/storage'

/**
 * @type {*}
 */
const store = $store({
  // the states of store
  state: {
    debugging: read('debugging', true) || false,
    filling: read('filling', true) || false,
    profiling: read('profiling', true) || false,
    purging: read('purging', true) || false,
    modified: false
  },
  // the mutations to call with commit
  // ex.: $store.commit('updateVersion')
  mutations: {
    /**
     * @param {Object} state
     * @param {string} debugging
     */
    updateDebugging (state, debugging) {
      state.debugging = debugging
      write('debugging', debugging, true)
    },
    /**
     * @param {Object} state
     * @param {string} purging
     */
    updateFilling (state, purging) {
      state.filling = purging
      write('filling', purging, true)
    },
    /**
     * @param {Object} state
     * @param {string} purging
     */
    updateProfiling (state, purging) {
      state.profiling = purging
      write('profiling', purging, true)
    },
    /**
     * @param {Object} state
     * @param {string} purging
     */
    updatePurging (state, purging) {
      state.purging = purging
      write('purging', purging, true)
    },
    /**
     * @param {Object} state
     * @param {string} modified
     */
    updateModified (state, modified) {
      state.modified = modified
    }
  }
})

export default store
