import validation from 'vuelidate'

import * as messages from './message'

import $lang from './Lang'
import * as components from './Components'
import util from './Util'

import { browse, clone } from './Util/general'

import './polyfill'
import $store from './store'

/**
 * @param {Vue} Vue
 */
export default ({ Vue }) => {
  /**
   */
  Vue.use(validation)

  /**
   */
  Object.keys(components).forEach((key) => {
    // eslint-disable-next-line import/namespace
    Vue.component(key, components[key])
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$lang', {
    get () {
      /**
       * @param {string|array} path
       * @param {string} fallback
       * @returns {*}
       */
      return (path, fallback = '') => {
        if (typeof path === 'string') {
          fallback = path
          path = [path, `domains.${this.domain}.${path}`]
        }
        return $lang(path, fallback)
      }
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$browse', {
    get () {
      return browse
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$dev', {
    get () {
      /* return process.env.VUE_APP_DEV */
      return process.env.NODE_ENV !== 'production'
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$log', {
    get () {
      return process.env.NODE_ENV !== 'production' ? console.log : () => undefined
    }
  })

  let $memory = {}
  /**
   */
  Object.defineProperty(Vue.prototype, '$memory', {
    get () {
      return {
        /**
         * @param {string} index
         * @returns {undefined|*}
         */
        get (index) {
          if ($store.state.purging) {
            return undefined
          }

          return $memory[index]
        },
        /**
         * @param {string} index
         * @param {*} value
         */
        set (index, value) {
          if ($store.state.purging) {
            return
          }

          $memory[index] = value
        },
        /**
         */
        clear () {
          $memory = {}
        }
      }
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$service', {
    get () {
      if (this.$options && this.$options.service) {
        return this.$options.service
      }
      if (this.service) {
        return this.service
      }
      throw new Error('The component doesn\'t have a service')
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$message', {
    get () {
      return messages
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$util', {
    get () {
      const base = util(this)
      if (this.$options && this.$options.util) {
        return Object.assign({}, base, this.$options.util)
      }
      if (this.$props && this.$props.util) {
        return Object.assign({}, base, this.$props.util)
      }
      return base
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$user', {
    get () {
      return (property = '') => {
        if (!property) {
          return this.$store.getters['auth/getUser']
        }
        return this.$util.get(this.$store.getters['auth/getUser'], property)
      }
    }
  })
}
