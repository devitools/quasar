// app
import { POSITIONS } from '../../Agnostic/enum'
// contracts
import Dynamic from './Contracts/Dynamic'
import Form from './Contracts/Form'
import Group from './Contracts/Group'
// mixins
import SchemaBody from './Form/Mixins/SchemaFormBody'
// components
import SkeletonSchemaForm from './SkeletonSchemaForm'
import SchemaDebugger from './Debugger/SchemaDebugger'

/**
 * @component {SchemaForm}
 */
export default {
  /**
   */
  name: 'SchemaForm',
  /**
   */
  mixins: [Dynamic, Form, Group, SchemaBody],
  /**
   */
  data: () => ({
    groupSelected: ''
  }),
  /**
   */
  methods: {
    /**
     * @param {function} h
     * @returns {VNode}
     */
    renderForm (h) {
      const data = { class: this.renderFormWrapperClassNames(), style: this.renderFormWrapperStyles() }
      const children = [
        this.renderFormBody(h),
        this.renderSchemaButtons(h, POSITIONS.POSITION_FORM_FOOTER, { record: this.record })
      ]

      return h('div', data, children)
    },
    /**
     * @param {function} h
     * @returns {VNode}
     */
    renderFormBody (h) {
      if (this.$scopedSlots['form-body']) {
        // noinspection JSValidateTypes
        return this.$scopedSlots['form-body']({
          domain: this.domain,
          scope: this.scope,
          components: this.getComponents(''),
          record: this.record
        })
      }

      const data = { class: this.renderFormBodyClassNames(), style: this.renderFormBodyStyles() }

      const children = [
        this.renderFormBodyComponents(h, this.getComponents())
      ]
      if (this.hasSections) {
        children.push(this.renderFormBodySections(h, this.grouping))
      }
      if (this.hasTabs) {
        children.push(this.renderFormBodyTabs(h, this.grouping))
      }

      return h('div', data, children)
    },
    /**
     * @param {function} h
     */
    renderFormDebuggers (h) {
      if (!this.debuggers) {
        return
      }

      const debugging = [
        h(SchemaDebugger, { attrs: { label: 'Validation', inspect: this.$v } }),
        h(SchemaDebugger, { attrs: { label: 'Record', inspect: this.record } }),
        h(SchemaDebugger, { attrs: { label: 'Components', inspect: this.components } }),
        h(SchemaDebugger, { attrs: { label: 'Buttons', inspect: this.buttons } })
      ]

      return h('div', debugging)
    },
    /**
     * @return {string}
     */
    renderFormGroupingClass () {
      if (this.hasSections) {
        return 'SchemaForm--with-sections'
      }
      if (this.hasTabs) {
        return 'SchemaForm--with-tabs'
      }
      return ''
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormClassNames () {
      return ['SchemaForm', this.renderFormGroupingClass()]
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormStyles () {
      return ''
    },
    /**
     * @return {Object}
     */
    renderFormAttributes () {
      return {}
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormWrapperClassNames () {
      return 'app-form-wrapper'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormWrapperStyles () {
      return ''
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyClassNames () {
      return 'app-form-body'
    },
    /**
     * @return {string|Array|Object}
     */
    renderFormBodyStyles () {
      return ''
    },
    /**
     * @param {function} h
     * @return {VNode}
     */
    renderLoading (h) {
      if (this.$scopedSlots['loading']) {
        // noinspection JSValidateTypes
        return this.$scopedSlots['loading']({ scope: this.scope })
      }
      return h(SkeletonSchemaForm)
    }
  },
  /**
   * @param {function} h
   */
  render (h) {
    if (!this.domain) {
      return this.renderLoading(h)
    }

    const data = {
      class: this.renderFormClassNames(),
      style: this.renderFormStyles(),
      attrs: this.renderFormAttributes()
    }
    const children = [
      this.renderForm(h)
    ]
    if (this.debuggerAllowed) {
      children.push(this.renderFormDebuggers(h))
    }

    return h('div', data, children)
  }
}
