import { primaryKey } from 'src/settings/schema'

import { agnostic } from '../en-us'
import actions from './actions'

/**
 * @type {Object}
 */
export default {
  ...agnostic,
  table: {
    search: 'Pesquisar...',
    columns: 'Colunas'
  },
  filter: {
    select: 'Selecione o filtro corretamente'
  },
  fields: {
    [primaryKey]: 'Id',
    createdAt: 'Criado em',
    updatedAt: 'Atualizado em',
    deletedAt: 'Apagado em',
    createdBy: 'Criado por',
    updatedBy: 'Atualizado por',
    deletedBy: 'Apagado por'
  },
  components: {
    array: {
      empty: 'Use o botão {button} abaixo para adicionar itens',
      options: 'Opções'
    },
    appSelectRemote: {
      notFound: 'Não se aplica',
      noResults: 'A coleção está vazia',
      searching: 'Pesquisando...',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      clear: 'Limpar Seleção',
      search: 'Pesquisar'
    },
    image: {
      button: 'Selecione uma imagem'
    },
    embed: {
      actions: {
        embedCreate: actions.create,
        embedUpdate: actions.update,
        embedReset: actions.reset,
        embedAdd: actions.add,
        embedTrash: actions.trash,
        embedEdit: actions.edit,
        embedDestroy: actions.destroy,
        embedRestore: actions.restore,
        embedView: actions.view,
        embedHome: actions.home,
        embedBack: actions.back,
        embedPrint: actions.print,
        embedRefresh: actions.refresh,
        embedSortClear: actions.sortClear,
        embedSearch: actions.search,
        embedSearchClear: actions.searchClear
      }
    },
    builtIn: {
      form: {
        add: 'Novo',
        edit: 'Editar',
        view: 'Visualizar'
      },
      actions: {
        builtinAdd: {
          label: 'Novo',
          tooltip: 'Cria um novo item na lista de itens'
        },
        builtinBack: {
          label: 'Voltar',
          tooltip: 'Volta para a lista de itens'
        },
        builtinCancel: {
          label: 'Cancelar',
          tooltip: 'Desfazer alterações e voltar para a lista de itens'
        },
        builtinApply: {
          label: 'Aplicar',
          tooltip: 'Aplicar a alteração à lista de itens',
          validation: 'Verifique os campos destacados'
        },
        builtinView: {
          label: 'Visualizar',
          tooltip: 'Visualizar este item da lista de itens'
        },
        builtinEdit: {
          label: 'Editar',
          tooltip: 'Editar este item da lista de itens'
        },
        builtinDestroy: {
          label: 'Remover',
          tooltip: 'Remover este item da lista de itens',
          title: 'Remover',
          message: 'Deseja remover este item da lista de itens?'
        }
      }
    }
  },
  dialog: {
    alert: {
      title: 'Atenção'
    },
    confirm: {
      title: 'Confirmação'
    },
    prompt: {
      title: 'Informe'
    }
  },
  options: {
    gender: {
      male: 'Masculino',
      female: 'Feminino'
    },
    yesNo: {
      yes: 'Sim',
      no: 'Não'
    }
  },
  actions: actions
}
