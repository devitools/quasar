import Base from './Base'

import Groups from './Schema/Groups'
import Fields from './Schema/Fields'
import FieldTable from './Schema/FieldTable'
import FieldForm from './Schema/FieldForm'
import FieldIs from './Schema/FieldIs'
import FieldAs from './Schema/FieldAs'
import FieldValidation from './Schema/FieldValidation'
import Watches from './Schema/Watches'
import Hooks from './Schema/Hooks'
import mixin from './Helper/mixin'
import { Component, Remote, SchemaForm, SchemaTable } from './Helper/interfaces'
import ConfigureComponent from './Schema/Component/ConfigureComponent'

/**
 * @class {SchemaArray}
 */
abstract class SchemaArray extends Base {
  /**
   * @type {SchemaArray}
   */
  protected static __instance: SchemaArray

  /**
   * @type {string}
   */
  protected static checkbox: string

  /**
   * @param {Component} $component
   * @param {Record<string, unknown>} dependencies
   * @return {this}
   */
  static $instance ($component?: Component, dependencies?: Record<string, unknown>) {
    if (!this.__instance) {
      this.__instance = this.build($component, dependencies)
    }
    return this.__instance
  }

  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
    this.configureComponentInitialization()
  }

  /**
   * @param {Object} options
   * @returns {Object}
   */
  static provideArrayCheckbox (options = {}) {
    const instance = this.$instance()
    const fields = instance.getFields()
    const field = fields[this.checkbox] ?? {}
    const attrs = field.attrs
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

/**
 * @interface {SchemaArray}
 */
interface SchemaArray extends Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldAs,
  FieldValidation,
  Watches,
  Hooks,
  ConfigureComponent{
}

mixin(SchemaArray, [
  Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldAs,
  FieldValidation,
  Watches,
  Hooks,
  ConfigureComponent
])

export default SchemaArray
