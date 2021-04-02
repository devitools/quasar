import $emporium from '../../../../emporium'

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
     * @returns {boolean}
     */
    hasPending () {
      if (!$emporium.state.pending) {
        return false
      }
      const property = $emporium.state.pending
      this.errors[property] = {
        validation: 'required',
        parameters: {}
      }
      return true
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
