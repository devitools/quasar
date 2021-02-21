import Base from '../Base'

import { yesNo } from '../options'
import { OPERATORS } from '../../Agnostic/enum'
import Schema from '../../Agnostic/Schema'
import { format } from '../../Util/currency'
import { booleanFormatter, dateFormatter, optionFormatter, optionsFormatter } from '../../Util/formatter'
import { fieldIsSelectFilter, fieldIsSelectNewValue, fieldIsSelectWatch } from './Component/select'
import { fieldIsEmbedWatch } from './Component/embed'
import { Component, Payload } from '../../Agnostic/Helper/interfaces'
import Skeleton from '../Skeleton'

/**
 * @class {FieldIs}
 */
export default abstract class FieldIs extends Base {
  /**
   * @param {number} maxlength
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsInput (maxlength = 255, attrs = {}) {
    this.setComponent('input', { ...attrs, maxlength }, 'string')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsNumber (attrs = {}) {
    this.setComponent('number', attrs, 'number')
    this.setLayout({ tableWhere: OPERATORS.EQUAL })
    return this
  }

  /**
   * @param digits
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsDigits (this: Schema, digits = 2, attrs = {}) {
    const mask = ('#').repeat(digits)
    this.fieldAsMasked(mask, attrs)
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsPassword (attrs = {}) {
    this.setComponent('password', attrs, 'string')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsEmail (attrs = {}) {
    this.setComponent('email', attrs, 'string')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsLabel (attrs = {}) {
    this.setComponent('AppText', attrs)
    return this
  }

  /**
   * @param {Number} rows
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsText (rows = 6, attrs = {}) {
    this.setComponent('text', { ...attrs, rows }, 'text')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsTextEditor (attrs = {}) {
    this.setComponent('editor', { ...attrs }, 'text')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsCheckbox (attrs = {}) {
    this.setComponent('checkbox', attrs, 'boolean')
    this.setLayout({ tableFormat: booleanFormatter })
    return this
  }

  /**
   * @param {Record<string, unknown>[]} options
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsRadio (options: Record<string, unknown>[] = [], attrs: Record<string, unknown> = {}) {
    const self = this.$self()
    if (!options.length) {
      // @ts-ignore
      options = this.$lang(`domains.${self.domain}.fields.${this.__currentField}.options`, [])
    }
    if (!Array.isArray(options)) {
      options = yesNo
    }
    this.setComponent('radio', { ...attrs, options }, 'options')
    this.setLayout({ tableWhere: OPERATORS.EQUAL, tableFormat: optionsFormatter(options) })
    return this
  }

  /**
   * @param {Record<string, unknown>[]} options
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsSelect (options: Record<string, unknown>[] = [], attrs: Record<string, unknown> = {}) {
    const currentField = this.__currentField

    if (!options.length) {
      const self = this.$self()
      // @ts-ignore
      options = this.$lang(`domains.${self.domain}.fields.${currentField}.options`, [])
    }

    attrs = {
      mapOptions: true,
      emitValue: true,
      useChips: false,
      useInput: true,
      clearable: false,
      ...attrs,
      options
    }

    this.setComponent('select', attrs, 'options')

    this.setOn('filter', fieldIsSelectFilter(currentField))

    // @ts-ignore
    this.addWatch(`record.${currentField}`, fieldIsSelectWatch(currentField), { immediate: true })

    const { allowNew } = attrs
    if (allowNew) {
      this.appendAttrs({ useChips: true })
      this.setOn('new-value', fieldIsSelectNewValue())
    }

    this.setLayout({ tableFormat: optionsFormatter(options), tableWhere: OPERATORS.EQUAL })
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsSelectRemote (attrs: Record<string, unknown> = {}) {
    this.setComponent('remote', attrs, 'select')
    const { format } = attrs
    this.setLayout({ tableFormat: format || optionFormatter(attrs.keyLabel), tableWhere: OPERATORS.EQUAL })
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsSelectRemoteMultiple (attrs = {}) {
    this.setComponent('remoteMultiple', attrs, 'array')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsToggle (attrs = {}) {
    this.setComponent('toggle', attrs, 'boolean')
    this.setLayout({ tableFormat: booleanFormatter })
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsDate (attrs = {}) {
    this.setComponent('date', attrs, 'date')
    this.configureDateTableFormat()
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsDatetime (attrs = {}) {
    this.setComponent('datetime', attrs, 'datetime')
    const previousTableFormat = this.__fields[this.__currentField].$layout.tableFormat
    if (!previousTableFormat) {
      this.configureDateTableFormat()
    }
    return this
  }

  /**
   * @private
   */
  private configureDateTableFormat () {
    const name = this.__currentField
    const { display, format } = this.__fields[name].attrs
    this.setLayout({
      tableFormat: (value: string) => dateFormatter(value, String(display), String(format)) || '-'
    })
  }

  /**
   * @param {number} maxlength
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsInputPlan (maxlength = 255, attrs = {}) {
    this.setComponent('plan', { ...attrs, maxlength }, 'string')
    return this
  }

  /**
   * @param {number} maxlength
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsUrl (maxlength = 255, attrs = {}) {
    this.setComponent('plan', { ...attrs, maxlength }, 'string')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @param {boolean} lazy
   * @returns {Schema}
   */
  fieldIsArray (attrs = {}, lazy = false) {
    let is = 'AppArrayFluent'
    if (lazy) {
      is = 'AppArrayLazy'
    }
    this.setIs(is)
    this.setAttrs(attrs)
    this.setType('array')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsBuiltin (attrs = {}) {
    this.setIs('AppBuiltin')
    this.setAttrs({ ...attrs, uppercase: false })
    this.setType('array')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsCurrency (attrs = {}) {
    this.setComponent('currency', attrs, 'currency')
    const field = this.__fields[this.__currentField]
    const previousTableFormat = field.$layout.tableFormat
    this.setLayout({
      tableFormat: previousTableFormat || ((value: number) => format(value, field.attrs)),
      tableAlign: 'right',
      tableWhere: OPERATORS.CURRENCY
    })
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsPercentage (attrs = {}) {
    this.setComponent('percentage', attrs, 'currency')
    const field = this.__fields[this.__currentField]
    const previousTableFormat = field.$layout.tableFormat
    this.setLayout({
      tableFormat: previousTableFormat || ((value: number) => format(value, field.attrs)),
      tableAlign: 'right',
      tableWhere: OPERATORS.CURRENCY
    })
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
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsEmbed (this: Skeleton, attrs = {}) {
    this.setIs('AppEmbed')
    this.setAttrs(attrs)
    this.setType('undefined')
    const foreignKey = this.__currentField

    const self = this.$self()
    this.addWatch(`record.${self.primaryKey}`, fieldIsEmbedWatch(foreignKey))
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsTree (attrs: Record<string, unknown> = {}) {
    const self = this.$self()

    if (!attrs.nodes) {
      attrs.nodes = this.$lang(`domains.${self.domain}.fields.${this.__currentField}.nodes`, [])
    }
    if (!attrs.open) {
      attrs['default-expand-all'] = true
    }
    this.setIs('AppTree')
    this.setAttrs({ nodeKey: 'id', tickStrategy: 'leaf', ...attrs })
    this.setType('array')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsImage (attrs = {}) {
    this.setComponent('image', attrs, 'file')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsFile (attrs = {}) {
    this.setComponent('file', attrs, 'file')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsFileAsync (this: Schema, attrs: Record<string, unknown> = {}) {
    this.setComponent('file', attrs, 'file')
    const schema = this
    let extract: Function = attrs.extract as Function
    if (!extract) {
      extract = (response: unknown) => response
    }
    let aggregate: Function = attrs.aggregate as Function
    if (!aggregate) {
      aggregate = function (data: unknown) {
        return data
      }
    }
    const name = this.__currentField
    this.setOn('file-selected', function (this: Component, payload: Payload) {
      const $event = payload.$event as Blob
      const data = { file: $event }
      schema.$service().send(aggregate.call(this, data))
        .then((response) => {
          const value = extract(response)
          this.$getField(name).$setValue(value)
        })
    })
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsFileSync (attrs = {}) {
    this.setComponent('fileSync', attrs, 'file')
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsInternationalPhone (attrs = {}) {
    this.setComponent('phoneInternational', attrs)
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {Schema}
   */
  fieldIsNumeric (attrs = {}) {
    this.setComponent('numeric', { value: 0, ...attrs }, 'number')
    this.setLayout({ tableAlign: 'right' })
    return this
  }
}
