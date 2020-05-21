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

  const creator = (resource, component, name, scope) => {
    const namespace = `${domain}.${name}`
    const meta = { ...options, domain, scope, namespace }
    return route(`${path}/${resource}`, component, `${domain}.${name}`, meta, { path })
  }

  return resourceRoutes(creator, table, form, key, options)
}

/**
 * @param {string|Object} settings
 * @param {string|Object} domain
 * @param {function} table
 * @param {function} form
 * @return {RouteConfig}
 */
export const resource = (settings, domain = undefined, table = undefined, form = undefined) => {
  let path = settings
  if (typeof settings === 'object') {
    path = settings.path
    domain = settings.domain
    table = settings.table
    form = settings.form
  }

  let resource
  if (typeof domain === 'object') {
    domain = domain.domain
    resource = domain.resource
  }

  const component = () => import('../Components/Group/Group.vue')
  const children = crud(domain, path, table, form)
  const meta = { domain, resource }

  return group(path, component, children, meta)
}
