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
          const provide = schema.build(this, dependencies).provide()
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
          const provide = schema.build(this, dependencies).provide()
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
    SchemaTable () {
      return {
        // The component to load (should be a Promise)
        component: new Promise(function (resolve) {
          resolve({
            extends: SchemaTableAsync,
            createdHook () {
              const provide = this.$parent.$options.schema.build(this).provide()
              this.configureProvide(provide)
            }
          })
        }),
        // A component to use while the async component is loading
        loading: () => import('../../Components/Schema/SkeletonSchemaTable.vue'),
        // A component to use if the load fails
        // error: ErrorComponent,
        // Delay before showing the loading component. Default: 200ms.
        delay: 1,
        // The error component will be displayed if a timeout is
        // provided and exceeded. Default: Infinity.
        timeout: 3000
      }
    },
    /**
     * SchemaForm async component
     */
    SchemaForm () {
      return {
        // The component to load (should be a Promise)
        component: new Promise(function (resolve) {
          resolve({
            extends: SchemaFormAsync,
            createdHook () {
              const provide = this.$parent.$options.schema.build(this).provide()
              this.configureProvide(provide)
            }
          })
        }),
        // A component to use while the async component is loading
        loading: () => import('../../Components/Schema/SkeletonSchemaForm.vue'),
        // A component to use if the load fails
        // error: ErrorComponent,
        // Delay before showing the loading component. Default: 200ms.
        delay: 1,
        // The error component will be displayed if a timeout is
        // provided and exceeded. Default: Infinity.
        timeout: 3000
      }
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
