import { validation } from '../en-us'

/**
 */
export default {
  ...validation,
  required: 'Campo obrigatório',
  minLength: 'Mínimo de {min} caracteres',
  maxLength: 'Máximo de {max} caracteres',
  minValue: 'O valor informado ultrapassa o valor mínimo',
  maxValue: 'O valor informado ultrapassa o valor máximo',
  between: 'O valor informado ultrapassa os limites',
  alpha: 'O valor deve ser uma letra',
  alphaNum: 'O valor deve ser um alfa numérico',
  numeric: 'O valor deve ser um número válido',
  integer: 'O valor deve ser um número inteiro',
  decimal: 'O valor deve ser um número decimal',
  email: 'O valor informado deve ser um email válido',
  ipAddress: 'O valor deve ser um IP válido',
  macAddress: 'O valor deve ser um MAC address válido',
  password: 'Password must have letters, numbers and at least six chars',
  notFound: 'Registro não encontrado'
}
