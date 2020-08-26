import { RULES } from 'src/settings/schema'
import $lang from '../Lang'

/**
 * @deprecated
 *
 * @param {string} domain
 * @param {string} path
 * @param {string} icon
 * @param {boolean} separated
 * @returns {{path: *, label: *, icon: *, separated: *}}
 */
export const actionMenu = (domain, path, icon, separated = false) => {
  return actionEntry(domain, path, icon, separated)
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
  const { separated = false, i18n = '', meta = {} } = options
  const label = i18n ? `menu.${i18n}` : `menu.${domain}`
  return {
    label: $lang(label, label),
    namespace: namespace || `${domain}.${RULES.LEVEL_AVAILABLE}`,
    path: to,
    icon: icon,
    separated: separated,
    meta
  }
}

/**
 * @param {{path: string, icon: string, domain: string, meta: unknown}} index
 * @param {boolean} separated
 * @returns {{path: *, label: string, namespace: string, separated: boolean}}
 */
export const action = (index, separated = false) => {
  let to = index.path
  const { query, i18n, meta } = index
  if (query) {
    to = { path: to, query: typeof query === 'function' ? query(index) : query }
  }
  return actionEntry(index.domain, to, index.icon, index.namespace, { separated, i18n, meta })
}
