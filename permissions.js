import $lang from '@devitools/Lang'
import { RULES } from 'src/settings/schema'

/**
 * @param {string} namespace
 * @param {string} icon
 * @param {[]} children
 * @returns {{children: *, namespace: *, icon: *, label: *}}
 */
export const permissionGroup = (namespace, icon, children) => {
  return {
    label: $lang(`permissions.${namespace}`),
    namespace,
    icon,
    children
  }
}

/**
 * @param {string} domain
 * @return {{icon: string, namespace: string, label: string}}
 */
export const permissionAvailable = (domain) => {
  return {
    label: $lang(`permissions.${domain}.${RULES.LEVEL_AVAILABLE}`),
    namespace: `${domain}.${RULES.LEVEL_AVAILABLE}`,
    icon: 'done'
  }
}

/**
 * @param {string} namespace
 * @param {string} icon
 * @returns {{level: *, domain: *, namespace: string, icon: *, label: *}}
 */
export const permissionLevelNamespace = (namespace, icon) => {
  return {
    label: $lang(`permissions.${namespace}`),
    namespace,
    icon
  }
}

/**
 * @param {string} domain
 * @param {string} icon
 * @param {string} level
 * @returns {{level: string, domain: string, namespace: string, icon: string, label: string}}
 */
export const permissionLevel = (domain, icon, level) => {
  return {
    label: $lang(`permissions.${domain}.${level}`),
    namespace: `${domain}.${level}`,
    domain,
    level,
    icon
  }
}

/**
 * @param {{domain: string, icon: string}} view
 * @returns {{namespace: string, icon: *, label: *}}
 */
export const permissionSingle = (view) => {
  return {
    label: $lang(`permissions.${view.domain}`),
    namespace: `${view.domain}`,
    icon: view.icon
  }
}

/**
 * @param domain
 * @param filterBy
 * @returns {{level: string, domain: string, namespace: string, icon: string, label: string}[]}
 */
export const permissionLevels = (domain, filterBy = []) => {
  const children = [
    permissionLevel(domain, 'dvr', RULES.LEVEL_INDEX),
    permissionLevel(domain, 'restore', RULES.LEVEL_TRASH),
    permissionLevel(domain, 'add', RULES.LEVEL_ADD),
    permissionLevel(domain, 'visibility', RULES.LEVEL_VIEW),
    permissionLevel(domain, 'edit', RULES.LEVEL_EDIT),
    permissionLevel(domain, 'delete', RULES.LEVEL_DESTROY)
  ]

  if (!filterBy || !filterBy.length) {
    return children
  }
  return children.filter((kid) => filterBy.includes(kid.level))
}

/**
 * @param {string} domain
 * @param {string[]} filterBy
 * @param {[]} levels
 * @return {{children: [{namespace: string, label: string}], icon: string, namespace: string, label: string}}
 */
export const permissionActions = (domain, filterBy = [], levels = []) => {
  const actions = permissionLevels(domain, filterBy)
  if (levels.length) {
    actions.push(...levels)
  }
  return {
    label: $lang('permissions.actions'),
    icon: 'lock_open',
    namespace: `${domain}.actions`,
    children: actions
  }
}

/**
 * @param {string} view
 * @param {string[]} filterBy
 * @param {[]} levels
 * @param {[]} additional
 * @return {{children: [{icon: string, namespace: string, label: string}, {children: {namespace: string, label: string}[], icon: string, namespace: string, label: string}], namespace: *, icon: *, label: *}}
 */
export const permission = (view, filterBy = [], levels = [], additional = []) => {
  const children = [
    permissionAvailable(view.domain),
    permissionActions(view.domain, filterBy, levels)
  ]
  if (additional.length) {
    children.push(...additional)
  }

  return {
    namespace: view.domain,
    label: $lang(`permissions.${view.domain}`),
    icon: view.icon,
    children
  }
}
