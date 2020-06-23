import { SCOPES } from '../../enum'

/**
 */
export default {
  /**
   */
  [SCOPES.SCOPE_INDEX] () {
    this.fetchRecords()
  },

  /**
   */
  [SCOPES.SCOPE_ADD] () {
    if (this.settings.useUuid) {
      this.record[this.primaryKey] = this.$util.uuid()
    }
  },

  /**
   */
  [SCOPES.SCOPE_EDIT] () {
    this.fetchRecord(this.$route.params[this.primaryKey])
  },

  /**
   */
  [SCOPES.SCOPE_VIEW] () {
    const setField = (key) => this.setFieldAttrs(key, { readonly: true, disable: true })
    Object.keys(this.components).forEach(setField)

    if (this.$route.query.trash) {
      this.$util.set(this.buttons, 'home.attrs.icon', 'restore')
    }

    this.fetchRecord(this.$route.params[this.primaryKey])
  },

  /**
   */
  [SCOPES.SCOPE_TRASH] () {
    this.fetchRecords()
  }
}
