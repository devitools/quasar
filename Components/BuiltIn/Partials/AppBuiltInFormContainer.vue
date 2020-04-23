<!--suppress ES6ModulesDependencies -->
<template>
  <div class="AppBuiltInFormContainer">
    <div class="AppBuiltInFormContainer__bar">
      <span>{{ title }}</span>
      <q-space />
      <q-btn
        icon="close"
        dense
        flat
        @click="closeForm"
      />
    </div>
    <AppBuiltInForm
      ref="form"
      v-bind="$props"
      :scope="scope"
      :value="item"
      :built-in="true"
      :debugger-allowed="false"
      @input="$emit('update:item', $event)"
      @actionBuiltInCancel="$emit('actionCancel')"
      @actionBuiltInBack="$emit('actionBack')"
      @actionBuiltInApply="$emit('actionApply')"
      @actionBuiltInDestroy="$emit('actionDestroy', $event)"
    />
  </div>
</template>

<script>
import Props from '../../Schema/Contracts/Props'
import AppBuiltInForm from './AppBuiltInForm'

import { APP_BUILT_IN_DEFAULT_TABLE_HEIGHT, references } from '../settings'

export default {
  /**
   */
  name: 'AppBuiltInFormContainer',
  /**
   */
  components: { AppBuiltInForm },
  /**
   */
  mixins: [Props],
  /**
   */
  props: {
    item: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    scope: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: APP_BUILT_IN_DEFAULT_TABLE_HEIGHT
    }
  },
  /**
   */
  computed: {
    title () {
      if (this.label) {
        return this.label
      }
      const reference = references[this.scope]
      const paths = [
        `agnostic.components.builtIn.form.${reference}`,
        `domains.${this.domain}.components.builtIn.form.${reference}`
      ]
      return this.$lang(paths)
    }
  },
  /**
   */
  data: () => ({
    record: {}
  }),
  /**
   */
  methods: {
    /**
     */
    closeForm () {
      this.$emit('update:active', false)
    },
    /**
     * @return {Boolean}
     */
    isValidForm () {
      this.$refs.form.$v.$touch()
      const erroAutomatic = this.$refs.form.$v.$error
      const errorManual = this.$refs.form.hasErrors

      return !!(!erroAutomatic && !errorManual)
    }
  }
}
</script>

<style lang="stylus">
.AppBuiltInFormContainer
  min-height 300px

  > .AppBuiltInFormContainer__bar
    height 50px
    min-height 50px
    max-height 50px
    padding 10px
    border-width 0 0 1px 0
    border-style solid
    border-color #ddd
    display flex
    justify-content center
    flex-wrap wrap
    align-items center
    background linear-gradient(180deg, #f7f7f7 0, #f1f1f1 20px, #ecebeb 50px, #e0e0e0 52px);

  > .AppBuiltInForm
    > .AppBuiltInForm__wrapper
      min-height 250px

      > .AppBuiltInForm__body
        overflow auto
        min-height 190px

      > .app-form-buttons
        padding 10px
        border-width 1px 0 0 0
        border-style solid
        border-color #ddd

        > button
          margin 0 10px 0 0
          min-width 140px

@media (max-width 768px)
  .AppBuiltInFormContainer
    > .AppBuiltInForm
      > .AppBuiltInForm__wrapper
        > .app-form-buttons
          > button
            > .q-btn__wrapper > .q-btn__content > div
              display none
</style>
