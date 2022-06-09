import { replacement } from '../Util/string'

/**
 * @interface {Payload}
 */
interface Payload {
  cep: string
  uf: string
  localidade: string
  bairro: string
  logradouro: string
  complemento: string
  ibge?: string
  unidade?: string
  gia?: string
  erro?: boolean
}

export type Localization = {
  zip: string
  state: string
  city: string
  neighborhood: string
  address: string
  complement?: string
  number?: string
  ibge?: string
  gia?: string
}

/**
 * @link https://viacep.com.br
 *
 * @type {Locator}
 */
export default class Locator {
  /**
   * @var {string}
   */
  uri = 'https://opencep.com/v1/{zip}.json'
  // uri = 'https://viazip.com.br/ws/{zip}/json?callback=callback'

  /**
   * @var {string}
   */
  strategy = 'xhr'
  // strategy: string = 'jsonp'

  /**
   * @returns {Locator}
   */
  static build () {
    return new this()
  }

  /**
   * @param {string} zip
   */
  query (zip: string): Promise<Localization> {
    const uri = replacement(this.uri, { zip })

    if (this.strategy === 'jsonp') {
      return new Promise((resolve, reject) => {
        const callback = function (response: Payload) {
          if (response.erro) {
            reject()
            return
          }

          resolve({
            zip: response.cep,
            address: response.logradouro,
            complement: response.complemento,
            neighborhood: response.bairro,
            city: response.localidade,
            state: response.uf,
            ibge: response.ibge,
            gia: response.gia
          })
        }
        // @ts-ignore
        window.callback = callback

        const request = document.createElement('script')
        request.src = uri
        document.body.appendChild(request)
      })
    }

    return new Promise((resolve, reject) => {
      fetch(uri)
        .then((response) => response.json())
        .then((response: Payload) => resolve({
          zip: response.cep,
          address: response.logradouro,
          complement: response.complemento,
          neighborhood: response.bairro,
          city: response.localidade,
          state: response.uf,
          ibge: response.ibge,
          gia: response.gia
        }))
        .catch((error) => reject(error))
    })
  }
}
