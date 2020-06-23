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
  return { label: $lang(`actions.${domain}`), path, icon, separated }
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
    label: $lang(`actions.${domain}`),
    icon,
    separated,
    children
  }
}

/**
 * @param {string|Object} domain
 * @param {string} path
 * @param {string} icon
 * @param {string} namespace
 * @param {boolean} separated
 * @returns {{path: string, label: string, namespace: string, separated: boolean}}
 */
export const actionEntry = (domain, path, icon, namespace = undefined, separated = false) => {
  return {
    label: $lang(`actions.${domain}`),
    namespace: namespace || `${domain}.${RULES.LEVEL_AVAILABLE}`,
    path: path,
    icon: icon,
    separated: separated
  }
}

/**
 * @param {{path: string, icon: string, domain: string}} view
 * @param {boolean} separated
 * @returns {{path: string, label: string, namespace: string, separated: boolean}}
 */
export const action = (view, separated = false) => {
  return actionEntry(view.domain, view.path, view.icon, view.namespace, separated)
}
