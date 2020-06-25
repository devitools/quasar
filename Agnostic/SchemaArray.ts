import Base from './Base'

import Groups from './Schema/Groups'
import Fields from './Schema/Fields'
import FieldTable from './Schema/FieldTable'
import FieldForm from './Schema/FieldForm'
import FieldIs from './Schema/FieldIs'
import FieldValidation from './Schema/FieldValidation'
import Watches from './Schema/Watches'
import mixin from './Helper/mixin'
import { Component } from './Helper/interfaces'

/**
 * @class {SchemaArray}
 */
abstract class SchemaArray extends Base {
  /**
   * @type {SchemaArray}
   */
  protected static __instance: SchemaArray

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
   * @param {Object} options
   * @returns {Object}
   */
  static provideArray (options = {}) {
    return {
      domain: this.domain,
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      fields: () => this.$instance().getFields(),
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
  FieldValidation,
  Watches {
}

mixin(SchemaArray, [
  Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldValidation,
  Watches
])

export default SchemaArray
