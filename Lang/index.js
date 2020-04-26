import { get } from '../Util/general'
import i18n from 'src/i18n'

/**
 * Set the current locale
 * @param {string} newLocale
 */
export const setLocale = (newLocale) => {
  i18n.locale = newLocale
}

/**
 * Get the current locale
 * @returns {string}
 */
export const getLocale = () => {
  return i18n.locale
}

/**
 * Lang is a featured i18n engine
 * We can change the locale and add more messages in realtime
 * I do not like some things in vue-i18n and other libs that I've tested, so that's it
 * @param {string|array} path
 * @param {string} fallback
 * @returns {*}
 */
export default (path, fallback = '') => {
  const locale = i18n.locale
  const messages = i18n.messages[locale]

  if (Array.isArray(path)) {
    for (const candidate in path) {
      if (!path.hasOwnProperty(candidate)) {
        continue
      }
      const answer = get(messages, path[candidate])
      if (answer) {
        return answer
      }
    }
    return fallback
  }
  return get(messages, path, fallback)
}
