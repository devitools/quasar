import $store from '../store'

let storage = {}

export default {
  /**
   * @param {string} index
   * @returns {undefined|*}
   */
  get (index) {
    if ($store.state.purging) {
      return undefined
    }

    return storage[index]
  },
  /**
   * @param {string} index
   * @param {*} value
   */
  set (index, value) {
    if ($store.state.purging) {
      return
    }

    storage[index] = value
  },
  /**
   */
  clear () {
    storage = {}
  }
}
