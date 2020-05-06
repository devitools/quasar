import { SCOPES } from '../../../Agnostic/enum'
import { unique } from '../../../Util/general'
import Dialog from '../../Schema/Contracts/Dialog'

/**
 */
export default {
  /**
   */
  mixins: [Dialog],
  /**
   */
  data: () => ({
    formActive: false,
    item: {},
    items: []
  }),
  /**
   */
  methods: {
    /**
     */
    actionAdd () {
      this.item = this.$util.clone(this.defaults)
      this.scope = SCOPES.SCOPE_ADD
      this.formActive = true
    },
    /**
     */
    actionCancel () {
      this.item = {}
      this.formActive = false
    },
    /**
     */
    actionBack () {
      this.formActive = false
    },
    /**
     */
    actionApply () {
      if (!this.$refs.form.isValidForm()) {
        const message = this.$lang([
          `agnostic.components.builtIn.actions.builtinApply.validation`,
          `domains.${this.domain}.components.builtIn.actions.builtinApply.validation`
        ])
        this.$message.error(message)
        return false
      }

      const record = this.$util.clone(this.item)

      if (this.scope === SCOPES.SCOPE_ADD) {
        this.updateValue([...this.items, record])
      }

      record.__id = this.__currentItem

      if (this.scope === SCOPES.SCOPE_EDIT) {
        const index = this.getCurrentIndex(record)
        this.items.splice(index, 1, record)
        this.updateValue(this.items)
      }

      this.formActive = false
      window.setTimeout(() => { this.item = {} }, 100)
    },
    /**
     * @param {Object} record
     */
    actionView (record) {
      this.setItem(record, SCOPES.SCOPE_VIEW)
    },
    /**
     * @param {Object} record
     */
    actionEdit (record) {
      this.setItem(this.$util.clone(record), SCOPES.SCOPE_EDIT)
    },
    /**
     * @param {Object} record
     */
    async actionDestroy (record) {
      const message = this.$lang([
        `agnostic.components.builtIn.actions.builtinDestroy.message`,
        `domains.${this.domain}.components.builtIn.actions.builtinDestroy.message`
      ])
      const title = this.$lang([
        `agnostic.components.builtIn.actions.builtinDestroy.title`,
        `domains.${this.domain}.components.builtIn.actions.builtinDestroy.title`
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
    },
    /**
     * @param {Object} record
     * @param {string} scope
     */
    setItem (record, scope) {
      this.__currentItem = record.__id
      this.item = record
      this.scope = scope
      this.formActive = true
    },
    /**
     * @param {Array} items
     */
    updateValue (items) {
      const mapper = (item) => {
        delete item.__id
        return item
      }
      const value = this.$util.clone(items.map(mapper))
      this.$emit('input', value)
    },
    /**
     * @param {Object} record
     * @return {number | *}
     */
    getCurrentIndex (record) {
      return this.items.findIndex((item) => item.__id === record.__id)
    }
  },
  /**
   */
  watch: {
    value: {
      handler (value) {
        const __unique = unique()
        this.items = value.map((item, index) => ({ ...item, __id: `${__unique}__${index}` }))
      },
      immediate: true
    }
  }
}
