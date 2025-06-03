export interface Payload {
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

export type Strategy = 'jsonp' | 'fetch'

export type Provider = {
  uri: string
  strategy: Strategy
}
