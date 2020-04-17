import { SCOPES } from 'src/app/Agnostic/enum'
import { primaryKey } from 'src/settings/schema'

/**
 * @param {string} path
 * @param {string} redirect
 * @returns {RouteConfig}
 */
export const redirect = (path, redirect) => {
  // noinspection JSValidateTypes
  return { path, redirect }
}

/**
 * @param {string} path
 * @param {function} component
 * @param {string} [name]
 * @param {Object} [meta]
 * @returns {RouteConfig}
 */
export const route = (
  path,
  component,
  name = undefined,
  meta = {}
) => {
  // noinspection JSValidateTypes
  return { path, name, component, meta }
}

/**
 * @param {string} path
 * @param {function} component
 * @param {Array} [children]
 * @param {Object} [meta]
 * @returns {RouteConfig}
 */
export const group = (
  path,
  component,
  children = [],
  meta = {}
) => {
  // noinspection JSValidateTypes
  return { path, component, children, meta: { scope: 'group', ...meta } }
}

/**
 * @param {string} domain
 * @param {string} path
 * @param {function} table
 * @param {function} form
 * @param {Object} [options]
 * @returns {Array<RouteConfig>}
 */
export const crud = (
  domain,
  path,
  table,
  form,
  options = {}
) => {
  let key = primaryKey
  if (options && options.id) {
    key = options.id
    delete options.id
  }

  let prefix = domain
  if (options && options.prefix) {
    prefix = options.prefix
    delete options.prefix
  }

  const creator = (_path, _component, _name, _scope) => {
    const meta = { ...options, prefix, namespace: `${domain}.${_name}`, scope: _scope }
    return route(`${path}/${_path}`, _component, `${prefix}.${_name}`, meta)
  }

  // noinspection JSValidateTypes
  return [
    creator('', table, 'index', SCOPES.SCOPE_INDEX),
    creator('trash', table, 'trash', SCOPES.SCOPE_TRASH),
    creator('add', form, 'add', SCOPES.SCOPE_ADD),
    creator(`:${key}`, form, 'view', SCOPES.SCOPE_VIEW),
    creator(`:${key}/edit`, form, 'edit', SCOPES.SCOPE_EDIT)
  ]
}
