import { SchemaForm } from '../../index'
import {
  APP_BUILT_IN_DEFAULT_TABLE_HEIGHT,
  APP_BUILT_IN_FORM_HEIGHT_COMPENSATION
} from '../settings'

/**
 * @component {AppBuiltinForm}
 */
export default {
  /**
   */
  extends: SchemaForm,
  /**
   */
  name: 'AppBuiltinForm',
  /**
   */
  props: {
    height: {
      type: String,
      default: APP_BUILT_IN_DEFAULT_TABLE_HEIGHT
    }
  },
  /**
   */
  methods: {
    /**
     * @return {string|Array|Object}
     */
    renderFormClassNames () {
      return ['SchemaForm', 'AppBuiltinForm', this.renderFormGroupingClass()]
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormWrapperClassNames () {
      return 'AppBuiltinForm__wrapper'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyClassNames () {
      return 'AppBuiltinForm__body'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyStyles () {
      return { height: `calc(${this.height} - ${APP_BUILT_IN_FORM_HEIGHT_COMPENSATION})` }
    },
    /**
     */
    actionBuiltinBack () {
      this.$emit('actionBuiltinBack')
    },
    /**
     */
    actionBuiltinCancel () {
      this.$emit('actionBuiltinCancel')
    },
    /**
     */
    actionBuiltinApply () {
      this.$emit('actionBuiltinApply')
    },
    /**
     * @param {Object} record
     */
    actionBuiltinDestroy (record) {
      this.$emit('actionBuiltinDestroy', record)
    }
  },
  watch: {
    value (value) {
      this.record = value
      this.showPlaceholderContent = false
    }
  }
}
