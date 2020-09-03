let clipboard = {}

/**
 * @type {Clipboard}
 */
export default {
  /**
   * @param {string} index
   * @param {*} value
   */
  register (index, value) {
    clipboard[index] = value
  },
  /**
   * @param {string} index
   * @returns {undefined|*}
   */
  recover (index) {
    if (!clipboard.hasOwnProperty(index)) {
      return undefined
    }
    const clone = JSON.parse(JSON.stringify(clipboard[index]))
    delete clipboard[index]
    return clone
  },
  /**
   */
  clear () {
    clipboard = {}
  }
}
