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
    this.showPlaceholderContent = true
    const id = this.$route.params[this.primaryKey]
    if (!id) {
      this.showPlaceholderContent = false
      return
    }
    const fetch = this.fetchRecord(id)
    if (fetch?.finally) {
      fetch.finally(() => {
        this.showPlaceholderContent = false
      })
    }
  },

  /**
   */
  [SCOPES.SCOPE_VIEW] () {
    this.showPlaceholderContent = true
    this.useFormReadonly = true

    if (this.$route.query.trash) {
      this.$util.set(this.buttons, 'home.attrs.icon', 'restore')
    }

    const id = this.$route.params[this.primaryKey]
    if (!id) {
      this.showPlaceholderContent = false
      return
    }
    const fetch = this.fetchRecord(id)
    if (fetch?.finally) {
      fetch.finally(() => {
        this.showPlaceholderContent = false
      })
    }
  },

  /**
   */
  [SCOPES.SCOPE_TRASH] () {
    this.fetchRecords()
  }
}
