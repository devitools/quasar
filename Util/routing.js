import { primaryKey, resourceRoutes } from 'src/settings/schema'

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
 * @param {Object|boolean|function} props
 * @returns {RouteConfig}
 */
export const route = (
  path,
  component,
  name = undefined,
  meta = {},
  props = undefined
) => {
  // noinspection JSValidateTypes
  return { path, name, component, meta, props }
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

  if (options && options.domain) {
    domain = options.domain
    delete options.domain
  }

  const creator = (resource, component, name, level, scope) => {
    const namespace = `${domain}.${level}`
    const meta = { ...options, scope, domain, level, namespace }
    return route(`${path}/${resource}`, component, `${domain}.${name}`, meta, { path })
  }

  return resourceRoutes(creator, table, form, key, options)
}

/**
 * @param {string|Object} settings
 * @param {Object[]} children
 * @return {RouteConfig}
 */
export const resource = (settings, children = []) => {
  const path = settings.path
  const domain = settings.domain
  const table = settings.table
  const form = settings.form

  const component = () => import('../Components/Group/Group.vue')
  const kids = crud(domain, path, table, form)
  const meta = { domain, resource }

  return group(path, component, [...kids, ...children], meta)
}
