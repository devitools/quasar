import { displayKey, primaryKey } from 'src/settings/schema'
import components from 'src/settings/components'

import { Action, Field, Group, SchemaForm, SchemaTable, Watch } from './Helper/interfaces'
import { scopes } from './enum'
import { clone } from '../Util/general'
import $lang from '../Lang'

/**
 * @class {Base}
 */
export default abstract class Base {
  /**
   * @type {string}
   */
  static primaryKey = primaryKey

  /**
   * @type {string}
   */
  static displayKey = displayKey

  /**
   * @type {string}
   */
  static domain = ''

  /**
   * @type {string}
   */
  static groupType = 'sections'

  /**
   * @type {boolean}
   */
  static useUuid = false

  /**
   * @type {Record<string, Group>}
   */
  protected __groups: Record<string, Group>

  /**
   * @type {Record<string, Field>}
   */
  protected __fields: Record<string, Field>

  /**
   * @type {Record<string, Action>}
   */
  protected __actions: Record<string, Action>

  /**
   * @type {Record<string, Function>}
   */
  protected __hooks: Record<string, Function>

  /**
   * @type {Record<string, Watch[]>}
   */
  protected __watches: Record<string, Watch[]>

  /**
   * @type {string[]}
   */
  protected __avoids: string[]

  /**
   * @type {string}
   */
  protected __currentField = ''

  /**
   * @type {string}
   */
  protected __currentAction = ''

  /**
   * @type {string[]}
   */
  protected scopes: string[]

  /**
   * @type {Boolean}
   */
  protected safe = true

  /**
   * @return {string[]}
   */
  initScopes (): string[] {
    return scopes()
  }

  /**
   * @param {unknown} element
   * @param {Function} [action]
   */
  $clone (element: unknown, action?: Function) {
    return clone(element, action)
  }

  /**
   * @param {string | string[]} key
   * @param {unknown} [fallback]
   * @returns {unknown}
   */
  $lang (key: string | string[], fallback: unknown = ''): string | string[] | Record<string, unknown> |
    Record<string, unknown>[] {
    if (typeof key === 'string') {
      key = [key, `domains.${this.$self().domain}.${key}`]
    }
    return $lang(key, fallback)
  }

  /**
   */
  $self () {
    return <typeof Base>this.constructor
  }

  /**
   * Call schema builder method
   * @param {SchemaForm | SchemaTable} $component
   */
  abstract construct ($component?: SchemaForm | SchemaTable): void

  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
  }

  /**
   * Bootstrap everything
   */
  timestamps () {
  }

  /**
   * @param {SchemaForm | SchemaTable} $component
   * Base constructor
   */
  constructor ($component?: SchemaForm | SchemaTable) {
    this.scopes = this.initScopes()
    this.__groups = {}
    this.__fields = {}
    this.__actions = {}
    this.__hooks = {}
    this.__watches = {}

    this.__avoids = []

    this.bootstrap($component)
    this.construct($component)
    this.timestamps()
  }

  /**
   * @param {Record<string, unknown>} layout
   * @returns {this}
   */
  setLayout (layout: Record<string, unknown>): this {
    const name = this.__currentField
    const field = this.__fields[name]
    this.__fields[name].$layout = Object.assign(field.$layout, layout)
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {this}
   */
  setAttrs (attrs: Record<string, unknown>): this {
    const name = this.__currentField
    const field = this.__fields[name]
    this.__fields[name].attrs = Object.assign(field.attrs, attrs || {})
    return this
  }

  /**
   * @param {string} type
   * @returns {this}
   */
  setType (type: string): this {
    const $key = this.__currentField
    this.__fields[$key].$type = type
    return this
  }

  /**
   * @param {unknown} is
   * @returns {this}
   */
  setIs (is: unknown) {
    const name = this.__currentField
    const field = this.__fields[name]
    field.is = is
    return this
  }

  /**
   * @param {Function} parseOutput
   * @returns {this}
   */
  setParseOutput (parseOutput: Function) {
    const name = this.__currentField
    const field = this.__fields[name]
    field.$parseOutput = parseOutput
    return this
  }

  /**
   * @param {Function} parseInput
   * @returns {this}
   */
  setParseInput (parseInput: Function) {
    const name = this.__currentField
    const field = this.__fields[name]
    field.$parseInput = parseInput
    return this
  }

  /**
   * @param {Function[]} listeners
   * @returns {this}
   */
  setListeners (listeners: Function[]) {
    const name = this.__currentField
    const field = this.__fields[name]
    this.__fields[name].on = Object.assign(field.on, listeners)
    return this
  }

  /**
   * @param {string} event
   * @param {function} callable
   * @param {Boolean} reset
   * @returns {this}
   */
  setOn (event: string, callable: Function, reset = false) {
    const name = this.__currentField
    if (!this.__fields[name].on[event] || reset) {
      this.__fields[name].on[event] = []
    }
    this.__fields[name].on[event].push(callable)
    return this
  }

  /**
   * @param {string} component
   * @returns {this}
   */
  setComponent (component: string): this {
    // @ts-ignore
    const properties = components[component]
    if (!properties) {
      this.setIs(component)
      return this
    }
    this.setIs(properties.is)
    this.setAttrs(properties.attrs)
    this.setListeners(properties.listeners)
    return this
  }
}
