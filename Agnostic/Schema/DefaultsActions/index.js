import DefaultsActionsSchema from 'src/app/Agnostic/Schema/DefaultsActions/DefaultsActionsSchema'
import DefaultsActionsSchemaHandler from 'src/app/Agnostic/Schema/DefaultsActions/DefaultsActionsSchemaHandler'
import DefaultsActionsEmbed from 'src/app/Agnostic/Schema/DefaultsActions/DefaultsActionsEmbed'
import DefaultsActionsBuiltIn from 'src/app/Agnostic/Schema/DefaultsActions/DefaultsActionsBuiltIn'

/**
 */
export default {
  ...DefaultsActionsSchema,

  ...DefaultsActionsSchemaHandler,

  ...DefaultsActionsEmbed,

  ...DefaultsActionsBuiltIn
}
