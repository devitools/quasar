/**
 * @type {Readonly<{SCOPE_REMOVE: string, SCOPE_ADD: string, SCOPE_EDIT: string, SCOPE_TRASH: string, SCOPE_INDEX: string, SCOPE_VIEW: string}>}
 */
export const SCOPES = Object.freeze({
  SCOPE_INDEX: 'scope-index',
  SCOPE_ADD: 'scope-add',
  SCOPE_VIEW: 'scope-view',
  SCOPE_EDIT: 'scope-edit',
  SCOPE_REMOVE: 'scope-remove',
  SCOPE_TRASH: 'scope-trash'
})

/**
 * @return {Array}
 */
export const scopes = () => Object.values(SCOPES)

/**
 * @type {Readonly<{POSITION_TABLE_SEARCH: string, POSITION_FORM_FOOTER: string, POSITION_TABLE_TOP: string, POSITION_TABLE_FLOAT: string, POSITION_TABLE_CELL: string}>}
 */
export const POSITIONS = Object.freeze({
  POSITION_TABLE_TOP: 'table-top',
  POSITION_TABLE_CELL: 'table-cell',
  POSITION_TABLE_FLOAT: 'table-float',
  POSITION_TABLE_SEARCH: 'table-search',
  POSITION_FORM_FOOTER: 'form-footer'
})

/**
 * @return {array}
 */
export const positions = () => Object.values(POSITIONS)

/**
 * @type {Readonly<{CURRENCY: string, AUTOMATIC: string, NIN: string, LIKE: string, IN: string, EQUAL: string, NOT_EQUAL: string}>}
 */
export const OPERATORS = Object.freeze({
  EQUAL: 'eq',
  NOT_EQUAL: 'neq',
  LIKE: 'like',
  IN: 'in',
  NIN: 'nin',
  CURRENCY: 'currency',
  AUTOMATIC: 'automatic'
})
