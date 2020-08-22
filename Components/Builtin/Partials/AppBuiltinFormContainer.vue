<!--suppress ES6ModulesDependencies -->
<template>
  <div class="AppBuiltinFormContainer">
    <div class="AppBuiltinFormContainer__bar">
      <span>{{ title }}</span>
      <QSpace />
      <QBtn
        icon="close"
        dense
        flat
        @click="closeForm"
      />
    </div>
    <AppBuiltinForm
      ref="form"
      v-bind="$props"
      :scope="scope"
      :value="item"
      :builtin="true"
      :debugger-allowed="false"
      @input="$emit('update:item', $event)"
      @actionBuiltinCancel="$emit('actionCancel')"
      @actionBuiltinBack="$emit('actionBack')"
      @actionBuiltinApply="$emit('actionApply')"
      @actionBuiltinDestroy="$emit('actionDestroy', $event)"
    />
  </div>
</template>

<script>
import { QSpace, QBtn } from 'quasar'
import Props from '../../Schema/Contracts/Props'
import AppBuiltinForm from './AppBuiltinForm'

import { APP_BUILT_IN_DEFAULT_TABLE_HEIGHT, references } from '../settings'

export default {
  /**
   */
  name: 'AppBuiltinFormContainer',
  /**
   */
  components: {
    AppBuiltinForm,
    QSpace,
    QBtn
  },
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
    },
    readonly: {
      type: Boolean,
      default: false
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
        `agnostic.components.builtin.form.${reference}`,
        `domains.${this.domain}.components.builtin.form.${reference}`
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
      const errorManual = this.$refs.form.hasErrors()

      return !!(!erroAutomatic && !errorManual)
    }
  }
}
</script>

<style lang="stylus">
.AppBuiltinFormContainer {
  min-height: 300px;

  > .AppBuiltinFormContainer__bar {
    height: 50px;
    min-height: 50px;
    max-height: 50px;
    padding: 10px;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #ddd;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    background: linear-gradient(180deg, #f7f7f7 0, #f1f1f1 20px, #ecebeb 50px, #e0e0e0 52px);
  }

  > .AppBuiltinForm {
    > .AppBuiltinForm__wrapper {
      min-height: 250px;

      > .AppBuiltinForm__body {
        overflow: auto;
        min-height: 190px;
        padding: 10px;
      }

      > .app-form-buttons {
        padding: 10px;
        border-width: 1px 0 0 0;
        border-style: solid;
        border-color #ddd

        > button {
          margin: 0 10px 0 0;
          font-size: 0.8rem;
          min-width: 140px;
          min-height: 36px;

          &.button-position-right {
            float: right;
          }

          &.button-position-left {
            float: left;
          }

          &.button-position-none {
            float: none;
          }
        }
      }
    }
  }
}

@media (max-width 1200px) {
  .AppBuiltinFormContainer > .AppBuiltinForm > .AppBuiltinForm__wrapper > .app-form-buttons > button:not(.button-no-min-width) {
    min-width: auto;
  }
}

@media (max-width 768px) {
  .AppBuiltinFormContainer > .AppBuiltinForm > .AppBuiltinForm__wrapper > .app-form-buttons > button {
    > .q-btn__wrapper > .q-btn__content > span {
      display: none !important;
    }
  }
}
</style>
