import SchemaTableAsync from '../../Components/Schema/SchemaTableAsync'
import SchemaFormAsync from '../../Components/Schema/SchemaFormAsync'

/**
 * @param {Schema} schema
 * @param {Record<string, unknown>} dependencies
 * @return {{SchemaTableAsync: Function}}
 */
export function table (schema, dependencies = {}) {
  return {
    SchemaTableAsync: function (resolve) {
      resolve({
        extends: SchemaTableAsync,
        createdHook () {
          const provide = (schema || this.$parent.$options.schema).build(this, dependencies).provide()
          this.configureProvide(provide)
        }
      })
    }
  }
}

/**
 * @param {Schema} schema
 * @param {Record<string, unknown>} dependencies
 * @return {{SchemaFormAsync: Function}}
 */
export function form (schema, dependencies = {}) {
  return {
    SchemaFormAsync: function (resolve) {
      resolve({
        extends: SchemaFormAsync,
        createdHook () {
          const provide = (schema || this.$parent.$options.schema).build(this, dependencies).provide()
          this.configureProvide(provide)
        }
      })
    }
  }
}

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
  components: {
    /**
     * SchemaTable async component
     */
    SchemaTable (resolve) {
      resolve({
        extends: SchemaTableAsync,
        createdHook () {
          const provide = this.$parent.$options.schema.build(this).provide()
          this.configureProvide(provide)
        }
      })
    },
    /**
     * SchemaForm async component
     */
    SchemaForm (resolve) {
      resolve({
        extends: SchemaFormAsync,
        createdHook () {
          const provide = this.$parent.$options.schema.build(this).provide()
          this.configureProvide(provide)
        }
      })
    }
  },
  /**
   */
  data () {
    return {
      bind: {
        scope: this.$route.meta.scope,
        path: this.path
      }
    }
  }
}
