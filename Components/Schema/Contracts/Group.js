/**
 * @mixin {Group}
 */
export default {
  /**
   */
  data: () => ({
    groupingType: 'none'
  }),
  /**
   */
  methods: {
    /**
     * @param {string} type
     * @return {SchemaForm}
     */
    $groupType (type) {
      this.groupingType = type
      return this
    },
    /**
     * @param {string} group
     * @returns {SchemaForm}
     */
    $getGroup (group) {
      this.__currentGroup = group
      return this
    },
    /**
     * @param {boolean} hidden
     * @return {SchemaForm}
     */
    $groupHidden (hidden = true) {
      return this._setGroup('hidden', hidden)
    },
    /**
     * @param {string} property
     * @param {Any} value
     * @return {SchemaForm}
     */
    _setGroup (property, value) {
      this.grouping[this.__currentGroup][property] = value
      return this
    }
  },
  /**
   */
  watch: {
    groupType: {
      immediate: true,
      handler (type) {
        this.$groupType(type)
      }
    }
  }
}
