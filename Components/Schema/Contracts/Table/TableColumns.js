import { counter } from 'src/settings/schema'

/**
 * @mixin {TableColumns}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {string} ignore
     * @param {boolean} primaryKeyLast
     */
    renderColumns (ignore = undefined, primaryKeyLast = false) {
      const fields = this.fields()
      const columns = Object
        .values(fields)
        .filter((field) => this.columnsFilter(field, ignore))
        .reduce((accumulator, field) => this.columnsReduce(accumulator, field), [])
        .sort((a, b) => this.columnsSort(a, b, primaryKeyLast))

      /** @counter */
      columns.unshift(counter)
      this.columns = columns
      this.visibleColumns = this.columns.filter(column => !column.hidden).map(column => column.name)
    },
    /**
     * @param {Object} field
     * @param {string} ignore
     * @return {boolean}
     */
    columnsFilter (field, ignore) {
      if (field.$layout.tableFilter) {
        return false
      }
      return field[ignore] !== true
    },
    /**
     * @param {Array} accumulator
     * @param {Object} field
     * @return {*}
     */
    columnsReduce (accumulator, field) {
      const label = this.parseFieldLabel(field)
      const options = this.parseFieldOptions(field)
      accumulator.push({
        label: label,
        options: options,
        $remoteKey: field.$layout.tableRemoteKey || field.$key,
        $type: field.$type,
        name: field.$layout.tableName || field.$key,
        field: field.$key,
        $primaryKey: field.$primaryKey,
        required: field.$layout.tableRequired,
        style: `width: ${field.$layout.tableWidth}`,
        align: field.$layout.tableAlign || 'left',
        sortable: field.$layout.tableSortable,
        format: field.$layout.tableFormat ? field.$layout.tableFormat.bind(this) : undefined,
        classes: [`$key-${field.$key}`, field.attrs.uppercase ? 'text-uppercase' : ''],
        hidden: field.$layout.tableHidden,
        __order: field.$layout.tableOrder
      })
      return accumulator
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @param {boolean} primaryKeyLast
     * @return {number}
     */
    columnsSort (a, b, primaryKeyLast) {
      if (primaryKeyLast && b.$primaryKey) {
        return -1
      }
      if (a.__order < b.__order) {
        return -1
      }
      if (a.__order > b.__order) {
        return 1
      }
      return 0
    },
    /**
     */
    configure () {
      Object.keys(this.columns).forEach((key) => {
        const field = this.columns[key]
        if (!(field.$configure && typeof field.$configure === 'function')) {
          return
        }
        const configured = field.$configure.call(this, this.columns[key], this.scope)
        if (!configured || configured.$key !== field.$key) {
          throw Error('The configure return must be the field')
        }
        this.columns[key] = configured
      })
    }
  }
}
