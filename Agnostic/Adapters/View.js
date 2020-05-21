/**
 * @mixin {View}
 */
export default {
  /**
   */
  props: {
    path: {
      type: String,
      default: undefined
    }
  },
  /**
   */
  data () {
    return {
      bind: {
        key: this.$util.uuid(),
        scope: this.$route.meta.scope,
        schema: undefined,
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
      const props = {}
      if (this.path) {
        props.path = this.path
      }

      this.bind = {
        ...this.bind,
        key: this.$util.uuid(),
        scope: this.$route.meta.scope,
        ...provide,
        ...props,
        schema: this.$options.name
      }
    },
    /**
     */
    provideBind (schema) {
      if (!this.$options.schema) {
        throw new Error(`No schema defined to ${this.$options.name}`)
      }

      if (this.$memory.get(schema)) {
        this.updateBind(this.$memory.get(schema))
        return
      }

      const provide = this.$options.schema.build().provide()
      this.$memory.set(schema, provide)
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
    const schema = this.$options.name
    if (this.$memory.get(schema)) {
      this.provideBind(schema)
      return
    }

    window.setTimeout(() => this.provideBind(schema), 100)
  }
}
