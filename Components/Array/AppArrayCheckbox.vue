<template>
  <div class="AppArrayCheckbox">
    <div class="AppArrayCheckbox__container">
      <div class="AppArrayCheckbox__header">
        <div class="flex items-center justify-between q-pa-sm">
          <QCheckbox
            dense
            :disabled="readonly"
            :label="$lang('agnostic.components.array.all')"
            :value="all"
            @input="select"
          />
          <div class="q-pr-xs">
            <QToggle
              :label="$lang('agnostic.components.array.checked')"
              v-model="checked"
            />
          </div>
        </div>
        <div class="q-pl-sm q-pr-sm">
          <QInput
            v-bind="$options.bind"
            v-model="search"
            :placeholder="placeholder || $lang('agnostic.components.array.search')"
          />
        </div>
      </div>

      <template v-if="loading">
        <div
          class="AppArrayCheckbox__options flex items-center justify-center"
          :style="style"
        >
          <QSpinner
            color="primary"
            size="5em"
            :thickness="2"
          />
        </div>
      </template>
      <template v-else>
        <div
          class="AppArrayCheckbox__options"
          :style="style"
        >
          <div
            v-for="(item) in items"
            :key="item.value"
            class="q-pl-sm q-pr-sm q-mt-sm q-mb-sm"
          >
            <QCheckbox
              dense
              :val="item.value"
              :label="item.label"
              :value="ids"
              :disabled="readonly"
              @input="input"
            />
          </div>
        </div>
      </template>

      <div class="row justify-center q-pa-sm">
        <QPagination
          v-model="current"
          direction-links
          :boundary-links="$q.platform.is.desktop"
          :boundary-numbers="$q.platform.is.desktop"
          :max="pages"
          :max-pages="maxPages"
        />
      </div>
    </div>

    <template v-if="hint">
      <div class="q-field__bottom">
        <div class="q-field__messages">
          <div>{{ hint }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { QCheckbox, QInput, QPagination, QSpinner, QToggle } from 'quasar'

import { attrs } from 'src/settings/components'

const LINE_HEIGHT = 30

export default {
  /**
   */
  name: 'AppArrayCheckbox',
  /**
   */
  bind: attrs,
  /**
   */
  components: { QCheckbox, QInput, QPagination, QSpinner, QToggle },
  /**
   */
  props: {
    field: {
      type: String,
      required: true
    },
    remote: {
      type: Function,
      required: true
    },
    value: {
      type: [Array],
      default: () => ([])
    },
    options: {
      type: Array,
      default: () => ([])
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    rowsPerPage: {
      type: Number,
      default: () => undefined
    },
    adjustment: {
      type: Number,
      default: () => 400
    },
    maxPages: {
      type: Number,
      default: () => 5
    },
    primaryKey: {
      type: String,
      default: () => 'value'
    },
    displayKey: {
      type: String,
      default: () => 'label'
    },
    format: {
      type: Function,
      default: undefined
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    hint: {
      type: String,
      default: () => ''
    },
    query: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  data: () => ({
    search: '',
    current: 1,
    pages: 1,
    loading: false,
    checked: false,
    toggle: false
  }),
  /**
   */
  computed: {
    /**
     * @return {Record<string, unknown>}>}
     */
    style () {
      if (this.$q.screen.width < 768) {
        return { height: 'auto' }
      }
      let height = this.$q.screen.height - this.adjustment
      if (height < 200) {
        height = 200
      }
      return { height: `${height}px` }
    },
    /**
     * @return {number}
     */
    size () {
      if (this.rowsPerPage) {
        return this.rowsPerPage
      }
      let height = this.$q.screen.height - this.adjustment
      if (height < 200) {
        height = 200
      }
      return Math.floor(height / LINE_HEIGHT)
    },
    /**
     * @return {{value: string, label: string}[]}
     */
    items () {
      const offset = (this.current - 1) * this.size
      const limit = this.size
      return this.options
        .filter(this.filter)
        .slice(offset, offset + limit)
        .map(this.map)
    },
    /**
     * @return {boolean|undefined}
     */
    all () {
      if (this.value.length === 0) {
        return false
      }
      if (this.value.length === this.options.length) {
        return true
      }
      return undefined
    },
    /**
     * @return {string[]}
     */
    ids () {
      if (!Array.isArray(this.value)) {
        return []
      }
      return this.value.map((item) => {
        try {
          return item[this.field][this.primaryKey]
        } catch (e) {
          // silence is gold
        }
        return ''
      })
    }
  },
  /**
   */
  created () {
    this.updateOptions()
  },
  /**
   */
  methods: {
    /**
     * @param {string[]} $event
     */
    input ($event) {
      if (this.readonly) {
        return
      }

      if (!Array.isArray($event)) {
        this.$emit('input', [])
        return
      }

      const selected = $event.map(this.valueToModel)
      this.$emit('input', selected)
    },
    /**
     */
    select () {
      if (this.readonly) {
        return
      }

      this.toggle = this.value?.length === 0 ? false : !this.toggle
      if (this.toggle) {
        this.$emit('input', [])
        return
      }
      const all = this.options.filter(this.filter).map(this.optionToModel)
      this.$emit('input', all)
    },
    /**
     * @param {string|number} value
     * @return {Record<string, unknown>}>}
     */
    valueToModel (value) {
      let previous = this.value.find((item) => {
        try {
          return item[this.field][this.primaryKey] === value
        } catch (e) {
          // silence is gold
        }
        return false
      })
      if (!previous) {
        previous = {}
      }
      try {
        const element = this.options.find((option) => {
          return option[this.primaryKey] === value
        })
        return { [this.field]: { ...element }, ...previous }
      } catch (e) {
        // silence is gold
      }
      return { [this.field]: { [this.primaryKey]: value }, ...previous }
    },
    /**
     * @param {Record<string, unknown>} option
     * @return {Record<string, unknown>}
     */
    optionToModel (option) {
      let previous = this.value.find((item) => {
        try {
          return item[this.field][this.primaryKey] === option[this.primaryKey]
        } catch (e) {
          // silence is gold
        }
        return false
      })
      if (!previous || !previous[this.primaryKey]) {
        previous = {}
      }
      try {
        const element = this.options.find((item) => {
          return item[this.primaryKey] === option[this.primaryKey]
        })
        return { [this.field]: { ...element }, ...previous }
      } catch (e) {
        // silence is gold
      }
      return { [this.field]: { [this.primaryKey]: option }, ...previous }
    },
    /**
     * @param {{label: string, value: string}} item
     * @return {boolean}
     */
    filter (item) {
      if (!this.search && !this.checked) {
        return true
      }

      let search = true
      if (search) {
        try {
          const label = item[this.displayKey]
          search = label.toLowerCase().includes(this.search.toLowerCase())
        } catch (e) {
          // silence is gold
        }
        const label = this.format ? this.format(item) : item[this.displayKey]
      }

      let checked = true
      if (this.checked) {
        try {
          checked = this.value
            .map((item) => item[this.field][this.primaryKey])
            .includes(item[this.primaryKey])
        } catch (e) {
          // silence is gold
        }
      }

      return search && checked
    },
    /**
     * @param {Record<string, unknown>} item
     * @return {{label: string, value: string}}
     */
    map (item) {
      let value = ''
      try {
        value = item[this.primaryKey]
      } catch (e) {
        // silence is gold
      }
      let label = ''
      try {
        label = this.format ? this.format(item) : item[this.displayKey]
      } catch (e) {
        // silence is gold
      }
      return {
        value,
        label
      }
    },
    /**
     */
    updatePages () {
      if (!Array.isArray(this.options)) {
        return
      }
      const total = this.options.filter(this.filter)
      this.pages = Math.ceil(total.length / this.size)
    },
    /**
     */
    async updateOptions () {
      if (typeof this.remote !== 'function') {
        return
      }
      this.loading = true
      try {
        const response = await this.remote(this.query)
        let options = response?.rows ?? []
        if (!Array.isArray(options)) {
          options = []
        }
        this.$emit('update:options', options)
      } catch (e) {
        // silence is gold
      }
      this.loading = false
    }
  },
  /**
   */
  watch: {
    /**
     */
    options: {
      immediate: true,
      handler () {
        this.updatePages()
      }
    },
    /**
     */
    search: {
      immediate: true,
      handler () {
        this.updatePages()
      }
    },
    /**
     */
    checked: {
      immediate: true,
      handler () {
        this.updatePages()
      }
    },
    /**
     */
    rowsPerPage: {
      immediate: true,
      handler () {
        this.updatePages()
      }
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.SchemaForm .field .AppArrayCheckbox div[role="checkbox"], .SchemaTable .field .AppArrayCheckbox div[role="checkbox"] {
  padding: 0;
}

@media (max-width: 768px) {
  .SchemaForm .AppArrayCheckbox .q-pagination .q-btn,
  .SchemaTable .AppArrayCheckbox .q-pagination .q-btn,
  .SchemaForm .AppArrayCheckbox .q-pagination .q-btn-section,
  .SchemaTable .AppArrayCheckbox .q-pagination .q-btn-section {
    min-width: 2em !important;
  }
}

.AppArrayCheckbox {
  .AppArrayCheckbox__container {
    border-style: solid;
    border-color: #e1e1e1;
    border-width: 1px;
    border-radius: 4px;

    .AppArrayCheckbox__options {
      overflow: auto;
    }
  }

  .q-field__bottom {
    padding: 8px 0 0 0;
  }
}
</style>
