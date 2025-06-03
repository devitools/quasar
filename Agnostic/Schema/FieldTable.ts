import Base from '../Base'

import { fieldsReorder } from '../Helper'
import { OPERATORS } from '../../Agnostic/enum'

/**
 * @class {FieldTable}
 */
export default abstract class FieldTable extends Base {
  /**
   * @param {number | string} tableWidth
   * @return {Schema}
   */
  fieldTableWidth (tableWidth: number | string): this {
    return this.setLayout({ tableWidth })
  }

  /**
   * @param {Boolean} show
   * @return {Schema}
   */
  fieldTableShow (show = true): this {
    return this.setLayout({ tableHidden: !show })
  }

  /**
   * @param {string|null} tableWhere
   * @param {string} tableWhereComponent
   * @return {Schema}
   */
  fieldTableWhere (tableWhere: string | null = OPERATORS.AUTOMATIC, tableWhereComponent?: unknown): this {
    return this.setLayout({ tableWhere, tableWhereComponent })
  }

  /**
   * @param {string} fieldTableWhereOperator
   * @return {Schema}
   */
  fieldTableWhereOperator (fieldTableWhereOperator: string): this {
    return this.setLayout({ fieldTableWhereOperator })
  }

  /**
   * @param {Function} tableFilter
   * @return {Schema}
   */
  fieldTableFilter (tableFilter: Function): this {
    return this.setLayout({ tableFilter })
  }

  /**
   * @param {boolean} tableRequired
   * @return {Schema}
   */
  fieldTableRequired (tableRequired: boolean): this {
    return this.setLayout({ tableRequired })
  }

  /**
   * @param {string} tableName
   * @return {Schema}
   */
  fieldTableName (tableName: string): this {
    return this.setLayout({ tableName })
  }

  /**
   * @param {string} tableAlign
   * @return {Schema}
   */
  fieldTableAlign (tableAlign: string): this {
    return this.setLayout({ tableAlign })
  }

  /**
   * @param {boolean} tableSortable
   * @return {Schema}
   */
  fieldTableSortable (tableSortable: boolean): this {
    return this.setLayout({ tableSortable })
  }

  /**
   * @param {Function} tableFormat
   * @return {Schema}
   */
  fieldTableFormat (tableFormat: Function): this {
    return this.setLayout({ tableFormat })
  }

  /**
   * @param {number} order
   * @param {boolean} updateOthers
   * @return {Schema}
   */
  fieldTableOrder (order: number, updateOthers = false): this {
    this.setLayout({ tableOrder: order })
    if (updateOthers) {
      fieldsReorder(this.__fields, this.__currentField, 'tableOrder', order)
    }
    return this
  }
}
