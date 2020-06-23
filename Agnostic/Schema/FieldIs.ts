import { primaryKey } from 'src/settings/schema'
import { currencyParseInput } from 'src/settings/components'

import Base from '../Base'

import { yesNo } from '../options'
import { OPERATORS } from '../../Agnostic/enum'
import { booleanFormatter, dateFormatter, format, optionFormatter, optionsFormatter } from '../../Util/formatter'
import { uuid } from '../../Util/general'
import {
  fieldIsSelectFilter,
  fieldIsSelectNewValue,
  fieldIsSelectWatch
} from './Component/select'
import { fieldIsEmbedWatch } from './Component/embed'

/**
 * @class {FieldIs}
 */
export default abstract class FieldIs extends Base {
  /**
   * @param {Object} options
   * @returns {Schema}
   */
  fieldAsPrimaryKey (options: Record<string, unknown> = {}) {
    options = {
      tableWith: '80px',
      formWidth: 100,
      tableShow: false,
      key: primaryKey,
      hiddenForm: true,
      ...options
    }
    const self = this.$self()

    // @ts-ignore
    this.addField(options.key, String)
      .fieldTableWidth(options.tableWith)
      .fieldFormWidth(options.formWidth)
      .fieldTableShow(options.tableShow)
      .fieldFormHidden(options.hiddenForm)
      .fieldFormDisabled(true)
      .fieldFormDefaultValue(self.useUuid ? uuid() : undefined)
      .fieldPrimaryKey()

    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsZip (attrs = {}) {
    this.setAttrs({ mask: '#####-###', unmaskedValue: true, placeholder: 'ex.: 39500-201' })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsPhone (attrs = {}) {
    this.setAttrs({ mask: '(##) ####-####', unmaskedValue: true, placeholder: 'ex.: (21) 3289-3950' })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsCell (attrs = {}) {
    this.setAttrs({ mask: '(##) #####-####', unmaskedValue: true, placeholder: 'ex.: (44) 98956-3049' })
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
    this.setAttrs({
      mask,
      unmaskedValue: true,
      ...attrs,
      placeholder: `ex.: ${placeholder}`
    })
    this.setLayout({ tableFormat })
    this.setType('string')
    return this
  }

  /**
   * @param {number} maxlength
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsInput (maxlength = 255, attrs = {}) {
    this.setComponent('input')
    this.setAttrs({ ...attrs, maxlength })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsNumber (attrs = {}) {
    this.setComponent('number')
    this.setAttrs({ ...attrs })
    this.setLayout({ tableWhere: OPERATORS.EQUAL })
    this.setType('number')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsPassword (attrs = {}) {
    this.setComponent('password')
    this.setAttrs({ ...attrs })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsEmail (attrs = {}) {
    this.setComponent('email')
    this.setAttrs({ ...attrs })
    this.setType('string')
    return this
  }

  /**
   * @param {Number} rows
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsText (rows = 4, attrs = {}) {
    this.setComponent('text')
    this.setAttrs({ ...attrs, rows })
    this.setType('text')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsCheckbox (attrs = {}) {
    this.setComponent('checkbox')
    this.setAttrs({ ...attrs })
    this.setLayout({ tableFormat: booleanFormatter })
    this.setType('boolean')
    return this
  }

  /**
   * @param {Record<string, unknown>[]} options
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsRadio (options: Record<string, unknown>[] = [], attrs: Record<string, unknown> = {}) {
    const self = this.$self()
    if (!options.length) {
      // @ts-ignore
      options = this.$lang(`domains.${self.domain}.fields.${this.__currentField}.options`, undefined)
    }
    if (!Array.isArray(options)) {
      options = yesNo
    }
    this.setComponent('radio')
    this.setAttrs({ ...attrs, options })
    this.setLayout({ tableWhere: OPERATORS.EQUAL, tableFormat: optionsFormatter(options) })
    this.setType('select')
    return this
  }

  /**
   * @param {: Record<string, unknown>[]} options
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsSelect (options: Record<string, unknown>[] = [], attrs: Record<string, unknown> = {}) {
    const currentField = this.__currentField

    if (!options.length) {
      const self = this.$self()
      // @ts-ignore
      options = this.$lang(`domains.${self.domain}.fields.${currentField}.options`)
    }

    this.setAttrs({
      mapOptions: true,
      emitValue: true,
      useChips: false,
      ...attrs,
      options
    })

    this.setComponent('select')

    this.setOn('filter', fieldIsSelectFilter(currentField))

    // @ts-ignore
    this.addWatch(`record.${currentField}`, fieldIsSelectWatch(currentField))

    const { allowNew } = attrs
    if (allowNew) {
      this.setAttrs({ useChips: true })
      this.setOn('new-value', fieldIsSelectNewValue())
    }

    this.setLayout({ tableFormat: optionsFormatter(options), tableWhere: OPERATORS.EQUAL })
    this.setType('select')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsSelectRemote (attrs: Record<string, unknown> = {}) {
    this.setComponent('remote')
    this.setAttrs(attrs)
    this.setLayout({ tableFormat: optionFormatter(attrs.keyLabel), tableWhere: OPERATORS.EQUAL })
    this.setType('select')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsSelectRemoteMultiple (attrs = {}) {
    this.setComponent('remoteMultiple')
    this.setAttrs(attrs)
    this.setType('array')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsToggle (attrs = {}) {
    this.setComponent('toggle')
    this.setAttrs({ ...attrs })
    this.setLayout({ tableFormat: booleanFormatter })
    this.setType('boolean')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsDate (attrs = {}) {
    this.setComponent('date')
    this.setAttrs({ ...attrs })
    this.setType('date')
    this.__configureDateTableFormat()
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsDatetime (attrs = {}) {
    this.setComponent('datetime')
    this.setAttrs({ ...attrs })
    const previousTableFormat = this.__fields[this.__currentField].$layout.tableFormat
    if (!previousTableFormat) {
      this.__configureDateTableFormat()
    }
    this.setType('datetime')
    return this
  }

  /**
   * @private
   */
  __configureDateTableFormat () {
    const name = this.__currentField
    const { display, format } = this.__fields[name].attrs
    this.setLayout({
      tableFormat: (value: string) => dateFormatter(value, String(display), String(format)) || ''
    })
  }

  /**
   * @param {number} maxlength
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsInputPlan (maxlength = 255, attrs = {}) {
    this.setComponent('plan')
    this.setAttrs({ ...attrs, maxlength })
    this.setType('string')
    return this
  }

  /**
   * @param {number} maxlength
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsUrl (maxlength = 255, attrs = {}) {
    this.setComponent('plan')
    this.setAttrs({ placeholder: 'ex.: https://quasar.dev', ...attrs, maxlength })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsArray (attrs = {}) {
    this.setIs('AppArray')
    this.setAttrs({ ...attrs })
    this.setType('array')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsBuiltIn (attrs = {}) {
    this.setIs('AppBuiltIn')
    this.setAttrs({ ...attrs, uppercase: false })
    this.setType('array')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsCurrency (attrs = {}) {
    this.setComponent('currency')
    this.setAttrs({ value: 0, ...attrs })
    const previousTableFormat = this.__fields[this.__currentField].$layout.tableFormat

    this.setLayout({
      tableFormat: previousTableFormat || currencyParseInput,
      tableAlign: 'right',
      tableWhere: OPERATORS.CURRENCY
    })
    this.setType('currency')
    return this
  }

  /**
   * @param {function} click
   * @param {Record<string, unknown>} options
   * @returns {Schema}
   */
  fieldIsButton (click: Function, options: Record<string, unknown> = {}) {
    this.setIs('AppButton')
    if (!options.label) {
      options.label = this.$lang(`fields.${this.__currentField}.caption`)
    }
    const attrs = { ...options, click }
    this.setAttrs(attrs)
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsEmbed (attrs = {}) {
    this.setIs('AppEmbed')
    this.setAttrs({ ...attrs })
    this.setType('undefined')
    const foreignKey = this.__currentField

    const self = this.$self()
    // @ts-ignore
    this.addWatch(`record.${self.primaryKey}`, fieldIsEmbedWatch(foreignKey))
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsTree (attrs: Record<string, unknown> = {}) {
    const self = this.$self()

    this.setIs('AppTree')
    if (!attrs.nodes) {
      attrs.nodes = this.$lang(`domains.${self.domain}.fields.${this.__currentField}.nodes`, [])
    }
    if (!attrs.open) {
      attrs['default-expand-all'] = true
    }
    this.setAttrs({ nodeKey: 'id', tickStrategy: 'leaf', ...attrs })
    this.setType('array')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsImage (attrs = {}) {
    this.setComponent('image')
    this.setAttrs({ ...attrs })
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsFile (attrs = {}) {
    this.setComponent('file')
    this.setAttrs(attrs)
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsFileSync (attrs = {}) {
    this.setComponent('fileSync')
    this.setAttrs(attrs)
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsInternationalPhone (attrs = {}) {
    this.setComponent('phoneInternational')
    this.setAttrs(attrs)
    return this
  }
}
