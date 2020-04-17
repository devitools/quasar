import { SchemaTable } from 'src/app/Components/index'
import { POSITIONS, SCOPES } from 'src/app/Agnostic/enum'

/**
 * @component {AppBuiltInTable}
 */
export default {
  /**
   */
  extends: SchemaTable,
  /**
   */
  name: 'AppBuiltInTable',
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
      if (this.scope === SCOPES.SCOPE_TRASH) {
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
    actionBuiltInAdd () {
      this.$emit('actionBuiltInAdd')
    },
    /**
     * @param {Object} record
     */
    actionBuiltInEdit (record) {
      this.$emit('actionBuiltInEdit', record)
    },
    /**
     * @param {Object} record
     */
    actionBuiltInView (record) {
      this.$emit('actionBuiltInView', record)
    },
    /**
     * @param {Object} record
     */
    actionBuiltInDestroy (record) {
      this.$emit('actionBuiltInDestroy', record)
    }
  },
  /**
   * @param {function} h
   */
  render (h) {
    const data = { class: ['AppBuiltInTable'] }
    const children = [this.renderTable(h)]

    return h('div', data, children)
  }
}
