import { searchKey } from 'src/settings/schema'

import Base from './Base'

import Groups from './Schema/Groups'
import Fields from './Schema/Fields'
import FieldTable from './Schema/FieldTable'
import FieldForm from './Schema/FieldForm'
import FieldIs from './Schema/FieldIs'
import FieldValidation from './Schema/FieldValidation'
import Actions from './Schema/Actions'
import Hooks from './Schema/Hooks'
import Watches from './Schema/Watches'
import Avoids from './Schema/Avoids'
import ConfigureActions from './Schema/Component/ConfigureActions'
import ConfigureComponent from './Schema/Component/ConfigureComponent'

import Service from '../Services/Rest'
import { SchemaForm, SchemaTable } from 'app/@devitools/Agnostic/Helper/interfaces'
import { OPERATORS } from './enum'
import { clone, objectToFormData, set, unique, withSeparator } from '../Util/general'

import mixin from './Helper/mixin'

/**
 * @class {Skeleton}
 */
abstract class Skeleton extends Base {
  /**
   * @type {Schema}
   */
  private static __instance: Skeleton

  /**
   * @type {Service}
   */
  public service?: unknown

  /**
   * @param {SchemaForm | SchemaTable} $component
   * @return {this}
   */
  static build ($component?: SchemaForm | SchemaTable) {
    // @ts-ignore
    return new this($component)
  }

  /**
   * @return {this}
   */
  static $instance () {
    if (!this.__instance) {
      this.__instance = this.build()
    }
    return this.__instance
  }

  /**
   * @return {Service}
   */
  $service (): Service {
    if (!this.service) {
      throw new Error('The service is not defined')
    }
    // @ts-ignore
    return this.service.instance()
  }

  /**
   * @param {string} $key
   * @return {this}
   */
  addSeparator ($key = undefined): this {
    const field = $key || unique()
    const path = `separators.${field}`
    const schema = this.$self()
    const label = this.$lang(`domains.${schema.domain}.${path}`)

    this.addAvoid(path)
    this.addField(path)
      .setIs('AppSeparator')
      .setAttrs({ label })
    return this
  }

  /**
   * @param {Object} record
   * @param {boolean} creating
   * @return {Record<string, unknown>}
   */
  prepareRecord (record: Record<string, unknown>, creating = false) {
    let data = clone(record)

    const schema = this.$self()
    if (creating && !schema.useUuid) {
      delete data[schema.primaryKey]
    }

    let useDotNotation = false
    let useFormData = false

    const reducer = (accumulator: Record<string, unknown>, entry: [string, unknown]) => {
      const [field, value] = entry
      if (field.includes('.')) {
        useDotNotation = true
      }
      if (value instanceof File) {
        useFormData = true
      }
      if (!this.__avoids.includes(field)) {
        accumulator[field] = value
      }
      return accumulator
    }
    data = Object.entries(data).reduce(reducer, {})

    if (useDotNotation) {
      const applyDotNotation = (accumulator: Record<string, unknown>, entry: [string, unknown]) => {
        const [field, value] = entry
        accumulator = set(accumulator, field, value)
        return accumulator
      }
      data = Object.entries(data).reduce(applyDotNotation, {})
    }

    if (useFormData) {
      data = objectToFormData(data)
    }

    return data
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

  /**
   * @param {Record<string, *>} options
   * @returns {*}
   */
  static provideRemote (options: Record<string, unknown> = {}) {
    let { widget, path, query } = options
    if (widget === undefined) {
      widget = false
    }
    if (path === undefined) {
      path = ''
    }

    return {
      widget: widget,
      path: path,
      query: query,
      keyValue: this.primaryKey,
      keyLabel: this.displayKey,
      domain: this.domain,
      format: (row: Record<string, unknown>, value: unknown) => value,
      remote: (filter = '', pagination = undefined, query: Record<string, unknown> = {}) => {
        const where = { ...query }
        if (filter) {
          where[this.displayKey] = withSeparator(filter, OPERATORS.LIKE)
        }

        const parameters = { [searchKey]: where }

        if (pagination) {
          return this
            .$instance()
            .$service()
            .paginate({ ...parameters, pagination })
        }

        return this
          .$instance()
          .$service()
          .paginate(parameters)
          .then((response) => response.rows)
      }
    }
  }
}

/**
 * @interface {Skeleton}
 */
interface Skeleton extends Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldValidation,
  Actions,
  Hooks,
  Watches,
  Avoids,
  ConfigureActions,
  ConfigureComponent {
}

mixin(Skeleton, [
  Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldValidation,
  Actions,
  Hooks,
  Watches,
  Avoids,
  ConfigureActions,
  ConfigureComponent
])

export default Skeleton
