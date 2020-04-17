// noinspection ES6CheckImport
import { QFab, QPageSticky } from 'quasar'

// app
import { POSITIONS } from '../../../Agnostic/enum'
// mixins
import SchemaButton from './Mixins/SchemaButton'
import SchemaButtonParse from './Mixins/SchemaButtonParse'

/**
 * @component {SchemaButtons}
 */
export default {
  name: 'SchemaButtons',
  /**
   */
  mixins: [
    SchemaButtonParse, SchemaButton
  ],
  /**
   */
  props: {
    buttons: {
      type: [Array, Object],
      default: () => ([])
    },
    position: {
      type: String,
      default: ''
    },
    scope: {
      type: String,
      default: ''
    },
    context: {
      type: Object,
      default: undefined
    },
    override: {
      type: Object,
      default: () => ({})
    },
    locked: {
      default: false
    }
  },
  /**
   */
  computed: {
    /**
     */
    actions () {
      return Object.values(this.buttons)
        .filter(this.filterButton)
        .map(this.parseButton)
    }
  },
  methods: {
    /**
     * @param {Object} button
     * @returns {boolean}
     */
    filterButton (button) {
      return button.scopes && button.scopes.includes(this.scope) && button.positions && button.positions.includes(this.position)
    }
  },
  /**
   * @param {function} h
   */
  render (h) {
    if (this.position !== POSITIONS.POSITION_TABLE_FLOAT) {
      const data = {
        class: 'app-form-buttons'
      }
      const children = Object.values(this.actions).map((button) => this.renderButton(h, button))

      return h('div', data, children)
    }

    const settings = { attrs: { direction: 'up', icon: 'apps', color: 'primary' } }
    const buttons = Object
      .values(this.actions)
      .map((button) => this.renderButton(h, { ...button, __floating: true }))

    const children = [
      h(QFab, settings, buttons)
    ]
    const data = {
      attrs: {
        position: 'bottom-right',
        offset: [20, 60]
      }
    }
    return h(QPageSticky, data, children)
  }
}
