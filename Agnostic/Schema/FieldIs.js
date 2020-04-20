import { primaryKey } from 'src/settings/schema'
import { currencyParseInput } from 'src/settings/components'

import { yesNo } from '../options'
import { booleanFormatter, dateFormatter, optionFormatter, optionsFormatter, format } from '../../Util/formatter'

/**
 * @typedef {Object} FieldIs
 */
export default {
  /**
   * @param {Object} options
   * @returns {Schema|Skeleton}
   */
  fieldAsPrimaryKey (options = {}) {
    options = {
      tableWith: '80px',
      formWidth: 100,
      tableShow: false,
      key: primaryKey,
      label: '',
      hiddenForm: true,
      ...options
    }
    return this.addField(options.key, options.label, String)
      .fieldTableWidth(options.tableWith)
      .fieldFormWidth(options.formWidth)
      .fieldTableShow(options.tableShow)
      .fieldFormHidden(options.hiddenForm)
      .fieldFormDisabled(true)
      .fieldPrimaryKey()
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldAsZip (attrs = {}) {
    this.setAttrs({ mask: '#####-###', unmaskedValue: true, placeholder: 'ex.: 39500-201' })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldAsPhone (attrs = {}) {
    this.setAttrs({ mask: '(##) ####-####', unmaskedValue: true, placeholder: 'ex.: (21) 3289-3950' })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldAsCell (attrs = {}) {
    this.setAttrs({ mask: '(##) #####-####', unmaskedValue: true, placeholder: 'ex.: (44) 98956-3049' })
    this.setType('string')
    return this
  },

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
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldAsMasked (mask, attrs = {}) {
    let { placeholder, tableFormat } = attrs
    if (!placeholder) {
      placeholder = mask.replace(/#/g, '9')
    }
    if (!tableFormat) {
      tableFormat = (value) => format(value, mask)
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
  },

  /**
   * @param {number} maxlength
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsInput (maxlength = 255, attrs = {}) {
    this.setComponent('input')
    this.setAttrs({ ...attrs, maxlength })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsNumber (attrs = {}) {
    this.setComponent('number')
    this.setAttrs({ ...attrs })
    this.setLayout({ tableWhereOperator: 'eq' })
    this.setType('number')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsPassword (attrs = {}) {
    this.setComponent('password')
    this.setAttrs({ ...attrs })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsEmail (attrs = {}) {
    this.setComponent('email')
    this.setAttrs({ ...attrs })
    this.setType('string')
    return this
  },

  /**
   * @param {Number} rows
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsText (rows = 4, attrs = {}) {
    this.setComponent('text')
    this.setAttrs({ ...attrs, rows })
    this.setType('text')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsCheckbox (attrs = {}) {
    this.setComponent('checkbox')
    this.setAttrs({ ...attrs })
    this.setLayout({ tableFormat: booleanFormatter })
    this.setType('boolean')
    return this
  },

  /**
   * @param {Array} options
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsRadio (options = undefined, attrs = {}) {
    if (!options) {
      options = this.$lang(`domains.${this.constructor.domain}.fields.${this.__currentField}.options`, undefined)
    }
    if (!Array.isArray(options)) {
      options = yesNo
    }
    this.setComponent('radio')
    this.setAttrs({ ...attrs, options })
    this.setLayout({ tableWhere: 'eq', tableFormat: optionsFormatter(options) })
    this.setType('select')
    return this
  },

  /**
   * @param {Array} options
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsSelect (options = undefined, attrs = {}) {
    if (!options) {
      options = this.$lang(`domains.${this.constructor.domain}.fields.${this.__currentField}.options`)
    }
    this.setAttrs({
      mapOptions: true,
      emitValue: true,
      useChips: false,
      ...attrs,
      options,
      original: options
    })

    this.setComponent('select')

    if (attrs.allowNew) {
      this.setAttrs({ useInput: true, useChips: true })
      this.setOn('filter', function ({ $event, field, parameters }) {
        const original = field.attrs.original
        const update = parameters[0]
        update(() => {
          if ($event === '') {
            field.attrs.options = original
            return
          }
          const needle = $event.toLowerCase()
          field.attrs.options = original.filter(
            (candidate) => candidate.toLowerCase().indexOf(needle) > -1
          )
        })
      })
      this.setOn('new-value', function ({ $event, field, parameters }) {
        const done = parameters[0]
        if ($event.length > 2) {
          if (!field.attrs.options.includes($event)) {
            done($event, 'add-unique')
          }
        }
      })
    }
    this.setLayout({ tableFormat: optionsFormatter(options), tableWhereOperator: 'eq' })
    this.setType('select')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsSelectRemote (attrs = {}) {
    this.setComponent('remote')
    this.setAttrs(attrs)
    this.setLayout({ tableFormat: optionFormatter(attrs.keyLabel), tableWhereOperator: 'eq' })
    this.setType('select')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsSelectRemoteMultiple (attrs = {}) {
    this.setComponent('remoteMultiple')
    this.setAttrs(attrs)
    this.setType('array')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsToggle (attrs = {}) {
    this.setComponent('toggle')
    this.setAttrs({ ...attrs })
    this.setLayout({ tableFormat: booleanFormatter })
    this.setType('boolean')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsDate (attrs = {}) {
    this.setComponent('date')
    this.setAttrs({ ...attrs })
    this.setType('date')
    this.__configureDateTableFormat()
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
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
  },

  /**
   * @private
   */
  __configureDateTableFormat () {
    const name = this.__currentField
    const { display, format } = this.__fields[name].attrs
    this.setLayout({
      tableFormat: (value) => dateFormatter(value, display, format) || ''
    })
  },

  /**
   * @param {number} maxlength
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsInputPlan (maxlength = 255, attrs = {}) {
    this.setComponent('plan')
    this.setAttrs({ ...attrs, maxlength })
    this.setType('string')
    return this
  },

  /**
   * @param {number} maxlength
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsUrl (maxlength = 255, attrs = {}) {
    this.setComponent('plan')
    this.setAttrs({ placeholder: 'ex.: https://quasar.dev', ...attrs, maxlength })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsArray (attrs = {}) {
    this.setIs('AppArray')
    this.setAttrs({ ...attrs })
    this.setType('array')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsBuiltIn (attrs = {}) {
    this.setIs('AppBuiltIn')
    this.setAttrs({ ...attrs })
    this.setType('array')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsCurrency (attrs = {}) {
    this.setComponent('currency')
    this.setAttrs({ value: 0, ...attrs })
    const previousTableFormat = this.__fields[this.__currentField].$layout.tableFormat

    this.setLayout({
      tableFormat: previousTableFormat || currencyParseInput,
      tableAlign: 'right',
      tableWhere: 'currency'
    })
    this.setType('currency')
    return this
  },

  /**
   * @param {function} click
   * @param {Object} options
   * @returns {Schema|Skeleton}
   */
  fieldIsButton (click, options = {}) {
    this.setIs('AppButton')
    if (!options.label) {
      options.label = `buttons.${this.__currentField}.label`
    }
    options.label = this.$lang(options.label)
    const attrs = { ...options, click }
    this.setAttrs(attrs)
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsEmbed (attrs = {}) {
    this.setIs('AppEmbed')
    this.setAttrs({ ...attrs })
    this.setType('undefined')
    const foreignKey = this.__currentField
    this.addWatch(`record.${this.primaryKey}`, function (value) {
      this.$getField(foreignKey).$setValue(value)
    })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsTree (attrs = {}) {
    this.setIs('AppTree')
    if (!attrs.nodes) {
      attrs.nodes = this.$lang(`domains.${this.constructor.domain}.fields.${this.__currentField}.nodes`, [])
    }
    if (!attrs.open) {
      attrs['default-expand-all'] = true
    }
    this.setAttrs({ nodeKey: 'id', tickStrategy: 'leaf', ...attrs })
    this.setType('array')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsImage (attrs = {}) {
    this.setComponent('image')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsFile (attrs = {}) {
    this.setComponent('file')
    this.setAttrs(attrs)
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema|Skeleton}
   */
  fieldIsFileSync (attrs = {}) {
    this.setComponent('fileSync')
    this.setAttrs(attrs)
    return this
  }
}
