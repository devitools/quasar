import { POSITIONS, SCOPES } from '../../enum'

export default {
  /**
   */
  defaultActionsBuiltIn () {
    const schema = this
    if (!schema.constructor.activateBuiltIn) {
      return
    }

    this.addAction('builtinAdd')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP])
      .actionIcon('add')
      .actionOn('click', function () {
        this.actionBuiltInAdd()
      })

    this.addAction('builtinCancel')
      .actionScopes([SCOPES.SCOPE_ADD, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('cancel')
      .actionFloatRight()
      .actionOn('click', function () {
        this.actionBuiltInCancel()
      })

    this.addAction('builtinBack')
      .actionScopes([SCOPES.SCOPE_VIEW])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('reply')
      .actionOn('click', function () {
        this.actionBuiltInBack()
      })

    this.addAction('builtinApply')
      .actionScopes([SCOPES.SCOPE_ADD, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('system_update_alt')
      .actionColor('primary')
      .actionFloatRight()
      .actionOn('click', function () {
        this.actionBuiltInApply()
      })

    this.addAction('builtinView')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('visibility')
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.actionBuiltInView(record)
      })

    this.addAction('builtinEdit')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('edit')
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.actionBuiltInEdit(record)
      })

    this.addAction('builtinDestroy')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('delete')
      .actionColor('negative')
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.actionBuiltInDestroy(record)
      })
  }
}
