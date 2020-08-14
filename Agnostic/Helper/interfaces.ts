
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
    tableWhereComponent?: unknown
  }
  scopes: string[]
  $created?: Configure[]
  $fill?: Fill | Function
  group?: string
  $configure?: Function
  chars?: string

  label?: string
  listeners?: Record<string, Function | Function[]>
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
 * @typedef {Payload}
 */
export type Payload = {
  $event: unknown
  field: Field
  parameters: Record<string, unknown>
}

/**
 * @typedef {Context}
 */
export type Context = {
  record: Record<string, unknown>
  records: Record<string, unknown>[]
}

/**
 * @interface {Message}
 */
export interface Message {
  notify (options: Record<string, unknown>, action?: Record<string, unknown>): void

  toast (message: string | Record<string, unknown>, options?: Record<string, unknown>): void

  success (message: string | Record<string, unknown>, options?: Record<string, unknown>): void

  error (message: string | Record<string, unknown>, options?: Record<string, unknown>): void

  warning (message: string | Record<string, unknown>, options?: Record<string, unknown>): void
}

/**
 * @typedef {VuexStore}
 */
export type VuexStore = {
  getters: Record<string, never>

  dispatch (action: string, parameters?: Record<string, never>): Promise<never>
}

/**
 * @typedef {RouteRecord}
 */
export type RouteRecord = {
  meta: Record<string, unknown>
}

/**
 * @interface {Component}
 */
export interface Component {
  scope: string

  domain: string

  primaryKey: string

  payload: Record<string, unknown>

  $store: VuexStore

  $route: RouteRecord

  getActionPath(): string

  $browse(target: undefined | number | string | Record<string, unknown>, options?: Record<string, unknown> | boolean): void

  loadingShow (wait: boolean): void

  loadingHide (): void

  withRecord (context: Context, success: Function, noItems?: Function, tooManySelected?: Function): void

  actionSchemaConfirm (payload: Record<string, unknown>, action: Function, alias: string): void

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

  $confirm (message: string | Record<string, unknown>, options?: Record<string, unknown>): Promise<Record<string, unknown>>

  $alert (message: string | Record<string, unknown>, options?: Record<string, unknown>): void

  $lang (path: string, fallback?: string | string[]): string | Record<string, unknown>

  $can (namespace: string): boolean

  $message: Message
}

/**
 * @typedef {SchemaForm}
 */
export interface SchemaForm extends Component {
  $payload: Record<string, unknown>

  fetchRecord(): Promise<Record<string, unknown>>
}

/**
 * @typedef {SchemaTable}
 */
export interface SchemaTable extends Component {
  fetchRecords (): Promise<Record<string, unknown>>
}
