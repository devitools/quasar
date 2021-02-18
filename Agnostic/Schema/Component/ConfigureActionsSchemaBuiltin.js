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
        this.item = this.$util.clone(this.defaults)
        this.scope = SCOPES_BUILTIN.SCOPE_BUILTIN_ADD
        this.formActive = true
      })

    this.addAction('builtinCancel')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_ADD, SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('cancel')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionFloatLeft()
      .actionOn('click', function () {
        this.item = {}
        this.formActive = false
      })

    this.addAction('builtinBack')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_VIEW])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('reply')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionOn('click', function () {
        this.formActive = false
      })

    this.addAction('builtinApply')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_ADD, SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('done')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionFloatLeft()
      .actionOn('click', function () {
        if (!this.$refs.form.isValidForm()) {
          const message = this.$lang([
            'agnostic.components.builtin.actions.builtinApply.validation',
            `domains.${this.domain}.components.builtin.actions.builtinApply.validation`
          ])
          this.$message.error(message)
          return false
        }

        const record = this.$util.clone(this.item)

        if (this.scope === SCOPES_BUILTIN.SCOPE_BUILTIN_ADD) {
          this.updateValue([...this.items, record])
        }

        record.__id = this.__currentItem

        if (this.scope === SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT) {
          const index = this.getCurrentIndex(record)
          this.items.splice(index, 1, record)
          this.updateValue(this.items)
        }

        this.formActive = false
        window.setTimeout(() => { this.item = {} }, 100)
      })

    this.addAction('builtinView')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('visibility')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.setItem(record, SCOPES_BUILTIN.SCOPE_BUILTIN_VIEW)
      })

    this.addAction('builtinEdit')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('edit')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionOn('click', function (paramaters) {
        const { context: { record } } = paramaters
        this.setItem(this.$util.clone(record), SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT)
      })

    this.addAction('builtinDestroy')
      .actionScopes([SCOPES_BUILTIN.SCOPE_BUILTIN_INDEX, SCOPES_BUILTIN.SCOPE_BUILTIN_EDIT])
      .actionPositions([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('delete')
      .actionNoMinWidth()
      .actionAttrsAppendAttrs(INTERNAL_ATTRS)
      .actionFloatRight()
      .actionOn('click', async function (paramaters) {
        const { context: { record } } = paramaters
        const message = this.$lang([
          'agnostic.components.builtin.actions.builtinDestroy.message',
          `domains.${this.domain}.components.builtin.actions.builtinDestroy.message`
        ])
        const title = this.$lang([
          'agnostic.components.builtin.actions.builtinDestroy.title',
          `domains.${this.domain}.components.builtin.actions.builtinDestroy.title`
        ])
        try {
          await this.$confirm(message, { title })
        } catch (e) {
          return
        }

        this.formActive = false

        const index = this.getCurrentIndex(record)
        this.items.splice(index, 1)
        this.updateValue(this.items)
      })
  }
}
