export default {
  /**
   * @param {Number|String} tableWidth
   * @returns {Schema|Skeleton}
   */
  fieldTableWidth (tableWidth) {
    return this.setLayout({ tableWidth })
  },

  /**
   * @param {Boolean} show
   * @returns {Schema|Skeleton}
   */
  fieldTableShow (show = true) {
    return this.setLayout({ tableHidden: !show })
  },

  /**
   * @param {string} tableWhere
   * @returns {Schema|Skeleton}
   */
  fieldTableWhere (tableWhere = 'automatic') {
    return this.setLayout({ tableWhere })
  },

  /**
   * @param {string} fieldTableWhereOperator
   * @returns {Schema|Skeleton}
   */
  fieldTableWhereOperator (fieldTableWhereOperator) {
    return this.setLayout({ fieldTableWhereOperator })
  },

  /**
   * @param {function} tableFilter
   * @returns {Schema|Skeleton}
   */
  fieldTableFilter (tableFilter) {
    return this.setLayout({ tableFilter })
  },

  /**
   * @param {Boolean} tableRequired
   * @returns {Schema|Skeleton}
   */
  fieldTableRequired (tableRequired) {
    return this.setLayout({ tableRequired })
  },

  /**
   * @param {string} tableName
   * @returns {Schema|Skeleton}
   */
  fieldTableName (tableName) {
    return this.setLayout({ tableName })
  },

  /**
   * @param {string} tableAlign
   * @returns {Schema|Skeleton}
   */
  fieldTableAlign (tableAlign) {
    return this.setLayout({ tableAlign })
  },

  /**
   * @param {Boolean} tableSortable
   * @returns {Schema|Skeleton}
   */
  fieldTableSortable (tableSortable) {
    return this.setLayout({ tableSortable })
  },

  /**
   * @param {function} tableFormat
   * @returns {Schema|Skeleton}
   */
  fieldTableFormat (tableFormat) {
    return this.setLayout({ tableFormat })
  },

  /**
   * @param {Number} order
   * @param {boolean} updateOthers
   * @returns {Schema|Skeleton}
   */
  fieldTableOrder (order, updateOthers = false) {
    this.setLayout({ tableOrder: order })
    if (updateOthers) {
      this.__fieldOrderUpdate('tableOrder', order)
    }
    return this
  }
}
