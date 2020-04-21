import { ignored } from '../../../../settings/action'

/**
 * @mixin {Button}
 */
export default {
  /**
   */
  data: () => ({
    buttons: {}
  }),
  /**
   */
  methods: {
    /**
     */
    renderButtons () {
      this.buttons = this.actions()
        .filter(this.buttonFilter)
        .sort(this.buttonSort)
        .reduce(this.buttonReduce, {})
    },
    /**
     * @param {Object} action
     * @returns {boolean}
     */
    buttonFilter (action) {
      if (!action.scopes && action.scopes.includes(this.scope)) {
        return false
      }
      if (!Array.isArray(ignored)) {
        return true
      }
      return !ignored.includes(action.$key)
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @returns {number}
     */
    buttonSort (a, b) {
      return a.order - b.order
    },
    /**
     * @param {Object} buttons
     * @param {Object} button
     * @returns {Object}
     */
    buttonReduce (buttons, button) {
      button.listeners = {}

      Object.keys(button.on).forEach(key => {
        button.listeners[key] = ($event, params) => this.triggerAction(button.$key, key, $event, params)
      })

      if (Array.isArray(button.actions)) {
        button.actions = button.actions.map((action) => {
          action.handler = action.click.bind(this)
          return action
        })
      }

      if (!button.attrs.label) {
        const paths = [
          `domains.${this.domain}.actions.${button.$key}.label`,
          `agnostic.actions.${button.$key}.label`,
          `agnostic.components.embed.actions.${button.$key}.label`,
          `agnostic.components.builtIn.actions.${button.$key}.label`
        ]
        button.attrs.label = this.$lang(paths, button.attrs.label)
      }

      if (!button.attrs.tooltip) {
        const paths = [
          `domains.${this.domain}.actions.${button.$key}.tooltip`,
          `agnostic.actions.${button.$key}.tooltip`,
          `agnostic.components.embed.actions.${button.$key}.tooltip`,
          `agnostic.components.builtIn.actions.${button.$key}.tooltip`
        ]
        button.attrs.tooltip = this.$lang(paths, button.attrs.tooltip)
      }

      buttons[button.$key] = button
      return buttons
    },
    /**
     * @param {string} $key
     * @param {string} event
     * @param {Object} $event
     * @param {*} parameters
     */
    triggerAction ($key, event, $event, parameters = {}) {
      if (this.triggerHook) {
        // trigger before action
        this.triggerHook(`before:${$key}.${event}`)
      }

      this.buttons[$key].on[event].call(this, { $event, ...parameters })

      if (!this.triggerHook) {
        return
      }
      // trigger after action
      this.triggerHook(`after:${$key}.${event}`)
    }
  }
}
