import Schema from './Schema'
import { Component, Field, Remote, SchemaForm, SchemaTable } from './Helper/interfaces'

/**
 * @class {SchemaArrayCheckbox}
 */
abstract class SchemaArrayCheckbox extends Schema {
  /**
   * @type {SchemaArrayCheckbox}
   */
  protected static __instance: SchemaArrayCheckbox

  /**
   * @private
   * @type {string}
   */
  private static remote = ''

  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.configureComponentInitialization()
  }

  /**
   */
  timestamps () {
  }

  /**
   * @return {string}
   */
  abstract field (): string

  /**
   * @return {Record<string, unknown>}
   */
  abstract properties (): Record<string, unknown>

  /**
   */
  construct () {
    this.addRemote(this.field(), this.properties())
  }

  /**
   * @param {string} exposed
   * @param {Record<string, unknown>} attrs
   */
  addRemote (exposed: string, attrs: Record<string, unknown>) {
    this.addField(exposed)
      .fieldIsSelectRemote(attrs)
      .fieldAppendAttrs({ exposed: true })
    return this
  }

  /**
   * @return {Field}
   */
  getRemote (): Field | null {
    const fields = this.getFields()
    const field = Object.entries(fields)
      .map(([, field]) => field)
      .find((field: Field) => field?.attrs?.exposed)
    if (!field) {
        return null
    }
    return field
  }

  /**
   * @param {Object} options
   * @returns {Object}
   */
  static provideArrayCheckbox (options = {}) {
    const instance = this.$instance() as SchemaArrayCheckbox
    const field = instance.getRemote()
    if (!field) {
      return {}
    }
    const attrs = field.attrs ?? {}
    const remote = attrs.remote as Remote
    const attrReserved = [
      'domain',
      'field',
      'primaryKey',
      'displayKey',
      'remote',
      'placeholder',
      'tooltip',
      'hint'
    ]
    for (const attr of attrReserved) {
      if (attrs.hasOwnProperty(attr)) {
        delete attrs[attr]
      }
    }
    return {
      domain: this.domain,
      field: field.$key,
      primaryKey: String(attrs.keyValue),
      displayKey: String(attrs.keyLabel),
      remote: (query: Record<string, unknown>) => remote('', { rowsPerPage: 200 }, query),
      options: [],
      ...attrs,
      ...options
    }
  }

  /**
   * @param {Object} options
   * @returns {Object}
   */
  static provideArray (options = {}) {
    const instance = this.$instance()
    return {
      domain: this.domain,
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      fields: () => instance.getFields(),
      hooks: () => instance.getHooks(),
      ...options
    }
  }
}

export default SchemaArrayCheckbox
