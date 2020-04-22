import { POSITIONS, SCOPES } from '../../enum'

/**
 */
export default {
  /**
   * defines: [
   'back',
   'print',
   'home',
   'create',
   'update',
   'view',
   'edit',
   'destroy',
   'trash',
   'restore',
   'erase',
   'sortClear',
   'refresh',
   'add',
   'search',
   'searchClear',
   ]
   */
  defaultActions () {
    const schema = this

    const readonly = schema.constructor.readonly

    this.addAction('back')
      .actionScopes([SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('reply')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionBack.call(this, { $event, schema, ...context })
      })

    this.addAction('print')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('print')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionPrint.call(this, { $event, schema, ...context })
      })

    this.addAction('home')
      .actionFloatRight()
      .actionScopes([SCOPES.SCOPE_TRASH, SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER, POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('dvr')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionHome.call(this, { $event, schema, ...context })
      })

    this.addAction('create')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_ADD])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionCreate.call(this, { $event, schema, ...context })
      })

    this.addAction('update')
      .actionScopes([SCOPES.SCOPE_EDIT])
      .actionPositions(readonly ? [] : [POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionUpdate.call(this, { $event, schema, ...context })
      })

    this.addAction('add')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('add')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionAdd.call(this, { $event, schema, ...context })
      })

    this.addAction('view')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT, POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('visibility')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionView.call(this, { $event, schema, ...context })
      })

    this.addAction('edit')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions(readonly ? [] : [POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT, POSITIONS.POSITION_TABLE_CELL])
      .actionColor('primary')
      .actionIcon('edit')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionEdit.call(this, { $event, schema, ...context })
      })

    this.addAction('destroy')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_INDEX, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([
        POSITIONS.POSITION_TABLE_CELL,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_TOP,
        POSITIONS.POSITION_FORM_FOOTER
      ])
      .actionConfigure(function (action, { context: { record }, position }) {
        if ([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER].includes(position)) {
          action.hidden = record['deletedAt']
        }
        return action
      })
      .actionColor('negative')
      .actionIcon('delete')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionDestroy.call(this, { $event, schema, ...context })
      })

    this.addAction('trash')
      .actionFloatRight()
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions(readonly ? [] : [POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('restore')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionTrash.call(this, { $event, schema, ...context })
      })

    this.addAction('restore')
      .actionScopes([SCOPES.SCOPE_VIEW, SCOPES.SCOPE_TRASH])
      .actionPositions([
        POSITIONS.POSITION_TABLE_TOP,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_CELL,
        POSITIONS.POSITION_FORM_FOOTER
      ])
      .actionConfigure(function (action, { context: { record }, position }) {
        if ([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER].includes(position)) {
          action.hidden = !record['deletedAt']
        }
        return action
      })
      .actionColor('primary')
      .actionIcon('restore_from_trash')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionRestore.call(this, { $event, schema, ...context })
      })

    this.addAction('erase')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_TRASH, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([
        POSITIONS.POSITION_TABLE_CELL,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_TOP,
        POSITIONS.POSITION_FORM_FOOTER
      ])
      .actionColor('negative')
      .actionIcon('clear')
      .actionConfigure(function (action, { context: { record }, position }) {
        if ([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER].includes(position)) {
          action.hidden = !record['deletedAt']
        }
        return action
      })
      .actionOn('click', function ({ context, $event }) {
        return schema.actionDestroy.call(this, { $event, schema, ...context, erase: true })
      })

    this.addAction('sortClear')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP])
      .actionIcon('layers_clear')
      .actionNoMinWidth()
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSortClear.call(this, { $event, schema, ...context })
      })

    this.addAction('refresh')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('refresh')
      .actionNoMinWidth()
      .actionOn('click', function ({ context, $event }) {
        return schema.actionRefresh.call(this, { $event, schema, ...context })
      })

    this.addAction('search')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionIcon('search')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSearch.call(this, { $event, schema, ...context })
      })

    this.addAction('searchClear')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionIcon('cancel')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSearchCancel.call(this, { $event, schema, ...context })
      })
  }
}
