import { Notify } from 'quasar'

/**
 * @param {Object} options
 * @param {Object} action
 * @returns {*}
 */
const base = (options, action = {}) => {
  const defaults = {
    color: '',
    textColor: '',
    icon: '',
    message: '',
    position: 'top-right',
    duration: 5000,
    actions: [
      {
        icon: 'close',
        color: 'white',
        handler: () => undefined,
        ...action
      }
    ]
  }
  return {
    ...defaults,
    ...options
  }
}

/**
 * @param {string} message
 * @param options
 */
export const toast = (message, options = {}) => {
  Notify.create(base({ message, ...options }))
}

/**
 * @param {string} message
 * @param options
 */
export const success = (message, options = {}) => {
  Notify.create(base({ message, ...options, color: 'positive' }))
}

/**
 * @param {string} message
 * @param options
 */
export const error = (message, options = {}) => {
  Notify.create(base({ message, ...options, color: 'negative' }))
}

/**
 * @param {string} message
 * @param options
 */
export const warning = (message, options = {}) => {
  const opts = base(
    { message, ...options, textColor: 'black', color: 'yellow-14' },
    { textColor: 'black' }
  )
  Notify.create(opts)
}
