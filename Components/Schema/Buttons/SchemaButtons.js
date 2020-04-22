// noinspection ES6CheckImport
import { QFab, QPageSticky } from 'quasar'
// app
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
    type: {
      type: String,
      default: 'default'
    },
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
        .sort(this.sortButton)
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
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @returns {number}
     */
    sortButton (a, b) {
      return a.order - b.order
    },
    /**
     * @param {function} h
     * @param {Object} attrs
     * @return {VNode[]}
     */
    getSchemaButtonsActions (h, attrs = {}) {
      return Object
        .values(this.actions)
        .map((button) => this.renderButton(h, { ...button, ...attrs }))
    },
    /**
     * @param {function} h
     * @return {VNode}
     */
    produceSchemaButtonsDefault (h) {
      const data = { class: 'app-form-buttons' }
      const children = this.getSchemaButtonsActions(h)
      return h('div', data, children)
    },
    /**
     * @param {function} h
     * @return {VNode}
     */
    produceSchemaButtonsFabInline (h) {
      return h(
        QFab, {
          class: 'q-fab-cell',
          attrs: {
            direction: 'right',
            icon: 'add'
          }
        },
        this.getSchemaButtonsActions(h, { __floating: true })
      )
    },
    /**
     * @param {function} h
     * @return {VNode}
     */
    produceSchemaButtonsFabBottom (h) {
      const data = {
        attrs: {
          position: 'bottom-right',
          offset: [20, 60]
        }
      }
      const children = [
        h(
          QFab, {
            attrs: {
              direction: 'up',
              icon: 'apps',
              color: 'primary'
            }
          },
          this.getSchemaButtonsActions(h, { __floating: true })
        )
      ]
      return h(QPageSticky, data, children)
    }
  },
  /**
   * @param {function} h
   */
  render (h) {
    if (this.type === 'fab-cell') {
      return this.produceSchemaButtonsFabInline(h)
    }

    if (this.type === 'fab-bottom') {
      return this.produceSchemaButtonsFabBottom(h)
    }

    return this.produceSchemaButtonsDefault(h)
  }
}
