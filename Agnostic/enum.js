/**
 * @type {Object}
 */
export const SCOPES = Object.freeze({
  SCOPE_INDEX: 'scope-index',
  SCOPE_ADD: 'scope-add',
  SCOPE_VIEW: 'scope-view',
  SCOPE_EDIT: 'scope-edit',
  SCOPE_REMOVE: 'scope-remove',
  SCOPE_TRASH: 'scope-trash',
  SCOPE_MASTER_DETAIL_INDEX: 'scope-master-detail-index',
  SCOPE_MASTER_DETAIL_ADD: 'scope-master-detail-add',
  SCOPE_MASTER_DETAIL_VIEW: 'scope-master-detail-view',
  SCOPE_MASTER_DETAIL_EDIT: 'scope-master-detail-edit',
  SCOPE_MASTER_DETAIL_REMOVE: 'scope-master-detail-remove',
  SCOPE_MASTER_DETAIL_TRASH: 'scope-master-detail-trash'
})

/**
 * @return {Array}
 */
export const scopes = () => Object.values(SCOPES)

/**
 * @type {Object}
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
 * @type {Readonly<{Object}>}
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
