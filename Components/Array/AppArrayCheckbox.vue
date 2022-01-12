<template>
  <div class="AppArrayCheckbox">
    <div>
      <QCheckbox
        v-if="!readonly"
        :value="all"
        @input="select"
        label="Selecionar todos"
      />
      <div class="q-pa-sm">
        <QInput
          v-bind="$options.bind"
          v-model="search"
          :placeholder="placeholder"
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
          v-for="(item, index) in items"
          :key="index"
        >
          <QCheckbox
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
        boundary-links
        :max="pages"
        :max-pages="7"
        :boundary-numbers="false"
      />
    </div>
  </div>
</template>

<script>
import { QCheckbox, QInput, QPagination, QSpinner } from 'quasar'

import { attrs } from 'src/settings/components'

export default {
  /**
   */
  name: 'AppArrayCheckbox',
  /**
   */
  bind: attrs,
  /**
   */
  components: { QCheckbox, QInput, QPagination, QSpinner },
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
    error: {
      type: Boolean,
      default: () => false
    },
    errorMessage: {
      type: String,
      default: () => undefined
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    rowsPerPage: {
      type: Number,
      default: () => 10
    },
    primaryKey: {
      type: String,
      default: () => 'value'
    },
    displayKey: {
      type: String,
      default: () => 'label'
    },
    placeholder: {
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
    loading: false
  }),
  /**
   */
  computed: {
    /**
     * @return {Record<string, unknown>}>}
     */
    style () {
      return { height: `${this.rowsPerPage * 40}px` }
    },
    /**
     * @return {{value: string, label: string}[]}
     */
    items () {
      const offset = (this.current - 1) * this.rowsPerPage
      const limit = this.rowsPerPage
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
     * @param {boolean} $event
     */
    select ($event) {
      if (this.readonly) {
        return
      }

      if ($event === true) {
        const all = this.options.filter(this.filter)
        this.$emit('input', all)
        return
      }
      this.$emit('input', [])
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
        return { [this.field]: element, ...previous }
      } catch (e) {
        // silence is gold
      }
      return { [this.field]: { [this.primaryKey]: value }, ...previous }
    },
    /**
     * @param {{label: string, value: string}} item
     * @return {boolean}
     */
    filter (item) {
      if (!this.search) {
        return true
      }

      let label = ''
      try {
        label = item[this.displayKey]
      } catch (e) {
        // silence is gold
      }
      if (!label) {
        return false
      }
      return label.toLowerCase().includes(this.search.toLowerCase())
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
        label = item[this.displayKey]
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
      this.pages = Math.ceil(total.length / this.rowsPerPage)
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

.AppArrayCheckbox {
  border-style: solid;
  border-color: #e1e1e1;
  border-width: 1px;
  border-radius: 4px;

  .AppArrayCheckbox__options {
  }
}
</style>
