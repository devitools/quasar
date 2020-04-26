/**
 * @type {Object}
 */
export default {
  required: 'Required field',
  minLength: 'Minimum {min} characters',
  maxLength: 'Max {max} characters',
  minValue: 'Entered value exceeds minimum',
  maxValue: 'The entered value exceeds the maximum value',
  between: 'Entered value exceeds limits',
  alpha: 'The value must be a letter',
  alphaNum: 'The value must be a numeric alpha',
  numeric: 'Value must be a valid number',
  integer: 'Value must be an integer',
  decimal: 'The value must be a decimal number',
  email: 'The entered value must be a valid email',
  ipAddress: 'Value must be a valid IP',
  macAddress: 'Value must be a valid MAC address',
  password: 'Password must have letters, numbers and at least six chars',
  url: 'Value must be a valid URL',
  notFound: 'Record not found',

  requiredIf: 'configure [validations.{field}.requiredIf] on i18n schema file',
  requiredUnless: 'configure [validations.{field}.requiredUnless] on i18n schema file',
  sameAs: 'configure [validations.{field}.sameAs] on i18n schema file',
  or: 'configure [validations.{field}.or] on i18n schema file',
  and: 'configure [validations.{field}.and] on i18n schema file',
  not: 'configure [validations.{field}.not] on i18n schema file',
  withParams: 'configure [validations.{field}.withParams] on i18n schema file'
}
