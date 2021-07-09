import { replacement } from '../Util/string'
import Http from './Http'

export type Localization = {
  zip: string
  address: string
  complement: string
  neighborhood: string
  city: string
  state: string
  country: string
  ibge: string
  gia: string
  lat: string | null
  lng: string | null
  ddd: string
  siafi: string
}

/**
 *
 * @type {Address}
 */
export default class Address extends Http {
  /**
   * @var {string}
   */
  uri = '/service/address/{zipCode}'

  /**
   * @returns {Address}
   */
  static build () {
    return new this()
  }

  /**
   * @param {string} zipCode
   */
  query (zipCode: string): Promise<Localization> {
    const url = replacement(this.uri, { zipCode })
    return this.get(url)
  }
}
