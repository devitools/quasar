import { RULES } from 'src/settings/schema'
import $lang from '../Lang'

/**
 * @param {string} domain
 * @param {string} path
 * @param {string} icon
 * @param {boolean} separated
 * @returns {{path: *, label: *, icon: *, separated: *}}
 */
export const actionMenu = (domain, path, icon, separated = false) => {
  return { label: $lang(`menu.${domain}`, `menu.${domain}`), path, icon, separated }
}

/**
 * @param {string} domain
 * @param {string} icon
 * @param {[]} children
 * @param {boolean} separated
 * @returns {{children: *, label: *, icon: *, separated: boolean}}
 */
export const actionGroup = (domain, icon, children, separated = false) => {
  return {
    label: $lang(`menu.${domain}`, `menu.${domain}`),
    icon,
    separated,
    children
  }
}

/**
 * @param {string|Object} domain
 * @param {string} to
 * @param {string} icon
 * @param {string} namespace
 * @param {Record<string, unknown>} [options]
 * @returns {{path: *, label: string, namespace: string, separated: boolean}}
 */
export const actionEntry = (domain, to, icon, namespace = undefined, options = {}) => {
  const { separated = false, i18n = '' } = options
  const label = i18n ? `menu.${i18n}` : `menu.${domain}`
  return {
    label: $lang(label, label),
    namespace: namespace || `${domain}.${RULES.LEVEL_AVAILABLE}`,
    path: to,
    icon: icon,
    separated: separated
  }
}

/**
 * @param {{path: string, icon: string, domain: string}} view
 * @param {boolean} separated
 * @returns {{path: *, label: string, namespace: string, separated: boolean}}
 */
export const action = (view, separated = false) => {
  let to = view.path
  const { query, i18n } = view
  if (query) {
    to = { path: to, query: typeof query === 'function' ? query(view) : query }
  }
  return actionEntry(view.domain, to, view.icon, view.namespace, { separated, i18n })
}
