// noinspection NpmUsedModulesInstalled
import VueRouter from 'vue-router'
import { group, redirect, resource, route } from '../Util/routing'
import AppRouterGroup from './AppRouterGroup'

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
    this.routes([route(path, component, name, options)])
    return this
  }

  /**
   * @param {string} source
   * @param {string} target
   * @returns {AppRouter}
   */
  redirect (source, target) {
    this.routes([redirect(source, target)])
    return this
  }

  /**
   * @param {string|Object} route
   * @param {string} domain
   * @param {function} table
   * @param {function} form
   * @returns {AppRouter}
   */
  resource (route, domain = undefined, table = undefined, form = undefined) {
    return this.routes([resource(route, domain, table, form)])
  }

  /**
   * @param {RouteConfig[]} routes
   * @returns {AppRouter}
   */
  routes (routes) {
    this.addRoutes(routes)
    return this
  }

  /**
   * @param {string} path
   * @param {function} component
   * @param {function(AppRouterGroup, string):void} handler called when done
   * @param {Object} meta
   * @returns {AppRouter}
   */
  group (path, component, handler, meta = {}) {
    const appRouterGroup = AppRouterGroup.build()

    const options = handler(appRouterGroup, path)
    if (typeof options === 'object') {
      meta = { ...meta, ...options }
    }
    const children = appRouterGroup.getRoutes()
    const namespace = path.replace(/\//g, '.')

    const __routes = [
      group(path, component, children, { namespace, ...meta })
    ]
    // noinspection JSCheckFunctionSignatures
    this.routes(__routes)

    appRouterGroup.getBefore().forEach((before) => this.beforeEach(before))
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
