import { POSITIONS, SCOPES_BUILTIN } from '../../../Agnostic/enum'
import { INTERNAL_ATTRS } from 'src/settings/action'

/**
 * @class {ConfigureActionsSchemaBuiltin}
 */
export default class ConfigureActionsSchemaBuiltin {
  /**
   */
  configureActionsSchemaBuiltin () {
    this.addAction('builtinAdd')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP])
      .actionIcon('add')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionOn('click', function () {
        this.actionBuiltinAdd()
      })

    this.addAction('builtinCancel')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_ADD, SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('cancel')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionFloatLeft()
      .actionOn('click', function () {
        this.actionBuiltinCancel()
      })

    this.addAction('builtinBack')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_VIEW])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('reply')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionOn('click', function () {
        this.actionBuiltinBack()
      })

    this.addAction('builtinApply')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_ADD, SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('done')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionFloatLeft()
      .actionOn('click', function () {
        this.actionBuiltinApply()
      })

    this.addAction('builtinView')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('visibility')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.actionBuiltinView(record)
      })

    this.addAction('builtinEdit')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('edit')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.actionBuiltinEdit(record)
      })

    this.addAction('builtinDestroy')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX, SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('delete')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionFloatRight()
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.actionBuiltinDestroy(record)
      })
  }
}
