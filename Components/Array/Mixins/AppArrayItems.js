export default {
  /**
   */
  data: () => ({
    items: []
  }),
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (this.optimize) {
          let diff = false
          const references = this.items.map((item) => item[this.primaryKey])
          for (const element of value) {
            if (references.includes(element[this.primaryKey])) {
              continue
            }
            diff = true
            break
          }
          if (diff && value.length === this.items.length) {
            return
          }
        }

        if (!Array.isArray(value)) {
          this.items = []
          return
        }

        this.items = value.map((item) => {
          Object.keys(item).forEach((key) => {
            if (this.components[key] && this.components[key].$parseInput) {
              item[key] = this.components[key].$parseInput(item[key])
            }
          })
          return item
        })
      }
    }
  }
}
