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
  group?: string
  $configure?: Function
  chars?: string
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
 * @interface {Timestamp}
 */
export interface Timestamp {
  name: string
  type: string
}

/**
 * @interface {SchemaForm}
 */
export interface SchemaForm {
  $getField(): SchemaForm
  $getValue(): unknown
}

/**
 * @interface {SchemaTable}
 */
export interface SchemaTable {
  $getField(): SchemaTable
  $getValue(): unknown
}
