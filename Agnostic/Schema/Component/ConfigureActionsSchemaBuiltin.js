import { POSITIONS, SCOPES_BUILTIN } from '../../../Agnostic/enum'

/**
 * @class {ConfigureActionsSchemaBuiltin}
 */
export default class ConfigureActionsSchemaBuiltin {
  /**
   */
  configureActionsSchemaEmbed () {
    this.addAction('builtinAdd')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP])
      .actionIcon('add')
      .actionOn('click', function () {
        this.actionBuiltinAdd()
      })

    this.addAction('builtinCancel')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_ADD, SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('cancel')
      .actionFloatLeft()
      .actionOn('click', function () {
        this.actionBuiltinCancel()
      })

    this.addAction('builtinBack')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_VIEW])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('reply')
      .actionOn('click', function () {
        this.actionBuiltinBack()
      })

    this.addAction('builtinApply')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_ADD, SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('system_update_alt')
      .actionColor('positive')
      .actionFloatLeft()
      .actionOn('click', function () {
        this.actionBuiltinApply()
      })

    this.addAction('builtinView')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('visibility')
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.actionBuiltinView(record)
      })

    this.addAction('builtinEdit')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('edit')
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.actionBuiltinEdit(record)
      })

    this.addAction('builtinDestroy')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX, SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('delete')
      .actionColor('negative')
      .actionFloatRight()
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.actionBuiltinDestroy(record)
      })
  }
}
