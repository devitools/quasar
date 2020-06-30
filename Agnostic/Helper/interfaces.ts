/**
 * @interface {Provide}
 */
export interface Provide {
  groupType: string
  domain: string
  primaryKey: string
  displayKey: string
  hooks: Function
  groups: Function
  fields: Function
  actions: Function
  watches: Function
  settings?: Record<string, unknown>
}

/**
 * @interface {ProvideReport}
 */
export interface ProvideReport {
  report: string
  groupType: string
  domain: string
  hooks: Function
  groups: Function
  fields: Function
  actions: Function
  watches: Function
  settings?: Record<string, unknown>
}

/**
 * @interface {Pagination}
 */
export interface Pagination {
  rows: Record<string, unknown>[]
  rowsNumber: number
  pagesNumber: number
  rowsPerPage: number
  page: number
  sortBy?: string
  descending?: boolean
}

/**
 * @interface {Group}
 */
export interface Group {
  label?: string
  icon?: string
}

/**
 * @interface {Field}
 */
export interface Field {
  $key: string
  $primaryKey?: boolean
  is: unknown
  attrs: Record<string, unknown>
  on: Record<string, Function[]>
  $type: string
  $validations: Record<string, unknown>
  $parseInput?: Function
  $parseOutput?: Function
  $layout: {
    formLabel: string
    formWidth: number
    formHeight: number
    formHidden: boolean
    formOrder: number
    formError: boolean
    tableLabel: string
    tableWidth: string
    tableHidden: boolean
    tableRequired: boolean
    tableAlign: string
    tableSortable: boolean
    tableOrder: number
    tableFormat?: Function
    tableWhere?: string
  }
  scopes: string[]
  $created?: Configure[]
  $fill?: Fill | Function
  group?: string
  $configure?: Function
  chars?: string
}

/**
 * @typedef {Configure}
 */
export type Configure = {
  path: string
  scope: string
  value: unknown
}

/**
 * @typedef {Fill}
 */
export type Fill = {
  method: string
  parameters: Record<string, unknown>
}

/**
 * @interface {Action}
 */
export interface Action {
  $key: string
  hidden: boolean
  dropdown: boolean
  on: Record<string, Function>
  scopes: string[]
  positions: string[]
  class: string[]
  order: number
  attrs: Record<string, unknown>
  validate?: Function
  levels?: string[]
  namespace?: string
  configure?: Function
  actions?: Action[]
}

/**
 * @interface {Watch}
 */
export interface Watch {
  handler: Function
  options: Record<string, unknown>
}

/**
 * @typedef {Timestamp}
 */
export type Timestamp = {
  name: string
  type: string
}

/**
 * @typedef {FieldEvent}
 */
export type FieldEvent = {
  $event: unknown
  field: Field
  parameters: Record<string, unknown>
}

/**
 * @interface {Component}
 */
export interface Component {
  $setIs (is: string): Component

  $setLayout (property: string, value: number | string): Component

  $getLayout (property: string): Component

  $getField (name: string): Component

  $fieldFormHidden (formHidden?: boolean): Component

  $fieldFormWidth (formWidth: number): Component

  $fieldFormHeight (formHeight: number): Component

  $fieldAttr (property: string, value: unknown): Component

  $fieldFormDisabled (disable: boolean): Component

  $fieldFormOrder (formOrder: number, updateOthers?: boolean): Component

  $fieldTableHidden (tableHidden?: boolean): Component

  $fieldTableWhere (tableWhere?: string): Component

  $getValue (): unknown

  $setValue (value: unknown): Component
}

/**
 * @typedef {SchemaForm}
 */
export type SchemaForm = Component

/**
 * @typedef {SchemaTable}
 */
export type SchemaTable = Component
