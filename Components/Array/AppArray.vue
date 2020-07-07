<!--suppress ES6ModulesDependencies -->
<template>
  <div class="AppArray">
    <QMarkupTable
      class="AppArray__table"
      dense
      bordered
      flat
    >
      <thead>
        <tr>
          <th>
            <div style="width: 45px;">
              *
            </div>
          </th>
          <th
            v-for="(field, key) in components"
            :key="`label-${key}`"
            :style="widths[field.$key]"
          >
            <div
              :style="`padding: 4px 8px;
                ${widths[field.$key]};
                text-align: ${field.attrs.align ? field.attrs.align : 'left'}`"
            >
              {{ $lang([`domains.${domain}.fields.${field.$key}.label`, `domains.${domain}.fields.${field.$key}`]) }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!items.length">
          <td :colspan="Object.keys(components).length + 1">
            <div
              class="AppArray__empty"
              v-html="empty"
            />
          </td>
        </tr>
        <template v-for="(item, index) in items">
          <tr :key="item[primaryKey]">
            <td
              style="width: 45px; padding: 0 0 0 6px;"
            >
              <q-btn
                :disable="!editable"
                icon="close"
                dense
                flat
                @click="removeItem(index)"
              />
            </td>
            <template v-for="(field, key) in components">
              <td
                :key="key"
                :style="widths[field.$key]"
              >
                <div
                  :style="widths[field.$key]"
                  :class="{ 'has-error': inheritErrors[field.$key] }"
                >
                  <div
                    v-if="!editable || (field.attrs.static && item[field.$key] !== undefined) || field.attrs.disable"
                    :style="`padding: 4px 8px; text-align: ${field.attrs.align ? field.attrs.align : 'left'}`"
                    :disabled="disable"
                  >
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
                  </div>
                  <template v-else>
                    <component
                      :is="field.is"
                      :class="field.classNames"
                      v-bind="field.attrs"
                      :value="item[field.$key]"
                      @input="inputItem(index, field, $event)"
                    />
                  </template>
                </div>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </QMarkupTable>
    <div style="padding: 0 0 0 6px;">
      <QBtn
        v-if="editable"
        icon="add"
        dense
        flat
        @click="addItem"
      />
    </div>
    <QResizeObserver
      :debounce="300"
      @resize="onResize"
    />
  </div>
</template>

<script type="text/javascript">
import { QBtn, QIcon, QMarkupTable, QResizeObserver } from 'quasar'
import { currencyParseInput } from 'src/settings/components'

import AppTooltip from '../Tooltip/AppTooltip'

import { AppArrayComponents, AppArrayEmpty, AppArrayItems, AppArrayProps } from './Mixins'
import { uuid } from '../../Util/general'

export default {
  /**
   */
  name: 'AppArray',
  /**
   */
  mixins: [AppArrayProps, AppArrayEmpty, AppArrayItems, AppArrayComponents],
  /**
   */
  components: { QResizeObserver, QBtn, QIcon, AppTooltip, QMarkupTable },
  /**
   */
  props: {
    static: {
      type: Boolean,
      default: false
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
    }
  },
  /**
   */
  data: () => ({
    width: 0
  }),
  /**
   */
  computed: {
    /**
     * @returns {Object}
     */
    widths () {
      if (this.disable) {
        return {}
      }
      return Object.values(this.fields())
        .filter((field) => !field.$layout.formHidden)
        .reduce((accumulator, field) => {
          let width
          if (this.width) {
            const math = Math.floor((field.$layout.formWidth * (this.width - 74)) / 100)
            width = `width: ${math}px`
          }
          accumulator[field.$key] = width
          return accumulator
        }, {})
    },
    editable () {
      return !this.static && !this.disable && !this.readonly
    }
  },
  /**
   */
  filters: {
    /**
     * @param {number} value
     */
    currency (value) {
      return currencyParseInput(value)
    },
    /**
     * @param {number} value
     */
    extension (value) {
      if (typeof value !== 'string') {
        return ''
      }
      const pieces = value.split('.')
      if (!pieces.length) {
        return ''
      }
      return `.${pieces.pop()}`
    }
  },
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
      this.$emit('input', input)
    },
    /**
     * @param {number} index
     * @param {string} field
     * @param {*} value
     */
    inputItem (index, field, value) {
      const input = [...this.value]
      input[index][field.$key] = field.$parseOutput ? field.$parseOutput(value) : value
      this.triggerEventInputInline(index, field, input[index])
      this.$emit('input', input)
    },
    /**
     * @param {number} index
     * @param {string} field
     * @param {*} item
     */
    triggerEventInputInline (index, field, item) {
      if (!field.on) {
        return
      }
      if (!Array.isArray(field.on['input-inline'])) {
        return
      }
      const forEach = (event) => {
        event.call(this, { item })
        this.items.splice(index, 1, item)
      }
      field.on['input-inline'].forEach(forEach)
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
     * @param {Object} size
     */
    onResize (size) {
      this.width = size.width
    },
    /**
     * @param {Field} field
     * @param {number} value
     */
    options (field, value) {
      if (!field.attrs?.options) {
        return ' - '
      }
      const found = field.attrs.options.find((option) => option.value === value)
      if (!found) {
        return ' - '
      }
      return found.label
    },
    /**
     * @param {Field} field
     * @param {number} value
     */
    downloadFile (field, value) {
      if (typeof field.attrs?.downloadFile !== 'function') {
        return
      }
      field.attrs.downloadFile(value)
    }
  }
}
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.AppArray {
  .AppArray__table.q-table--dense .q-table th, .AppArray__table.q-table--dense .q-table td {
    padding: 4px 2px;
  }

  .AppArray__empty {
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
