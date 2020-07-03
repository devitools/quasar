/**
 * @mixin {FormError}
 */
export default {
  /**
   */
  methods: {
    /**
     * @returns {boolean}
     */
    hasErrors () {
      return Object.keys(this.errors).filter((key) => this.errors[key]).length > 0
    },
    /**
     */
    renderErrors () {
      const reduceErrors = (errors, field) => {
        errors[field.$key] = ''
        return errors
      }
      this.errors = Object.values(this.components).reduce(reduceErrors, {})
    }
  }
}
