<template>
  <div class="AppArrayForm">
    <div class="AppArrayForm__wrapper">
      <AppArrayHead
        :domain="domain"
        :fields="fields"
        :readonly="readonly"
      />

      <template v-if="records.length">
        <div class="AppArrayForm__body">
          <template v-for="(record, index) in records">
            <AppArrayRow
              :key="record.__uuid"
              :ref="`body-${index}`"
              :fields="fields"
              :value="record"
              :domain="domain"
              :primary-key="primaryKey"
              :hooks="hooks"
              :readonly="readonly"
              :static="static"
              :editable="editable[record.__uuid]"
              @edit="setEditable(record.__uuid, $event)"
              @input="updateItem(index, $event)"
              @cancel="cancelItem(index)"
              @remove="removeItem(index)"
            />
          </template>
        </div>
      </template>

      <template v-else>
        <div
          class="AppArray__empty"
          v-html="empty"
        />
      </template>
    </div>

    <div>
      <QBtn
        v-if="!readonly && !static"
        unelevated
        dense
        color="white"
        text-color="grey-9"
        icon="add"
        @click="addItem"
      >
        <AppTooltip>{{ $lang('agnostic.components.array.add') }}</AppTooltip>
      </QBtn>
    </div>
  </div>
</template>

<script type="text/javascript">
import { QBtn } from 'quasar'

import { uuid } from '../../Util/general'

import { AppArrayEmpty, AppArrayProps } from './Mixins'
import AppArrayHead from './Partials/AppArrayHead'
import AppArrayRow from './Partials/AppArrayRow'

export default {
  /**
   */
  name: 'AppArrayForm',
  /**
   */
  mixins: [AppArrayEmpty, AppArrayProps],
  /**
   */
  components: { AppArrayRow, AppArrayHead, QBtn },
  /**
   */
  data: () => ({
    head: {},
    records: [],
    editable: {}
  }),
  /**
   */
  methods: {
    /**
     */
    newest () {
      const newest = { __new: true, __uuid: uuid() }
      if (this.useUuid) {
        newest[this.primaryKey] = uuid()
      }
      const reduce = (accumulator, field) => {
        accumulator[field.$key] = field.attrs.value
        return accumulator
      }
      return Object.values(this.fields()).reduce(reduce, newest)
    },
    /**
     */
    addItem () {
      const newest = this.newest()

      const records = [...this.records, newest]
      this.records = records

      this.$nextTick(() => {
        let ref = this.$refs[`body-${records.length - 1}`]
        if (!ref) {
          return
        }
        if (Array.isArray(ref)) {
          ref = ref[0]
        }
        if (ref) {
          ref.editRow()
        }
      })
    },
    /**
     * @param {number} index
     */
    removeItem (index) {
      const records = [...this.records]
      this.dropEditable(records[index])
      records.splice(index, 1)
      this.$emit('input', records)
    },
    /**
     * @param {number} index
     */
    cancelItem (index) {
      const records = [...this.records]
      this.dropEditable(records[index])
      records.splice(index, 1)
      this.records = records
    },
    /**
     * @param {number} index
     * @param {*} record
     */
    updateItem (index, record) {
      const records = [...this.records]
      records[index] = record
      this.updateValue(index, records)
    },
    /**
     * @param {number|string} id
     * @param {boolean} editable
     */
    setEditable (id, editable) {
      this.$set(this.editable, id, editable)
    },
    /**
     * @param {Record<string, unknown>} row
     */
    dropEditable (row) {
      try {
        const id = row.__uuid
        this.$delete(this.editable, id)
      } catch (e) {
        // silent is gold
      }
    },
    /**
     * @param {number} index
     * @param {*} records
     */
    updateValue (index, records) {
      const input = records.map((record) => {
        if (record.__new) {
          delete record.__new
        }
        return record
      })
      this.$emit('input', input)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (Array.isArray(value)) {
          this.records = value.map((row) => {
            const id = row[this.primaryKey] || row.__uuid || uuid()
            return { ...row, __uuid: id }
          })
          return
        }
        this.records = []
      }
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
@import '~src/css/quasar.variables.styl'
@import './Partials/app-array-include.styl'

.AppArrayForm {

  .AppArray__empty {
    @extend .AppArrayForm__element--color
    border-width: 1px 0 0 0;
    padding: 10px;
    text-align: center;
    color: #797979;
  }

  .AppArrayForm__wrapper {
    @extend .AppArrayForm__element--color
    border-width: 1px;
    border-radius: 4px;

    .AppArrayForm__body {
      .app-form__label {
        display: none;
      }
    }
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
