import { uuid } from '../../../Util/general'

export default {
  /**
   */
  data: () => ({
    records: []
  }),
  /**
   */
  methods: {
    /**
     * @param {number} index
     * @param {*} records
     */
    updateValue (index, records) {
      const input = records.map((record) => {
        if (record.__new) {
          delete record.__new
        }
        return record
      })
      this.$emit('input', input)
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (Array.isArray(value)) {
          this.records = value.map((row) => {
            const id = row[this.primaryKey] || row.__uuid || uuid()
            return { ...row, __uuid: id }
          })
          return
        }
        this.records = []
      }
    }
  }
}
