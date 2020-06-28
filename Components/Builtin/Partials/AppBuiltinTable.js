import { SchemaTable } from '../../index'
import { POSITIONS, SCOPES_BUILTIN } from '../../../Agnostic/enum'

/**
 * @component {AppBuiltinTable}
 */
export default {
  /**
   */
  extends: SchemaTable,
  /**
   */
  name: 'AppBuiltinTable',
  /**
   */
  props: {
    height: {
      type: String,
      default: '400px'
    }
  },
  /**
   */
  methods: {
    /**
     * @param {function} h
     * @param {Object} props
     * @returns {*}
     */
    renderTableTop (h, props) {
      return [
        this.renderSchemaButtonsCompact(h, POSITIONS.POSITION_TABLE_TOP, { records: this.selected })
      ]
    },
    /**
     * @param {function} h
     * @param {Array} classes
     * @param {boolean} embed
     * @returns {*}
     */
    renderTable (h, classes = ['SchemaTable'], embed = false) {
      if (this.scope === SCOPES_BUILTIN.SCOPE_BUILTIN_TRASH) {
        classes.push('trash')
      }

      const attrs = this.renderTableAttrs()

      const props = this.renderTableProps()

      const style = { height: this.height }

      const scopedSlots = this.renderTableSlots(h)

      const on = this.renderTableOn()

      return h('AppTable', { class: classes, props, attrs, style, scopedSlots, on })
    },
    /**
     */
    actionBuiltinAdd () {
      this.$emit('actionBuiltinAdd')
    },
    /**
     * @param {Object} record
     */
    actionBuiltinEdit (record) {
      this.$emit('actionBuiltinEdit', record)
    },
    /**
     * @param {Object} record
     */
    actionBuiltinView (record) {
      this.$emit('actionBuiltinView', record)
    },
    /**
     * @param {Object} record
     */
    actionBuiltinDestroy (record) {
      this.$emit('actionBuiltinDestroy', record)
    }
  },
  /**
   * @param {function} h
   */
  render (h) {
    const data = { class: ['AppBuiltinTable'] }
    const children = [
      this.renderTable(h)
    ]

    return h('div', data, children)
  }
}
