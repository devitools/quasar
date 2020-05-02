import SchemaError from '../SchemaFormError'
import { replacement } from '../../../../Util/string'

/**
 * @mixin {SchemaFormFieldError}
 */
export default {
  /**
   */
  props: {
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  components: {
    SchemaError
  },
  /**
   */
  methods: {
    /**
     * @param {string} field
     * @returns {string}
     */
    errorContent (field) {
      const errorMessages = []
      const domain = String(this.domain).replace(/\//g, '.')
      const validations = this.$util.get(this.validations, `record.${field}`)

      if (validations) {
        for (let validation in validations.$params) {
          if (!validations.$params.hasOwnProperty(validation)) {
            continue
          }
          let status
          try {
            status = validations[validation]
          } catch (e) {
            status = true
          }
          if (status) {
            continue
          }
          let replaces = Object.assign(
            validations.$params[validation] || {},
            { domain, field, validation }
          )
          let preference = `domains.${domain}.validations.${field}.${validation}`
          let paths = [
            preference,
            `domains.${domain}.validation.${field}.${validation}`
            `validation.${validation}`
          ]
          let message = replacement(this.$lang(paths, preference), replaces) || preference
          errorMessages.push(message)
        }
      }

      if (this.errors[field]) {
        const validation = this.errors[field]
        const paths = [
          `domains.${domain}.validations.${field}.${validation}`,
          `domains.${domain}.validation.${field}.${validation}`,
          `validation.${validation}`,
          this.errors[field]
        ]
        const message = this.$lang(paths) || this.errors[field]
        errorMessages.push(message)
      }

      return errorMessages.join(' / ')
    },
    /**
     * @param {Function} h
     * @param {string} key
     * @param {boolean} error
     * @returns {*}
     */
    renderFieldError (h, key, error) {
      return h('schema-error', { attrs: { show: error, message: this.errorContent(key) } })
    }
  }
}
