import { POSITIONS, SCOPES } from '../../enum'
import { unique } from '../../../Util/general'

/**
 */
export default {
  /**
   */
  defaultActionsEmbed () {
    const schema = this
    if (!schema.constructor.activateEmbed) {
      return
    }
    const readonly = schema.constructor.readonly

    this.addAction('embedBack')
      .actionScopes(readonly ? [] : [
        SCOPES.SCOPE_MASTER_DETAIL_ADD,
        SCOPES.SCOPE_MASTER_DETAIL_VIEW,
        SCOPES.SCOPE_MASTER_DETAIL_EDIT
      ])
      .actionPositions([
        POSITIONS.POSITION_FORM_FOOTER
      ])
      .actionIcon('reply')
      .actionOn('click', function () {
        this.$emit('change', { scope: SCOPES.SCOPE_MASTER_DETAIL_INDEX })
      })

    this.addAction('embedCreate')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_MASTER_DETAIL_ADD])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')
      .actionConfigure(function (action) {
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionOn('click', function ({ context, $event }) {
        const payload = {
          scope: SCOPES.SCOPE_MASTER_DETAIL_INDEX,
          clipboard: { forceRefresh: unique() }
        }
        const after = () => {
          this.$emit('change', payload)
        }
        return schema.actionCreate.call(this, { $event, schema, after, ...context })
      })

    this.addAction('embedUpdate')
      .actionScopes([SCOPES.SCOPE_MASTER_DETAIL_EDIT])
      .actionPositions(readonly ? [] : [POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')
      .actionConfigure(function (action) {
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionOn('click', function ({ context, $event }) {
        const payload = {
          scope: SCOPES.SCOPE_MASTER_DETAIL_INDEX,
          clipboard: { forceRefresh: unique() }
        }
        const after = () => {
          this.$emit('change', payload)
        }
        return schema.actionUpdate.call(this, { $event, schema, after, ...context })
      })

    this.addAction('embedView')
      .actionScopes([SCOPES.SCOPE_MASTER_DETAIL_INDEX])
      .actionPositions([
        POSITIONS.POSITION_TABLE_TOP,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_CELL
      ])
      .actionIcon('visibility')
      .actionOn('click', function ({ context: { record, records } }) {
        if (!record && records && Array.isArray(records) && records.length) {
          record = records[0]
        }
        if (!record) {
          return
        }

        const payload = {
          scope: SCOPES.SCOPE_MASTER_DETAIL_VIEW,
          clipboard: { [this.primaryKey]: record[this.primaryKey] }
        }
        this.$emit('change', payload)
      })

    this.addAction('embedEdit')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_MASTER_DETAIL_INDEX])
      .actionPositions([
        POSITIONS.POSITION_TABLE_TOP,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_CELL
      ])
      .actionColor('primary')
      .actionIcon('edit')
      .actionConfigure(function (action) {
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionOn('click', function ({ context: { record, records } }) {
        if (!record && records && Array.isArray(records) && records.length) {
          record = records[0]
        }
        if (!record) {
          return
        }

        const payload = {
          scope: SCOPES.SCOPE_MASTER_DETAIL_EDIT,
          clipboard: { [this.primaryKey]: record[this.primaryKey] }
        }
        this.$emit('change', payload)
      })

    const scopesDestroy = readonly
      ? []
      : [
        SCOPES.SCOPE_MASTER_DETAIL_INDEX,
        SCOPES.SCOPE_MASTER_DETAIL_VIEW,
        SCOPES.SCOPE_MASTER_DETAIL_EDIT
      ]
    this.addAction('embedDestroy')
      .actionScopes(scopesDestroy)
      .actionPositions([
        POSITIONS.POSITION_TABLE_CELL,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_TOP
      ])
      .actionConfigure(function (action, { context: { record, records }, position }) {
        if ([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER].includes(position)) {
          action.hidden = record.deletedAt
        }
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionColor('negative')
      .actionIcon('delete')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionDestroy.call(this, { $event, schema, ...context })
      })

    this.addAction('embedSortClear')
      .actionScopes([SCOPES.SCOPE_MASTER_DETAIL_INDEX, SCOPES.SCOPE_MASTER_DETAIL_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP])
      .actionIcon('layers_clear')
      .actionNoMinWidth()
      .actionOn('click', function ({ context, $event }) {
        // return schema.actionSortClear.call(this, { $event, schema, ...context })
      })

    this.addAction('embedRefresh')
      .actionScopes([SCOPES.SCOPE_MASTER_DETAIL_INDEX, SCOPES.SCOPE_MASTER_DETAIL_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('refresh')
      .actionNoMinWidth()
      .actionOn('click', function () {
        this.fetchRecords()
      })

    this.addAction('embedAdd')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_MASTER_DETAIL_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('add')
      .actionColor('primary')
      .actionConfigure(function (action) {
        if (this.locked) {
          action.hidden = true
        }
        return action
      })
      .actionOn('click', function () {
        const payload = {
          scope: SCOPES.SCOPE_MASTER_DETAIL_ADD,
          clipboard: { forceClear: unique() }
        }
        this.$emit('change', payload)
      })

    this.addAction('embedSearch')
      .actionScopes([SCOPES.SCOPE_MASTER_DETAIL_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionIcon('search')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSearch.call(this, { $event, schema, ...context })
      })

    this.addAction('embedSearchClear')
      .actionScopes([SCOPES.SCOPE_MASTER_DETAIL_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionIcon('cancel')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSearchCancel.call(this, { $event, schema, ...context })
      })
  }
}
