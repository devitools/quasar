import { actionFailMessage, actionSuccessMessage, actionFailErrors } from 'src/settings/schema'

/**
 * @mixin Operation
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Object} payload
     * @param {function} success
     * @param {function} noItems
     * @param {function} tooManySelected
     */
    withRecord (payload, success, noItems = undefined, tooManySelected = undefined) {
      let { record, records } = payload
      if (!record && !(Array.isArray(records) && records.length)) {
        noItems ? noItems() : this.$alert(this.$lang('agnostic.actions.view.noItems'))
        return
      }
      if (Array.isArray(records) && records.length) {
        if (records.length > 1) {
          tooManySelected ? tooManySelected() : this.$alert(this.$lang('agnostic.actions.view.tooManySelected'))
          return
        }
        record = records[0]
      }
      success(record)
    },
    /**
     * @param {Object} payload
     * @param {function} success
     * @param {function} noItems
     */
    withRecords (payload, success, noItems = undefined) {
      const { record, records } = payload
      if (!record && !(Array.isArray(records) && records.length)) {
        noItems ? noItems() : this.$alert(this.$lang('agnostic.actions.view.noItems'))
        return
      }
      if (record) {
        success(record)
        return
      }
      success(records, true)
    },
    /**
     */
    actionSchemaAttempt () {
      this.$q.loading.show()
    },
    /**
     * @param {Object} response
     * @param {string|Array} success
     * @returns {string}
     */
    actionSchemaSuccess (response, success) {
      this.$q.loading.hide()
      if (this.debuggers) {
        window.alert(JSON.stringify(response))
      }
      let message = actionSuccessMessage(response)
      if (!message) {
        message = this.$lang(success)
      }
      this.$message.success(message)
      let id = response[this.primaryKey]
      if (!id) {
        id = this.$util.get(response, 'data.ticket')
      }
      return id
    },
    /**
     * @param {Object} error
     * @param {string|Array} fail
     */
    actionSchemaFail (error, fail) {
      this.$q.loading.hide()
      if (!error.response) {
        return Promise.reject(error)
      }
      const status = this.$util.get(error, 'response.status')
      const message = actionFailMessage(error)
      if (status !== 400) {
        if (message) {
          this.$message.error(message)
          return
        }
        if (error.type) {
          this.$message.error(this.$lang(`validation.${error.type}`))
          return
        }
        this.$message.error(this.$lang(fail))
        return
      }

      const errors = actionFailErrors(error)
      if (Array.isArray(errors)) {
        this.errors = errors.reduce((accumulator, error) => {
          if (!this.components[error['property_path']]) {
            this.triggerHook('validate:error', { error })
            return accumulator
          }
          accumulator[error['property_path']] = error['message']
          return accumulator
        }, {})
      }

      if (message) {
        this.$message.warning(message)
        return
      }
      if (error.type) {
        this.$message.warning(this.$lang(`validation.${error.type}`))
        return
      }
      this.$message.warning(this.$lang(fail))
    },
    /**
     * @param {Object} payload
     * @param {function} action
     * @param {string|Array} success
     * @param {string|Array} question
     * @param {boolean} prompt
     */
    actionSchemaPerform (payload, action, success, question, prompt = false) {
      this.withRecord(payload, (record) => {
        const then = () => {
          this.$message.success(this.$lang(success))
          if (this.fetchRecords) {
            this.fetchRecords()
          }
        }
        const accept = (text) => {
          if (!text) {
            this.$message.error('Preencha os campos corretamente e tente novamente')
            return
          }
          this.$q.loading.show()
          action(record, text)
            .then(then)
            .finally(() => this.$q.loading.hide())
        }
        const ignore = () => '// silent is gold'

        if (prompt) {
          this.$prompt(this.$lang(question))
            .then(accept)
            .catch(ignore)
          return
        }
        this.$confirm(this.$lang(question))
          .then(accept)
          .catch(ignore)
      })
    }
  }
}
