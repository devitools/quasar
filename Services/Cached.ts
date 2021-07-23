import Rest from './Rest'
import { get, invalidate, set } from '../Plugins/$cache'
// @ts-ignore
import MD5 from 'md5.js'

/**
 * @class {Cached}
 */
export default class Cached extends Rest {
  /**
   * Keep the cache for 5 minutes
   * @type {number}
   */
  ttl = 1000 * 60 * 5

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  async create (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    const response = await super.create(record, config)
    this.invalidate()
    return response
  }

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {boolean} trash
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  async read (record: string | number | Record<string, unknown> | FormData, trash = false, config: Record<string, unknown> = {}) {
    const pair = new MD5().update(`read-${this.getId(record)}`).digest('hex')
    const key = `${this.resource}:${pair}`
    const previous = get(key)
    if (previous) {
      return previous
    }
    const response = await super.read(record, trash, config)
    set(key, response, this.ttl)
    return response
  }

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  async update (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    const response = await super.update(record, config)
    this.invalidate()
    return response
  }

  /**
   * @param {Record<string, unknown>} record
   * @param {Record<string, unknown>} config
   * @returns {Promise<unknown>}
   */
  async destroy (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    const response = await super.destroy(record, config)
    this.invalidate()
    return response
  }

  /**
   * Ex.: query({ page, size, sort, filter, where })
   * @param {Object} parameters
   * @param {Object} config
   * @returns {Promise}
   */
  async search (parameters = {}, config: Record<string, unknown> = {}) {
    const queryString = this.searchQueryString(parameters, '&')
    const pair = new MD5().update(`search-${queryString}`).digest('hex')
    const key = `${this.resource}:${pair}`
    const previous = get(key)
    if (previous) {
      return previous
    }
    const response = await super.search(parameters, config)
    set(key, response, this.ttl)
    return response
  }

  /**
   * @return number
   */
  invalidate (): number {
    return invalidate(this.resource)
  }
}
