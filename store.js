import $store from './Util/store'
import { read, write } from './Util/storage'

/**
 * @type {*}
 */
const store = $store({
  // the states of store
  state: {
    debugging: read('debugging', true) || false,
    purging: read('purging', true) || false
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
    updatePurging (state, purging) {
      state.purging = purging
      write('purging', purging, true)
    }
  }
})

export default store
