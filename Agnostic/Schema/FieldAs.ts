import { primaryKey } from 'src/settings/schema'

import Base from '../Base'
import { format } from '../../Util/formatter'
import { uuid } from '../../Util/general'
import Skeleton from '../Skeleton'

/**
 * @class {FieldAs}
 */
export default abstract class FieldAs extends Base {
  /**
   * @param {Object} options
   * @returns {Schema}
   */
  fieldAsPrimaryKey (this: Skeleton, options: Record<string, unknown> = {}) {
    options = {
      tableWith: '80px',
      formWidth: 100,
      tableShow: false,
      key: primaryKey,
      hiddenForm: true,
      ...options
    }

    this.addField(String(options.key), 'string')
      .fieldTableWidth(String(options.tableWith))
      .fieldFormWidth(Number(options.formWidth))
      .fieldTableShow(Boolean(options.tableShow))
      .fieldFormHidden(Boolean(options.hiddenForm))
      .fieldFormDisabled(true)
      .fieldPrimaryKey()

    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsZip (attrs = {}) {
    this.fieldAsMasked('#####-###', { placeholder: 'ex.: 39500-201' })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsPhone (attrs = {}) {
    this.fieldAsMasked('(##) ####-####', { placeholder: 'ex.: (21) 3289-3950' })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsCell (attrs = {}) {
    this.fieldAsMasked('(##) #####-####', { placeholder: 'ex.: (44) 98956-3049' })
    this.setType('string')
    return this
  }

  /**
   * Mask tokens:
   * |------|----------------------------------------------------|
   * | #    | Numeric                                            |
   * |------|----------------------------------------------------|
   * | S    | Letter, a to z, case insensitive                   |
   * | N    | Alphanumeric, case insensitive for letters         |
   * | A    | Letter, transformed to uppercase                   |
   * | a    | Letter, transformed to lowercase                   |
   * | X    | Alphanumeric, transformed to uppercase for letters |
   * | x    | Alphanumeric, transformed to lowercase for letters |
   * |------|----------------------------------------------------|
   *
   * @param {string} mask
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldAsMasked (mask: string, attrs: Record<string, unknown> = {}) {
    let { placeholder, tableFormat } = attrs
    if (!placeholder) {
      placeholder = mask.replace(/#/g, '9')
    }
    if (!tableFormat) {
      tableFormat = (value: string) => format(value, mask)
    }
    this.appendAttrs({
      mask,
      unmaskedValue: true,
      ...attrs,
      placeholder: `ex.: ${placeholder}`
    })
    this.setLayout({ tableFormat })
    this.setType('string')
    return this
  }
}
