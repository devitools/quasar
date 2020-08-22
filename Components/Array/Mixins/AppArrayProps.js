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
      type: Function,
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
    optimize: {
      type: Boolean,
      default: false
    },
    useUuid: {
      type: Boolean,
      default: false
    },
    hooks: {
      type: Function,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    static: {
      type: Boolean,
      default: false
    },
    debuggerAllowed: {
      type: Boolean,
      default: false
    },
    inheritErrors: {
      type: Object,
      default: () => ({})
    }
  }
}
