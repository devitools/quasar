import { helpers } from 'vuelidate/lib/validators'

import { withValidation } from '../../Util/validation'

/**
 */
export default {
  /**
   * @param {string} alias
   * @param {Function|Object|Array|number|string} options
   * @returns {Schema|Skeleton}
   */
  validationAdd (alias, options) {
    const name = this.__currentField
    this.__fields[name].$validations[alias] = options
    return this
  },

  /**
   * Register custom validator to field
   * @param {string} alias
   * @param {function} handler
   * @returns {Schema|Skeleton}
   */
  validationAs (alias, handler) {
    return this.validationAdd(alias, withValidation(handler))
  },

  /**
   * Requires non-empty data. Checks for empty arrays and strings containing only whitespaces.
   * @param {Boolean} required
   * @returns {Schema|Skeleton}
   */
  validationRequired (required = true) {
    return this.validationAdd('required', required)
  },

  /**
   * Requires non-empty data only if provided property or predicate is true.
   * @params locator
   * @returns {Schema|Skeleton}
   */
  validationRequiredIf (locator) {
    return this.validationAdd('requiredIf', locator)
  },

  /**
   * Requires non-empty data only if provided property or predicate is true.
   * @params {function} criteria
   * @returns {Schema|Skeleton}
   */
  validationRequiredWhen (criteria) {
    return this.validationAdd('requiredIf', function (value) {
      const validate = criteria.call(this)
      if (!validate) {
        return true
      }
      return !!value
    })
  },

  /**
   * Requires non-empty data only if provided property or predicate is false.
   * @params locator
   * @returns {Schema|Skeleton}
   */
  validationRequiredUnless (locator) {
    return this.validationAdd('requiredUnless', locator)
  },

  /**
   * Requires the input to have a minimum specified length, inclusive. Works with arrays.
   * @param {Number} minLength
   * @returns {Schema|Skeleton}
   */
  validationMinLength (minLength = 3) {
    return this.validationAdd('minLength', [minLength])
  },

  /**
   * Requires the input to have a maximum specified length, inclusive. Works with arrays.
   * @param {Number} maxLength
   * @returns {Schema|Skeleton}
   */
  validationMaxLength (maxLength = 10) {
    return this.validationAdd('maxLength', [maxLength])
  },

  /**
   * Requires entry to have a specified minimum numeric value or Date.
   * @params min
   * @returns {Schema|Skeleton}
   */
  validationMinValue (min) {
    return this.validationAdd('minValue', [min])
  },

  /**
   * Requires entry to have a specified maximum numeric value or Date.
   * @params max
   * @returns {Schema|Skeleton}
   */
  validationMaxValue (max) {
    return this.validationAdd('maxValue', [max])
  },

  /**
   * Checks if a number or Date is in specified bounds. Min and max are both inclusive.
   * @params min
   * @params max
   * @returns {Schema|Skeleton}
   */
  validationBetween (min, max) {
    return this.validationAdd('between', [min, max])
  },

  /**
   * Accepts only alphabet characters.
   * @returns {Schema|Skeleton}
   */
  validationAlpha () {
    return this.validationAdd('alpha', true)
  },

  /**
   * Accepts only alphanumerics.
   * @returns {Schema|Skeleton}
   */
  validationAlphaNum () {
    return this.validationAdd('alphaNum', true)
  },

  /**
   * Accepts only numerics.
   * @returns {Schema|Skeleton}
   */
  validationNumeric () {
    return this.validationAdd('numeric', true)
  },

  /**
   * Accepts positive and negative integers.
   * @returns {Schema|Skeleton}
   */
  validationInteger () {
    return this.validationAdd('integer', true)
  },

  /**
   * Accepts positive and negative decimal numbers.
   * @returns {Schema|Skeleton}
   */
  validationDecimal () {
    return this.validationAdd('decimal', true)
  },

  /**
   * Accepts valid email addresses. Keep in mind you still have to carefully verify it on your server, as it is impossible to tell if the address is real without sending verification email.
   * @returns {Schema|Skeleton}
   */
  validationEmail () {
    return this.validationAdd('email', true)
  },

  /**
   * Accepts valid IPv4 addresses in dotted decimal notation like 127.0.0.1.
   * @returns {Schema|Skeleton}
   */
  validationIpAddress () {
    return this.validationAdd('ipAddress', true)
  },

  /**
   * Accepts valid MAC addresses like 00:ff:11:22:33:44:55. Don't forget to call it macAddress(), as it has optional parameter. You can specify your own separator instead of ':'. Provide empty separator macAddress('') to validate MAC addresses like 00ff1122334455.
   * @params separator=':'
   * @returns {Schema|Skeleton}
   */
  validationMacAddress () {
    return this.validationAdd('macAddress', true)
  },

  /**
   * Test if value is a password
   * @returns {Schema|Skeleton}
   */
  validationPassword () {
    return this.validationAdd('password', helpers.regex('password', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#$^+=!*()@%&]?).{6,}$/))
  },

  /**
   * Checks for equality with a given property.
   * @params locator
   * @returns {Schema|Skeleton}
   */
  validationSameAs (locator) {
    return this.validationAdd('sameAs', locator)
  },

  /**
   * Accepts only URLs.
   * @returns {Schema|Skeleton}
   */
  validationUrl () {
    return this.validationAdd('url', true)
  },

  /**
   * @param {number} size "Size in mb (20 * 1024 = 20mb)"
   * @return {Schema|Skeleton}
   */
  validationMaxFileSize (size) {
    const handler =  helpers.withParams({ size }, value => {
      if (!value) {
        return true
      }
      const fileSizeInKb = value.size / 1024
      const valueSize = Math.round(fileSizeInKb * 100) / 100
      return valueSize <= size
    })
    return this.validationAs('maxFileSize',  handler)
  },

  // /**
  //  * Passes when at least one of provided validators passes.
  //  * @params validators...
  //  */
  // validationOr () {},
  // /**
  //  * Passes when all of provided validators passes.
  //  * @params validators...
  //  */
  // validationAnd () {},
  // /**
  //  * Passes when provided validator would not pass, fails otherwise. Can be chained with other validators like not(sameAs('field')).
  //  * @params validator
  //  */
  // validationNot () {},
  // /**
  //  * Not really a validator, but a validator modifier. Adds a $params object to the provided validator. Can be used on validation functions or even entire nested field validation objects. Useful for creating your own custom validators.
  //  * @params $params, validator
  //  */
  // validationWithParams () {},

  /**
   * @returns {Schema|Skeleton}
   */
  validationClear () {
    const name = this.__currentField
    this.__fields[name].$validations = {}
    return this
  },

  /**
   * @param {string} validation
   * @returns {Schema|Skeleton}
   */
  validationRemove (validation) {
    const name = this.__currentField
    delete this.__fields[name].$validations[validation]
    return this
  }
}
