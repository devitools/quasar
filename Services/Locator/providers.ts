import { Provider } from './contracts'

const providers: Record<string, Provider> = {
  via: {
    uri: 'https://viacep.com.br/ws/{zip}/json?callback=callback',
    strategy: 'jsonp',
  },
  open: {
    uri: 'https://opencep.com/v1/{zip}.json',
    strategy: 'fetch'
  }
}
export default providers
