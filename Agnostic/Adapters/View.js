import provided from './provided'

/**
 * @mixin {View}
 */
export default {
  /**
   */
  data () {
    return {
      bind: {
        key: this.$util.uuid(),
        scope: this.$route.meta.scope,
        groupType: '',
        path: '',
        domain: '',
        primaryKey: '',
        displayKey: '',
        settings: {},
        table: {},
        form: {},
        hooks: () => ({}),
        groups: () => ({}),
        fields: () => ({}),
        actions: () => ([]),
        watches: () => ([])
      }
    }
  },
  /**
   */
  methods: {
    /**
     * @param provide
     */
    updateBind (provide) {
      this.bind = {
        key: this.$util.uuid(),
        scope: this.$route.meta.scope,
        ...provide
      }
    },
    /**
     */
    provideBind (schema) {
      if (!this.$options.schema) {
        throw new Error(`No schema defined to ${this.$options.name}`)
      }

      if (provided[schema]) {
        this.updateBind(provided[schema])
        return
      }

      const provide = this.$options.schema.build().provide()
      provided[schema] = provide
      this.updateBind(provide)
    }
  },
  /**
   */
  watch: {
    '$route.fullPath' () {
      if (this.schema) {
        this.construct()
      }
    }
  },
  /**
   */
  created () {
    const schema = this.$options.schema.name
    const timeout = provided[schema] ? 100 : 300
    const handler = () => {
      try {
        this.provideBind(schema)
      } catch (e) {
      }
    }
    window.setTimeout(handler, timeout)
  }
}
