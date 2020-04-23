<!--suppress ES6ModulesDependencies -->
<template>
  <AppBuiltInTable
    class="AppBuiltInTableContainer"
    v-bind="$props"
    :scope="scope"
    :value="items"
    :built-in="true"
    :debugger-allowed="false"
    :size="size"
    selection="none"
    @actionBuiltInAdd="$emit('actionBuiltInAdd')"
    @actionBuiltInEdit="$emit('actionEdit', $event)"
    @actionBuiltInView="$emit('actionView', $event)"
    @actionBuiltInDestroy="$emit('actionDestroy', $event)"
  />
</template>

<script type="text/javascript">
import { SCOPES } from '../../../Agnostic/enum'

import Props from '../../Schema/Contracts/Props'
import AppBuiltInTable from './AppBuiltInTable'
import { APP_BUILT_IN_DEFAULT_TABLE_HEIGHT } from '../settings'

export default {
  /**
   */
  name: 'AppBuiltInTableContainer',
  /**
   */
  mixins: [Props],
  /**
   */
  components: { AppBuiltInTable },
  /**
   */
  props: {
    items: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: APP_BUILT_IN_DEFAULT_TABLE_HEIGHT
    },
    size: {
      type: Number,
      default: 10
    }
  },
  /**
   */
  computed: {
    /**
     * @return {Array}
     */
    fieldsParsed () {
      return this.fields.map((field) => this.parseField(field))
    },
    /**
     * @return {string}
     */
    emptyHeight () {
      return `calc(${this.height} - ${this.emptyHeightCompensation})`
    }
  },
  /**
   */
  data: () => ({
    scope: SCOPES.SCOPE_INDEX
  }),
  /**
   */
  methods: {
    /**
     */
    addItem () {
      this.formActive = true
    },
    /**
     * @param {Object} field
     * @return {Object}
     */
    parseField (field) {
      const paths = [
        `domains.${this.domain}.fields.${field.$key}.label`,
        `domains.${this.domain}.fields.${field.$key}`
      ]
      const label = this.$lang(paths)
      const textAlign = field.attrs.align ? field.attrs.align : 'left'
      const type = field.$type

      return { key: field.$key, label, textAlign, type }
    }
  }
}
</script>

<style lang="stylus">
.AppBuiltInTableContainer
  min-height 300px

  > .q-table__container
    min-height 300px

    .q-table__middle
      height auto

    > .q-table__top
      height 50px
      min-height 50px
      max-height 50px

      & > .app-form-buttons
        display flex

</style>
