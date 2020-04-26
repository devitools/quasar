/**
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

  requiredIf: 'domains.{domain}.{field}.requiredIf',
  requiredUnless: 'domains.{domain}.{field}.requiredUnless',
  sameAs: 'domains.{domain}.{field}.sameAs',
  or: 'domains.{domain}.{field}.or',
  and: 'domains.{domain}.{field}.and',
  not: 'domains.{domain}.{field}.not',
  withParams: 'domains.{domain}.{field}.withParams'
}
