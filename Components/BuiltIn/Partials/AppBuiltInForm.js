import { SchemaForm } from '../../index'
import {
  APP_BUILT_IN_DEFAULT_TABLE_HEIGHT,
  APP_BUILT_IN_FORM_HEIGHT_COMPENSATION
} from '../settings'

/**
 * @component {AppBuiltInForm}
 */
export default {
  /**
   */
  extends: SchemaForm,
  /**
   */
  name: 'AppBuiltInForm',
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
      return ['SchemaForm', 'AppBuiltInForm', this.renderFormGroupingClass()]
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormWrapperClassNames () {
      return 'AppBuiltInForm__wrapper'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyClassNames () {
      return 'AppBuiltInForm__body'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyStyles () {
      return { height: `calc(${this.height} - ${APP_BUILT_IN_FORM_HEIGHT_COMPENSATION})` }
    },
    /**
     */
    actionBuiltInBack () {
      this.$emit('actionBuiltInBack')
    },
    /**
     */
    actionBuiltInCancel () {
      this.$emit('actionBuiltInCancel')
    },
    /**
     */
    actionBuiltInApply () {
      this.$emit('actionBuiltInApply')
    },
    /**
     * @param {Object} record
     */
    actionBuiltInDestroy (record) {
      this.$emit('actionBuiltInDestroy', record)
    }
  },
  watch: {
    value (value) {
      console.log('~> value', value)
      this.record = value
    }
  }
}
