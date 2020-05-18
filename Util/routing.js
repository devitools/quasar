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

  if (options && options.domain) {
    domain = options.domain
    delete options.domain
  }

  const creator = (resource, component, name, scope) => {
    const meta = { ...options, domain, namespace: `${domain}.${name}`, scope: scope }
    return route(`${path}/${resource}`, component, `${domain}.${name}`, meta)
  }

  return resourceRoutes(creator, table, form, key, options)
}

/**
 * @param {string|Object} resource
 * @param {string} domain
 * @param {function} table
 * @param {function} form
 * @return {RouteConfig}
 */
export const resource = (resource, domain = undefined, table = undefined, form = undefined) => {
  let path = resource
  if (typeof resource === 'object') {
    path = resource.path
    domain = resource.domain
    table = resource.table
    form = resource.form
  }
  const component = () => import('../Components/Group/Group.vue')
  const children = crud(domain, path, table, form)
  const meta = { prefix: domain }

  return group(path, component, children, meta)
}
