// noinspection NpmUsedModulesInstalled
import VueRouter from 'vue-router'
import { crud, group, redirect, route } from '../Util/routing'
import { clone } from '../Util/general'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

/**
 * @extends VueRouter
 * @class AppRouter
 */
export default class AppRouter extends VueRouter {
  /**
   * @type {RouteConfig[]}
   */
  __routes = []

  /**
   * @type {RouteConfig[]}
   */
  grouping = []

  /**
   * @param {string} path
   * @param {function} component
   * @param {Object} [options]
   * @returns {AppRouter}
   */
  addRoute (path, component, options = {}) {
    const { name } = options
    this.addRoutes([route(path, component, name, options)])
    return this
  }

  /**
   * @param {RouteConfig[]} routes
   * @param routes
   */
  addRoutes (routes) {
    this.__routes.push(...routes)
    super.addRoutes(routes)
  }

  /**
   * @returns {RouteConfig[]}
   */
  getRoutes () {
    return this.__routes
  }

  /**
   * @returns {string[]}
   */
  getNamespaces () {
    /**
     * @param {string[]} accumulator
     * @param {RouteConfig} routeConfig
     * @returns {string[]}
     * @private
     */
    const __getNamespaces = (accumulator, routeConfig) => {
      if (routeConfig.meta && routeConfig.meta.namespace) {
        accumulator.push(routeConfig.meta.namespace)
      }
      if (routeConfig.children) {
        // noinspection JSCheckFunctionSignatures,JSValidateTypes
        return routeConfig.children.reduce(__getNamespaces, accumulator)
      }
      return accumulator
    }
    // noinspection JSCheckFunctionSignatures,JSValidateTypes
    return this.__routes.reduce(__getNamespaces, [])
  }

  /**
   * @param {string} path
   * @param {function} component
   * @param {Object} [options]
   * @returns {AppRouter}
   */
  route (path, component, options = {}) {
    const { name } = options
    return this.routes([route(path, component, name, options)])
  }

  /**
   * @param {string} source
   * @param {string} target
   * @returns {AppRouter}
   */
  redirect (source, target) {
    return this.routes([redirect(source, target)])
  }

  /**
   * @param {string|Object} resource
   * @param {string} domain
   * @param {function} table
   * @param {function} form
   * @returns {AppRouter}
   */
  resource (resource, domain = undefined, table = undefined, form = undefined) {
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

    return this.routes([group(path, component, children, meta)])
  }

  /**
   * @param {RouteConfig[]} routes
   * @returns {AppRouter}
   */
  routes (routes) {
    this.grouping.push(...routes)
    return this
  }

  /**
   * @param {string} path
   * @param {function} component
   * @param {function(AppRouter, string):void} handler called when done
   * @param {Object} meta
   * @returns {AppRouter}
   */
  group (path, component, handler, meta = {}) {
    this.grouping = []
    const options = handler(this, path)
    if (typeof options === 'object') {
      meta = { ...meta, ...options }
    }
    const children = clone(this.grouping)
    const namespace = path.replace(/\//g, '.')

    const __routes = [
      group(path, component, children, { namespace, ...meta })
    ]

    this.addRoutes(__routes)
    return this
  }

  /**
   * @param middleware
   * @return {function}
   */
  beforeEach (middleware) {
    return super.beforeEach(middleware)
  }

  /**
   * @param {string} path
   * @param {function} callable
   */
  beforeThis (path, callable) {
    if (typeof callable !== 'function') {
      throw new Error('AppRouter.match: callable must be a function')
    }
    this.beforeEach((to, from, next) => {
      if (to.path === path) {
        callable(to, from, next)
        return
      }
      next()
    })
  }
}
