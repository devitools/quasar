import { QIcon, QSeparator, QTab, QTabPanel, QTabPanels, QTabs } from 'quasar'
import $emporium from '../../../../emporium'
import SchemaComponents from '../SchemaFormComponents'

let counter = 0

/**
 * @mixin {SchemaFormBody}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {function} h
     * @param {Object} fields
     * @returns {*}
     */
    renderFormBodyComponents (h, fields) {
      const data = {
        ref: `formBody-${counter++}`,
        domProps: { value: this.record },
        props: {
          value: this.record,
          domain: this.domain,
          inheritErrors: this.inheritErrors,
          useFormReadonly: this.useFormReadonly,
          schema: this.schema
        },
        attrs: { fields: fields, errors: this.errors, validations: this.$v },
        on: { input: this.receiveInput }
      }

      return h(SchemaComponents, data)
    },
    /**
     * @param {function} h
     * @param {Object} groups
     * @returns {*}
     */
    renderFormBodySections (h, groups) {
      const children = []
      Object.keys(groups).forEach((key) => {
        const data = {
          key: key,
          class: 'app-form-body with-section'
        }

        const group = groups[key]
        const kid = this.renderFormBodySection(h, key, group)
        if (!kid) {
          return
        }
        children.push(h('div', data, [kid]))
      })
      return children
    },
    /**
     * @param {function} h
     * @param {string} key
     * @param {Object} group
     * @returns {*}
     */
    renderFormBodySection (h, key, group) {
      const { label, icon, hidden } = group
      const _title = (span, icon) => {
        const data = { class: 'app-form-section-title' }
        const children = [h('span', span)]
        if (icon) {
          children.unshift(h(QIcon, { attrs: { name: icon } }))
        }

        return h('div', data, children)
      }

      const components = this.getComponents(key)
      if (!components) {
        return
      }

      const entries = Object.entries(components)
      const visible = entries.reduce((accumulator, entry) => {
        const [, field] = entry
        const { $layout: { formHidden } } = field
        if (formHidden === false) {
          accumulator++
        }
        return accumulator
      }, 0)

      const style = (hidden || visible === 0) ? 'display: none' : ''
      const data = { key: `${key}-section`, class: 'app-form-section', style }
      const children = [_title(label, icon), this.renderFormBodyComponents(h, components)]

      return h('div', data, children)
    },
    /**
     * @param h
     * @param groups
     * @return {*[]}
     */
    renderFormBodyTabs (h, groups) {
      const tabs = []
      const panes = []
      Object.entries(groups).forEach((entry) => {
        const [key, group] = entry
        const { hidden, label, pane } = group

        const components = this.getComponents(key)
        if (!components) {
          return
        }

        const entries = Object.entries(components)
        const visible = entries.reduce((accumulator, entry) => {
          const [, field] = entry
          const { $layout: { formHidden } } = field
          if (formHidden === false) {
            accumulator++
          }
          return accumulator
        }, 0)

        if (hidden || visible === 0) {
          return
        }

        if (!this.groupSelected) {
          this.groupSelected = key
        }

        const tab = {
          attrs: {
            key: key,
            name: key,
            slot: 'title',
            label: label
          }
        }
        tabs.push(h(QTab, tab))

        const data = {
          style: pane,
          attrs: {
            key: key,
            name: key
          }
        }
        const children = [
          this.renderFormBodyComponents(h, this.getComponents(key))
        ]
        panes.push(h(QTabPanel, data, children))
      })

      const tabsData = {
        domProps: { value: this.groupSelected },
        prop: { value: this.groupSelected },
        on: { input: ($event) => { this.groupSelected = $event } },
        attrs: {
          value: this.groupSelected,
          color: 'primary',
          swipeable: true,
          align: 'justify'
        }
      }

      const panelsData = {
        domProps: { value: this.groupSelected },
        prop: { value: this.groupSelected },
        on: { input: ($event) => { this.groupSelected = $event } },
        attrs: {
          value: this.groupSelected,
          animated: true,
          keepAlive: true
        }
      }

      return [h(QTabs, tabsData, tabs), h(QSeparator), h(QTabPanels, panelsData, panes)]
    },
    /**
     * @receiveInput {SchemaForm.@mixin:SchemaBody}
     * @param {field} field
     * @param {*} value
     */
    receiveInput ({ field, value }) {
      this.record[field] = value

      if (!this.builtin && this.settings.useModified) {
        $emporium.commit('updateModified', true)
      }

      if (this.errors.hasOwnProperty(field)) {
        delete this.errors[field]
      }

      if (this.inheritErrors[field]) {
        this.inheritErrors[field] = undefined
      }

      this.$emit('input', this.record)
    }
  }
}
