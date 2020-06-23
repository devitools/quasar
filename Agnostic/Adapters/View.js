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
     * @param {string} name
     */
    provideBind (name) {
      if (!this.$options.schema) {
        throw new Error(`No schema defined to ${this.$options.name}`)
      }

      let provide = this.$memory.get(name)
      if (!provide) {
        provide = this.$options.schema.build().provide()
      }
      this.updateBind(provide)
      this.$memory.set(name, provide)
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
    const name = this.$options.name
    if (this.$memory.get(name)) {
      this.provideBind(name)
      return
    }

    window.setTimeout(() => this.provideBind(name), 1)
  }
}
