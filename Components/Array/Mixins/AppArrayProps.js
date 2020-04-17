import { primaryKey } from 'src/settings/schema'

export default {
  /**
   */
  props: {
    domain: {
      type: String,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      default: () => ([])
    },
    primaryKey: {
      type: String,
      default: primaryKey
    },
    disable: {
      type: Boolean,
      default: undefined
    },
    optimize: {
      type: Boolean,
      default: false
    },
    useUuid: {
      type: Boolean,
      default: false
    }
  }
}
