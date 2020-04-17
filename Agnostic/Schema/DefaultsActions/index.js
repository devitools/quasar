import DefaultsActionsSchema from '../../Schema/DefaultsActions/DefaultsActionsSchema'
import DefaultsActionsSchemaHandler from '../../Schema/DefaultsActions/DefaultsActionsSchemaHandler'
import DefaultsActionsEmbed from '../../Schema/DefaultsActions/DefaultsActionsEmbed'
import DefaultsActionsBuiltIn from '../../Schema/DefaultsActions/DefaultsActionsBuiltIn'

/**
 */
export default {
  ...DefaultsActionsSchema,

  ...DefaultsActionsSchemaHandler,

  ...DefaultsActionsEmbed,

  ...DefaultsActionsBuiltIn
}
