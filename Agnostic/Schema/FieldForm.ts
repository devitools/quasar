import Base from '../Base'
import { fieldsReorder } from '../Helper'

/**
 * @class {FieldForm}
 */
export default abstract class FieldForm extends Base {
  /**
   * @param {number} formWidth
   * @returns {Schema}
   */
  fieldFormWidth (formWidth: number): this {
    return this.setLayout({ formWidth })
  }

  /**
   * @param {string} formBackground
   * @returns {Schema}
   */
  fieldFormBackground (formBackground: string): this {
    return this.setLayout({ formBackground })
  }

  /**
   * @param {Boolean} disable
   * @returns {Schema}
   */
  fieldFormDisabled (disable = true): this {
    return this.setAttrs({ disable })
  }

  /**
   * @param {number} formHeight
   * @returns {Schema}
   */
  fieldFormHeight (formHeight: number): this {
    return this.setLayout({ formHeight })
  }

  /**
   * @param {boolean} formHidden
   * @returns {Schema}
   */
  fieldFormHidden (formHidden = true): this {
    return this.setLayout({ formHidden })
  }

  /**
   * @param {string} formName
   * @returns {Schema}
   */
  fieldFormName (formName: string): this {
    return this.setLayout({ formName })
  }

  /*
  * @param {Boolean} type
  * @returns {Screen}
  */
  fieldFormAutofocus (autofocus = true): this {
    return this.setAttrs({ autofocus })
  }

  /**
   * @param {*} value
   * @returns {Schema}
   */
  fieldFormDefaultValue (value: unknown): this {
    return this.setAttrs({ value })
  }

  /**
   * @returns {Schema}
   */
  fieldFormErrorHide (): this {
    return this.setLayout({ formError: false })
  }

  /**
   * @returns {Schema}
   */
  fieldFormErrorShow (): this {
    return this.setLayout({ formError: true })
  }

  /**
   * @param {Boolean} upperCase
   * @returns {Schema}
   */
  fieldFormUpperCase (upperCase = true): this {
    return this.setAttrs({ upperCase })
  }

  /**
   * @param {string} placeholder
   * @returns {Schema}
   */
  fieldFormPlaceholder (placeholder = ''): this {
    if (!placeholder) {
      placeholder = String(this.$lang(`fields.${this.__currentField}.placeholder`))
    }
    return this.setAttrs({ placeholder })
  }

  /**
   * @param {number} order
   * @param {boolean} updateOthers
   * @returns {Schema}
   */
  fieldFormOrder (order: number, updateOthers = false): this {
    this.setLayout({ formOrder: order })
    if (updateOthers) {
      fieldsReorder(this.__fields, this.__currentField, 'formOrder', order)
    }
    return this
  }
}
