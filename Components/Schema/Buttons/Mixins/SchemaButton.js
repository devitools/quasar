// noinspection ES6CheckImport
import { QTooltip } from 'quasar'

import SchemaButtonDropdown from '../Renders/SchemaButtonDropdown'
import SchemaButtonFloating from '../Renders/SchemaButtonFloating'
import SchemaButtonSingle from '../Renders/SchemaButtonSingle'

/**
 * @mixin {SchemaButton}
 */
export default {
  /**
   */
  mixins: [
    SchemaButtonDropdown, SchemaButtonFloating, SchemaButtonSingle
  ],
  /**
   */
  methods: {
    /**
     * @param {string} key
     */
    buttonRef (key) {
      return `form:button-${key}`
    },
    /**
     * @param {function} h
     * @param {Object} button
     * @returns {*}
     */
    renderButton (h, button) {
      if (button.hidden) {
        return
      }

      const data = {
        key: button.$key,
        ref: button.reference ? this.buttonRef(button.reference) : undefined,
        class: button.class,
        domProps: { name: button.$key },
        attrs: { ...button.attrs },
        on: { ...button.listeners },
        style: button.style
      }
      const children = []
      if (button.attrs.tooltip) {
        const props = {
          'transition-show': 'show',
          'content-style': 'font-size: 0.8rem',
          'content-class': 'bg-white text-accent shadow-4 q-pt-sm q-pb-sm q-pl-md q-pr-md',
          anchor: 'top middle',
          self: 'top middle',
          offset: [20, 40]
        }
        const data = { props }
        children.push(h(QTooltip, data, button.attrs.tooltip))
      }
      if (button.dropdown) {
        return this.renderButtonDropdown(h, data)
      }
      if (button.__floating) {
        return this.renderButtonFloating(h, data, children)
      }
      return this.renderButtonSingle(h, data, children)
    }
  }
}
