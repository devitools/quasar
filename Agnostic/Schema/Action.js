export default {
  /**
   * @param {Array} scopes
   * @returns {Schema|Skeleton}
   */
  actionScopes (scopes) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes = scopes
    }
    return this
  },

  /**
   * @param {Array} levels
   * @returns {Schema|Skeleton}
   */
  actionLevels (levels) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].levels = levels
    }
    return this
  },

  /**
   * @param {string} namespace
   * @returns {Schema|Skeleton}
   */
  actionNamespace (namespace) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].namespace = namespace
    }
    return this
  },

  /**
   * @param {Array} positions
   * @returns {Schema|Skeleton}
   */
  actionPositions (positions) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].positions = positions
    }
    return this
  },

  /**
   * @param {string} scope
   * @returns {Schema|Skeleton}
   */
  actionScopeJust (scope) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes = [scope]
    }
    return this
  },

  /**
   * @param {string} scope
   * @returns {Schema|Skeleton}
   */
  actionScopeExcept (scope) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes = this.scopes.filter(item => item !== scope)
    }
    return this
  },

  /**
   * @param {Number} order
   * @returns {Schema|Skeleton}
   */
  actionOrder (order) {
    const id = this.__currentAction
    Object.keys(this.__actions).forEach((key) => {
      if (key === this.__currentAction) {
        return
      }
      const action = this.__actions[key]
      if (action.order < order) {
        return
      }
      action.order = action.order + 1
    })
    if (this.__actions[id]) {
      this.__actions[id].order = order
    }
    return this
  },

  /**
   * @param {string} label
   * @returns {Schema|Skeleton}
   */
  actionLabel (label = '') {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.label = label
    }
    return this
  },

  /**
   * @param {string} icon
   * @returns {Schema|Skeleton}
   */
  actionIcon (icon = '') {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.icon = icon
    }
    return this
  },

  /**
   * @param {string} tooltip
   * @returns {Schema|Skeleton}
   */
  actionTooltip (tooltip = '') {
    const id = this.__currentAction
    this.__actions[id].attrs.tooltip = this.$lang(tooltip)
    return this
  },

  /**
   * @param {string} color
   * @returns {Schema|Skeleton}
   */
  actionColor (color = '') {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.color = color
    }
    return this
  },

  /**
   * @param {string} textColor
   * @returns {Schema|Skeleton}
   */
  actionTextColor (textColor = '') {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.textColor = textColor
    }
    return this
  },

  /**
   * @param {Boolean} disabled
   * @returns {Schema|Skeleton}
   */
  actionDisabled (disabled = true) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.disabled = disabled
    }
    return this
  },

  /**
   * @returns {Schema|Skeleton}
   */
  actionFloatRight () {
    return this.actionAddClassName('button-position-right')
  },

  /**
   * @returns {Schema|Skeleton}
   */
  actionFloatLeft () {
    return this.actionAddClassName('button-position-left')
  },

  /**
   * @returns {Schema|Skeleton}
   */
  actionNoMinWidth () {
    return this.actionAddClassName('button-no-min-width')
  },

  /**
   * @param {string} className
   * @returns {Schema|Skeleton}
   */
  actionAddClassName (className) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      if (!this.__actions[id].class) {
        this.__actions[id].class = []
      }
      this.__actions[id].class.push(className)
    }
    return this
  },

  /**
   * @param {Boolean} hidden
   * @returns {Schema|Skeleton}
   */
  actionHidden (hidden = true) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].hidden = hidden
    }
    return this
  },

  /**
   * @param {Array} actions
   * @returns {Schema|Skeleton}
   */
  actionDropdown (actions) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].dropdown = true
      if (!Array.isArray(actions)) {
        actions = []
      }
      this.__actions[id].actions = actions
    }
    return this
  },

  /**
   * @param {function} validate
   * @returns {Schema|Skeleton}
   */
  actionValidate (validate) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].validate = validate
    }
    return this
  },

  /**
   * @param {function} configure
   * @returns {Schema|Skeleton}
   */
  actionConfigure (configure) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].configure = configure
    }
    return this
  },

  /**
   * @param {string} event
   * @param {function} handler
   * @returns {Schema|Skeleton}
   */
  actionOn (event, handler) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].on[event] = handler
    }
    return this
  }
}
