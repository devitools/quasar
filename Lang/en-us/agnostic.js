import { primaryKey } from 'src/settings/schema'

import actions from './actions'

/**
 * @type {Object}
 */
export default {
  table: {
    search: 'Search...',
    columns: 'Columns'
  },
  filter: {
    select: 'Select a correct filter'
  },
  fields: {
    [primaryKey]: 'Id',
    createdAt: 'Created at',
    updatedAt: 'Updated at',
    deletedAt: 'Deleted at',
    createdBy: 'Created by',
    updatedBy: 'Updated by',
    deletedBy: 'Deleted by'
  },
  components: {
    array: {
      empty: 'Use the button {button} to add items',
      options: 'Options'
    },
    appSelectRemote: {
      noResults: 'The collection is empty',
      searching: 'Searching...',
      confirm: 'Confirm',
      cancel: 'Cancel',
      clear: 'Clear Selection',
      search: 'Search',
      notFound: '-',
      placeholder: 'Type to search...'
    },
    password: {
      copied: 'A new password was created and has been copied to clipboard',
      generator: {
        tooltip: 'Create a new password with {length} characters'
      },
      visible: {
        tooltip: 'Make the password temporally visible'
      }
    },
    image: {
      button: 'Select an image'
    },
    file: {
      download: 'Click here to download the file',
      downloadName: 'file'
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
    builtin: {
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
      title: 'Warning'
    },
    confirm: {
      title: 'Confirm'
    },
    prompt: {
      title: 'Prompt'
    }
  },
  options: {
    gender: {
      male: 'Male',
      female: 'Female'
    },
    yesNo: {
      yes: 'Yes',
      no: 'No'
    }
  },
  actions: actions
}
