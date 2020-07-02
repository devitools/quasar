import dayJS from 'dayjs'

/**
 * @param {string} date
 * @param {string} format
 * @returns {string}
 */
export const format = (date, format = 'DD/MM/YYYY') => {
  return dayJS(date).format(format)
}

/**
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
export const firstDayOfWeek = (date, format = 'DD/MM/YYYY') => {
  return dayJS(date).startOf('week').format(format)
}

/**
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
export const firstDayOfMonth = (date, format = 'DD/MM/YYYY') => {
  return dayJS(date).startOf('month').format(format)
}
