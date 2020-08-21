export default {
  /**
   */
  data: () => ({
    components: {}
  }),
  /**
   */
  watch: {
    fields: {
      immediate: true,
      handler (fields) {
        this.components = Object.values(fields())
          .filter((field) => !field.$layout.formHidden)
          .reduce((accumulator, field) => {
            if (this.disable === true || field.attrs.disable === true) {
              field.attrs.disable = true
            }
            const classNames = [`$key-${field.$key}`]
            if (field.attrs.uppercase) {
              classNames.push('uppercase')
            }
            if (field.attrs.borderLess) {
              classNames.push('border-less')
            }
            field.classNames = classNames
            accumulator[field.$key] = field
            return accumulator
          }, {})
      }
    }
  }
}
