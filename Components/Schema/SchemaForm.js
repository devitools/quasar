// noinspection ES6CheckImport
import { QPage } from 'quasar'

import Dynamic from 'src/app/Components/Schema/Contracts/Dynamic'
import Form from 'src/app/Components/Schema/Contracts/Form'
import Group from 'src/app/Components/Schema/Contracts/Group'
// mixins
import SchemaBody from 'src/app/Components/Schema/Form/Mixins/SchemaFormBody'
// components
import SchemaDebugger from 'src/app/Components/Schema/Debugger/SchemaDebugger'
// app
import { POSITIONS } from 'src/app/Agnostic/enum'

/**
 * @component {SchemaForm}
 */
export default {
  /**
   */
  name: 'SchemaForm',
  /**
   */
  component: QPage,
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

      return h('div', [
        h(SchemaDebugger, { attrs: { label: 'Validation', inspect: this.$v } }),
        h(SchemaDebugger, { attrs: { label: 'Record', inspect: this.record } }),
        h(SchemaDebugger, { attrs: { label: 'Components', inspect: this.components } }),
        h(SchemaDebugger, { attrs: { label: 'Buttons', inspect: this.buttons } })
      ])
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
      return { padding: true }
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
    }
  },
  /**
   * @param {function} h
   */
  render (h) {
    const data = {
      class: this.renderFormClassNames(),
      style: this.renderFormStyles(),
      attrs: this.renderFormAttributes()
    }
    const children = [this.renderForm(h)]
    if (this.debuggerAllowed) {
      children.push(this.renderFormDebuggers(h))
    }

    return h(this.$options.component, data, children)
  }
}
