import { auth } from '../en-us'

/**
 */
export default {
  ...auth,
  signIn: {
    title: 'Bem vindo!',
    login: 'E-mail',
    password: 'Senha',
    button: 'Entrar',
    goToRegister: 'Quero me cadastrar',
    forgotPassword: 'Esqueci minha senha',
    error: 'E-mail ou senha incorretos'
  },
  register: {
    title: 'Vamos lá! Insira suas informações',
    name: 'Nome',
    login: 'E-mail',
    password: 'Senha',
    confirmPassword: 'Confirmação de Senha',
    phone: 'Celular',
    role: 'Perfil do negócio',
    person: 'Pessoa',
    createAccount: 'Registrar',
    backToLogin: 'voltar ao login',
    error: 'Erro inesperado'
  },
  forgotPassword: {
    title: 'Recuperar senha',
    login: 'E-mail',
    reset: 'enviar',
    backToLogin: 'voltar ao login',
    error: 'Erro inesperado',
    success: 'E-mail de recuperação enviado com sucesso'
  }
}
