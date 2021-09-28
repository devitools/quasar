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
        scope: this.$route.meta.scope ?? '',
        path: '',
        domain: '',
        schemata: []
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
        schema: this.$options.name,
        ...this.$attrs
      }
    },
    /**
     */
    provideBind () {
      if (!this.$options.schema) {
        throw new Error(`No schema defined to ${this.$options.name}`)
      }

      const name = this.$options.name
      let provide = this.$memory.get(name)
      if (!provide) {
        provide = this.$options.schema.build().provideWizard()
      }

      this.updateBind(provide)
      this.$memory.set(name, provide)
    }
  },
  /**
   */
  created () {
    window.setTimeout(() => this.provideBind(), 1)
  }
}
