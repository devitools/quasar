import { replacement } from '../Util/string'
import { Localization, Payload, Provider } from '@devitools/Services/Locator/contracts'
import providers from './Locator/providers'

/**
 * @class {Locator}
 */
export default class Locator {
  provider: string

  constructor (provider = 'open') {
    this.provider = provider
  }

  /**
   * @returns {Locator}
   */
  static build (provider?: string): Locator {
    return new this(provider)
  }

  /**
   * @param {string} zip
   */
  query (zip: string): Promise<Localization> {
    const provider: Provider = providers[this.provider]
    if (!provider) {
      throw new Error(`Provider ${this.provider} not found`)
    }

    const uri = replacement(provider.uri, { zip })

    if (provider.strategy === 'jsonp') {
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
