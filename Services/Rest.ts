import { filterKey, primaryKey, searchKey } from 'src/settings/schema'
import { parseRestRecord, parseRestRecords } from 'src/settings/rest'

import Http from '@devitools/Services/Http'
import { Pagination } from '../Agnostic/Helper/interfaces'
import { $store } from 'src/store'

import { get, is, serialize, unSerialize, withoutSeparator } from '../Util/general'
import { replacement } from '../Util/string'

/**
 * @class {Rest}
 */
export default abstract class Rest extends Http {
  /**
   * @type {string}
   */
  path = '/api/v1'

  /**
   * @type {string}
   */
  resource = '/please/override/resource'

  /**
   * @type {string}
   */
  primaryKey = primaryKey

  /**
   * @type {number}
   */
  size = 10

  /**
   * @type {Object}
   */
  __resourceParams = {}

  /**
   * @type {Object}
   */
  $store = {}

  /**
   * @type {Array}
   */
  filterable = []

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  create (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    if ($store.getters['app/getOffline'] || this.offline) {
      return new Promise((resolve, reject) => {
        reject('Unsupported action create')
      })
    }
    return this.post(this.getResource(), record, config)
  }

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {boolean} trash
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  read (record: string | number | Record<string, unknown> | FormData, trash = false, config: Record<string, unknown> = {}) {
    let queryString = ''
    if (trash) {
      queryString = '?trash=true'
    }

    if ($store.getters['app/getOffline'] || this.offline) {
      return this.readOffline(record, trash)
    }
    const url = `${this.getResource()}/${this.getId(record)}${queryString}`
    // @ts-ignore
    const parse = parseRestRecord()
    return this
      .get(url, config)
      .then((response) => parse(response))
  }

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  update (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    if ($store.getters['app/getOffline'] || this.offline) {
      return this.updateOffline(record)
    }
    const id = this.getId(record)
    const resource = this.getResource()
    const url = `${resource}/${id}`

    if (record instanceof FormData) {
      return this.post(url, record, config)
    }
    return this.patch(url, record, config)
  }

  /**
   * @param {Record<string, unknown>} record
   * @param {Record<string, unknown>} config
   * @returns {Promise<unknown>}
   */
  destroy (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    if ($store.getters['app/getOffline'] || this.offline) {
      return new Promise((resolve, reject) => {
        reject('Unsupported action create')
      })
    }
    const { erase } = config
    const _erase = erase ? '/erase' : ''
    const url = `${this.getResource()}/${this.getId(record)}${_erase}`
    return this.delete(url, config)
  }

  /**
   * @param {record: string | number | Record<string, unknown> | FormData} record
   * @param {Record<string, unknown>} config
   * @returns {Promise}
   */
  restore (record: string | number | Record<string, unknown> | FormData, config: Record<string, unknown> = {}) {
    const url = `${this.getResource()}/${this.getId(record)}/restore`
    return this.put(url, undefined, config)
  }

  /**
   * @param {Record<string, string | number>} parameters
   * @param {Array<string>} [filters] = []
   * @param {boolean} [trash] = false
   * @return {Promise<Pagination>}
   */
  paginate (parameters: Record<string, unknown>, filters?: string[], trash?: boolean): Promise<Pagination> {
    // paginate (parameters, filters, trash = false) {
    const { pagination, [filterKey]: filter, [searchKey]: where, raw } = parameters

    const size = get(pagination, 'rowsPerPage', this.size)
    const sortBy = get(pagination, 'sortBy')
    const descending = get(pagination, 'descending')
    const page = get(pagination, 'page', 1)

    let sort
    if (sortBy) {
      const direction = descending ? 'desc' : 'asc'
      sort = `${sortBy}.${direction}`
    }

    if ($store.getters['app/getOffline'] || this.offline) {
      return this.searchOffline({ page, size, sort, filter, where, raw, trash })
    }

    // @ts-ignore
    const parse = parseRestRecords({ rowsPerPage: size, sortBy, descending, page })
    return this
      .search({ page, size, sort, filter, where, raw, trash })
      .then((response) => parse(response))
  }

  /**
   * Ex.: query({ page, size, sort, filter, where })
   * @param {Object} parameters
   * @param {Object} config
   * @returns {Promise}
   */
  search (parameters = {}, config: Record<string, unknown> = {}) {
    const queryString = this.searchQueryString(parameters, '&')
    return this.get(`${this.getResource()}?${queryString}`, config)
  }

  /**
   * @param {Record<string, unknown>} parameters
   * @param {string} separator
   * @returns {string}
   */
  searchQueryString (parameters: Record<string, unknown> = {}, separator: string) {
    const elements = []
    const { raw, page, size, sort, filter, where, trash } = parameters
    if (is(page)) {
      elements.push(`page=${page}`)
    }
    if (is(size)) {
      elements.push(`size=${size}`)
    }
    if (is(sort)) {
      elements.push(`sort=${sort}`)
    }
    if (is(trash)) {
      elements.push('trash=true')
    }
    if (is(filter)) {
      elements.push(`${filterKey}=${filter}`)
    }
    if (is(raw)) {
      elements.push(typeof raw === 'string' ? raw : serialize(raw))
    }
    if (is(where)) {
      elements.push(typeof where === 'string' ? where : serialize(where, searchKey))
    }
    return elements.join(separator)
  }

  /**
   * @param {string[]} records
   * @param {Object} config
   * @returns {Promise}
   */
  remove (records: string[], config: Record<string, unknown> = {}) {
    const callback = (record: string) => this.getId(record)
    const remove = records.map(callback).join(',')
    const { erase } = config
    const _erase = erase ? '/erase' : ''
    if (records.length === 1) {
      return this.delete(`${this.getResource()}/${remove}${_erase}`)
    }
    return this.delete(`${this.getResource()}/[${remove}]${_erase}`)
  }

  /**
   * @param {Record<string, unknown>} resourceParams
   * @param {boolean} override
   * @returns {this}
   */
  resourceParams (resourceParams: Record<string, unknown>, override = true) {
    if (!override && is(this.__resourceParams)) {
      return this
    }
    this.__resourceParams = resourceParams
    return this
  }

  /**
   * @returns {string}
   */
  getResource () {
    if (is(this.__resourceParams)) {
      return replacement(this.resource, this.__resourceParams)
    }
    return this.resource
  }

  /**
   * @param {record: string | number | Record<string, unknown> | FormData} record
   * @returns {string}
   */
  getId (record: string | number | Record<string, unknown> | FormData): string {
    if (typeof record === 'string' || typeof record === 'number') {
      return String(record)
    }
    if (record instanceof FormData) {
      return String(record.get(this.primaryKey))
    }
    return String(record[this.primaryKey])
  }

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @param {boolean} trash
   * @returns {Promise}
   */
  readOffline (record: string | number | Record<string, unknown> | FormData, trash = false) {
    const executor = (resolve: Function) => {
      const read = () => {
        const id = this.getId(record)
        const data = this.getOfflineRecord(id)
        const response = { data }
        resolve(response)
      }
      window.setTimeout(read, 100)
    }
    return new Promise(executor)
  }

  /**
   * @param {string | number | Record<string, unknown> | FormData} record
   * @returns {Promise}
   */
  updateOffline (record: string | number | Record<string, unknown> | FormData) {
    const executor = (resolve: Function, reject: Function) => {
      const update = () => {
        const id = this.getId(record)
        const data = this.getOfflineRecord(id)
        if (!data) {
          reject({ type: 'notFound' })
          return
        }
        if (typeof record === 'object') {
          record = { ...data, ...record }
        } else {
          record = data
        }
        const response = this.setOfflineRecord(id, record)
        resolve(response)
      }
      window.setTimeout(update, 100)
    }
    return new Promise(executor)
  }

  /**
   * @param {Object} parameters
   * @returns {Promise<Pagination>}
   */
  searchOffline (parameters: Record<string, unknown>): Promise<Pagination> {
    const executor = (resolve: Function) => {
      const search = () => {
        // sort, raw, trash
        const { page, size: rowsPerPage, where, filter } = parameters

        const records = this
          .getOfflineRecords()
          .filter((record: Record<string, unknown>) => {
            if (is(where)) {
              return this.searchOfflineWhere(record, String(where))
            }
            if (is(filter)) {
              return this.searchOfflineFilter(record, String(filter))
            }
            return true
          })

        const rowsNumber = records.length
        const pagesNumber = Math.ceil(rowsNumber / Number(rowsPerPage))
        const offset = (Number(page) - 1) * Number(rowsPerPage)
        const rows = records.slice(offset, offset + Number(rowsPerPage))

        resolve({ rows, rowsPerPage, rowsNumber, pagesNumber, page })
      }
      window.setTimeout(search, 100)
    }
    return new Promise(executor)
  }

  /**
   * @param {Record<string, unknown>} record
   * @param {string} where
   * @returns {boolean}
   */
  searchOfflineWhere (record: Record<string, unknown>, where: string) {
    const unSerialized: Record<string, unknown> = unSerialize(where, searchKey)
    for (const key in unSerialized) {
      if (!unSerialized.hasOwnProperty(key)) {
        continue
      }
      const value = withoutSeparator(unSerialized[key])
      if (!String(record[key]).toLowerCase().includes(String(value).toLowerCase())) {
        return false
      }
    }
    return true
  }

  /**
   * @param {Record<string, unknown>} record
   * @param {string} filter
   * @returns {boolean}
   */
  searchOfflineFilter (record: Record<string, unknown>, filter: string) {
    for (const field in record) {
      if (!record.hasOwnProperty(field)) {
        continue
      }
      // @ts-ignore
      if (!this.filterable.includes(field)) {
        continue
      }
      if (String(record[field]).toLowerCase().includes(String(filter).toLowerCase())) {
        return true
      }
    }
    return false
  }

  /**
   * @returns {Array}
   * @private
   */
  getOfflineRecords () {
    if (!this.$store) {
      return []
    }
    // @ts-ignore
    if (!Array.isArray(this.$store.state.records)) {
      return []
    }
    // @ts-ignore
    return this.$store.state.records
  }

  /**
   * @param id
   * @returns {Object}
   * @private
   */
  getOfflineRecord (id: string) {
    const records = this.getOfflineRecords()
    return records.find((record: Record<string, unknown>) => record[this.primaryKey] === id)
  }

  /**
   * @param {string} id
   * @param {string | number | Record<string, unknown> | FormData} record
   * @returns {Object}
   * @private
   */
  setOfflineRecord (id: string, record: string | number | Record<string, unknown> | FormData) {
    if (!this.$store) {
      return undefined
    }
    // @ts-ignore
    this.$store.commit('updateRecord', record)
    return { data: { ticket: id } }
  }
}
