import $lang from '../Lang'

/**
 * @param {string} domain
 * @param {string} field
 * @param {Record} enumeration
 * @returns {Array}
 */
export const langEnumToOptions = (domain, field, enumeration) => {
  return Object.keys(enumeration).reduce((accumulator, key) => {
    const option = enumeration[key] - 1
    accumulator.push({
      value: enumeration[key],
      label: $lang(`domains.${domain}.fields.${field}.options.${option}.label`)
    })
    return accumulator
  }, [])
}
