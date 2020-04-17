import { LocalStorage, SessionStorage } from 'quasar'
import { DEFAULT_REMEMBER } from 'src/settings/storage'

/**
 * @param value
 */
const parse = (value) => value === 'undefined' ? undefined : value

/**
 * @param {string} index
 * @param {Boolean} remember
 * @returns {*}
 */
export const read = (index, remember = DEFAULT_REMEMBER) => {
  if (remember) {
    return parse(LocalStorage.getItem(index))
  }
  return parse(SessionStorage.getItem(index))
}

/**
 * @param {string} index
 * @param {*} value
 * @param {boolean} remember
 * @returns {*}
 */
export const write = (index, value, remember = DEFAULT_REMEMBER) => {
  if (remember) {
    return LocalStorage.set(index, value)
  }
  return SessionStorage.set(index, value)
}

/**
 * @param {string} index
 * @param {boolean} remember
 * @returns {*}
 */
export const erase = (index, remember = DEFAULT_REMEMBER) => {
  if (remember) {
    return LocalStorage.remove(index)
  }
  return SessionStorage.remove(index)
}
