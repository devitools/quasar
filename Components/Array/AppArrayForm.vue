<template>
  <div class="AppArrayForm">
    <div class="AppArrayForm__wrapper">
      <div class="AppArrayForm__head form form-grid">
        <template v-for="(field, key) in components">
          <div
            :key="key"
            class="AppArrayForm__th"
            :class="generateClassNames(field)"
          >
            {{ $lang([`domains.${domain}.fields.${field.$key}.label`, `domains.${domain}.fields.${field.$key}`]) }}
          </div>
        </template>
      </div>

      <div class="AppArrayForm__body">
        <template v-for="(data, index) in value">
          <div
            :key="index"
            class="AppArrayForm__tr form form-grid"
          >
            <template v-if="manipulating[index]">
              <div class="AppArrayForm__manipulating field width-100">
                <AppForm
                  :ref="`form-${index}`"
                  v-bind="bind"
                  :scope="scope"
                  :value="records[index]"
                  :built-in="true"
                  :debugger-allowed="false"
                  @input="setManipulatedValue(index, $event)"
                />
              </div>
            </template>

            <template v-else>
              <template v-for="(field, key) in components">
                <div
                  :key="key"
                  class="AppArrayForm__td"
                  :class="generateClassNames(field, true)"
                >
                  <div class="AppArrayForm__td_value">
                    <label class="q-field row q-input q-field--outlined q-field--dense q-field--readonly">
                      <div class="q-field__inner relative-position col self-stretch column justify-center">
                        <div class="q-field__control relative-position row no-wrap">
                          <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                            <div
                              class="q-field__native q-placeholder"
                              v-html="showValue(field, data[field.$key])"
                            />
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </template>
            </template>

            <div class="AppArrayForm__tr__buttons">
              <div
                v-if="editable"
                class="AppArrayForm__top"
              >
                <QBtn
                  v-show="!manipulating[index]"
                  unelevated
                  dense
                  color="white"
                  text-color="grey-9"
                  round
                  icon="edit"
                  size="sm"
                  @click="editItem(index, data)"
                />
                <QBtn
                  v-show="manipulating[index]"
                  unelevated
                  dense
                  color="white"
                  text-color="grey-9"
                  round
                  icon="done"
                  size="sm"
                  @click="saveItem(index)"
                />
              </div>
              <div class="AppArrayForm__bottom">
                <QBtn
                  v-show="!manipulating[index]"
                  unelevated
                  dense
                  color="white"
                  text-color="grey-9"
                  round
                  icon="delete"
                  size="sm"
                  @click="removeItem(index)"
                />
                <QBtn
                  v-show="manipulating[index]"
                  unelevated
                  dense
                  color="white"
                  text-color="grey-9"
                  round
                  icon="cancel"
                  size="sm"
                  @click="resetItem(index)"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div>
      <QBtn
        v-if="editable"
        unelevated
        dense
        color="white"
        text-color="grey-9"
        icon="add"
        @click="addItem"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { QBtn } from 'quasar'

import AppForm from '../../Components/Form/AppForm'
import { SCOPES } from '../../Agnostic/enum'
import { uuid } from '../../Util/general'

import { AppArrayEmpty } from './Mixins'

export default {
  /**
   */
  name: 'AppArrayForm',
  /**
   */
  mixins: [AppArrayEmpty],
  /**
   */
  components: { AppForm, QBtn },
  /**
   */
  props: {
    domain: {
      type: String,
      required: true
    },
    primaryKey: {
      type: String,
      required: true
    },
    fields: {
      type: Function,
      required: true
    },
    hooks: {
      type: Function,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    inheritErrors: {
      type: Object,
      default: () => ({})
    },
    debuggerAllowed: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => ([])
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {boolean}
     */
    editable () {
      return !this.static && !this.disable && !this.readonly
    },
    /**
     * @return {Record<string, unknown>}
     */
    bind () {
      return {
        scope: this.scope,
        domain: this.domain,
        primaryKey: this.primaryKey,
        fields: this.fields,
        hooks: this.hooks,
        readonly: this.readonly
      }
    }
  },
  /**
   */
  data: () => ({
    components: {},
    records: {},
    manipulating: {},
    scope: SCOPES.SCOPE_ADD
  }),
  /**
   */
  methods: {
    /**
     */
    addItem () {
      const newest = {}
      if (this.useUuid) {
        newest[this.primaryKey] = uuid()
      }
      Object.keys(this.components).forEach((key) => {
        newest[key] = this.components[key].attrs.value
      })
      const input = [...this.value, newest]
      this.editItem(input.length - 1, {})
      this.$emit('input', input)
    },
    /**
     * @param {number} index
     */
    removeItem (index) {
      const input = [...this.value]
      input.splice(index, 1)
      this.$emit('input', input)
    },
    /**
     * @param {number} index
     * @param {Record<string, unknown>} data
     */
    editItem (index, data) {
      this.$set(this.manipulating, index, true)
      this.$set(this.records, index, JSON.parse(JSON.stringify(data)))
    },
    /**
     * @param {number} index
     */
    resetItem (index) {
      this.$delete(this.manipulating, index)
      this.$set(this.records, index, {})
    },
    /**
     * @param {number} index
     */
    saveItem (index) {
      let ref = this.$refs[`form-${index}`]
      if (!ref) {
        return
      }
      if (Array.isArray(ref)) {
        ref = ref[0]
      }
      ref.$v.$touch()

      if (ref.$v.$error) {
        return
      }

      this.$set(this.manipulating, index, true)
      const value = this.records[index]
      this.$set(this.records, index, {})
      this.resetItem(index)
      this.updateValue(index, value)
    },
    /**
     * @param {number} index
     * @param {string} field
     * @param {*} value
     */
    setManipulatedValue (index, value) {
      this.records[index] = value
    },
    /**
     * @param {number} index
     * @param {*} value
     */
    updateValue (index, value) {
      const input = [...this.value]

      input[index] = value

      this.$emit('input', input)
    },
    /**
     * @param {Field} field
     * @param {*} value
     * @return {string}
     */
    showValue (field, value) {
      /*
      <AppSwitch :value="field.$type">
        <template #select>
          {{ $util.get(item, `${field.$key}.${field.attrs.keyLabel}`) }}
        </template>
        <template #options>
          {{ options(field, item[field.$key]) }}
        </template>
        <template #curreny>
          {{ item[field.$key] | currency }}
        </template>
        <template #file>
          <QIcon
            size="2rem"
            color="grey-8"
            name="cloud_download"
            class="cursor-pointer"
            @click="downloadFile(field, item[field.$key])"
          >
            <AppTooltip>{{ $lang('agnostic.components.file.download') }}</AppTooltip>
          </QIcon>
          <span class="q-ml-sm">{{ $lang('agnostic.components.file.downloadName') }}{{ item[field.$key] | extension }}</span>
        </template>
        <template>
          {{ item[field.$key] }}
        </template>
      </AppSwitch>
      */
      if (typeof field.$layout.tableFormat === 'function') {
        return field.$layout.tableFormat(value)
      }
      if (typeof value === 'undefined') {
        return ''
      }
      return String(value)
    },
    /**
     * @param {Field} field
     * @param {boolean} value
     */
    generateClassNames (field, value = false) {
      const classNames = [
        'field',
        field.$layout.formWidth ? `width-${field.$layout.formWidth}` : 'width-100', `$key-${field.$key}`
      ]
      if (value && field.attrs.uppercase) {
        classNames.push('text-uppercase')
      }
      return classNames
    }
  },
  watch: {
    fields: {
      immediate: true,
      handler (fields) {
        this.components = Object.values(fields()).filter((field) => !field.$layout.formHidden)
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.AppArrayForm__element--color {
  border-style: solid;
  border-color: #e1e1e1;
}

.AppArrayForm {

  .AppArrayForm__wrapper {
    @extend .AppArrayForm__element--color
    border-width: 1px;
    border-radius: 4px;
  }

  .AppArrayForm__head {
  }

  .AppArrayForm__th {
    padding: 6px !important;

    &:first-child {
      padding: 6px 6px 6px 16px !important;
    }
  }

  .AppArrayForm__body {
    .app-form__label {
      display: none;
    }
  }

  .AppArrayForm__tr {
    @extend .AppArrayForm__element--color
    border-width: 1px 0 0 0;
    min-height: 64px;

    .AppArrayForm__manipulating {
      position: relative;

      > .AppForm > .AppForm__wrapper > .AppForm__body > .form > .field:not(.hide) {
        padding-left: 10px !important;
      }
    }

    .AppArrayForm__manipulating > .AppForm > .AppForm__wrapper > .AppForm__body > .form > .field:not(.hide) ~ .field:not(.hide) {
      padding-left: 5px !important;
    }

    .AppArrayForm__tr__buttons {
      @extend .AppArrayForm__element--color
      border-width: 1px;
      border-radius: 2px;
      position: absolute;
      margin: 2px 0 0 -13px;
      background: #ffffff;
      z-index: 1000;

      .AppArrayForm__top {
        padding: 2px 0;
        background: #ffffff;
        @extend .AppArrayForm__element--color
        border-width: 0 0 1px 0;
      }

      .AppArrayForm__bottom {
        padding: 2px 0;
        background: #ffffff;
      }
    }

  }

  .AppArrayForm__td {
    padding: 4px 5px !important;

    &:first-child {
      padding: 4px 5px 5px 16px !important;
    }

    > .AppArrayForm__td_value {
      width: 100%;

      .uppercase {
        text-transform: uppercase !important;
      }
    }
  }

  .AppArrayForm__th:last-child, .AppArrayForm__td:last-child {
    border-width: 0;
  }

  .AppArrayForm__empty {
    padding: 10px;
    text-align: center;
    color: #797979;
  }

  .q-field__native.row.items-center {
    flex-wrap: nowrap;
  }

  .has-error {
    > div > label {
      color: $errorForeground;
    }

    & > .q-field > .q-field__inner > .q-field__control {
      color: darken($errorBackground, 25%);

      &:before {
        border-color: $errorBackground;
      }

      &:after {
        background: $errorBackground;
      }
    }
  }
}
</style>
