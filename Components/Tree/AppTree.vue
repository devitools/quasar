<template>
  <q-tree
    @update:ticked="updateValue($event)"
    :ticked.sync="ticked"
    :expanded.sync="expanded"
    v-bind="bind"
  />
</template>

<script>
import { QTree } from 'quasar'

export default {
  /**
   */
  name: 'AppTree',
  /**
   */
  props: {
    value: {
      type: [Array, Object],
      required: true
    },
    nodes: {
      type: Array,
      required: true
    },
    valueKey: {
      type: String,
      default: ''
    },
    open: {
      type: Array,
      default: () => []
    }
  },
  /**
   */
  computed: {
    bind () {
      return {
        ...this.$attrs,
        ...this.$props,
        ticked: this.ticked,
        expanded: this.expanded
      }
    }
  },
  /**
   */
  data () {
    return {
      ticked: [],
      expanded: []
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Array} ticked
     */
    updateValue (ticked) {
      if (this.valueKey) {
        this.$emit('input', ticked.map(item => ({ [this.valueKey]: item })))
        return
      }
      this.$emit('input', ticked)
    }
  },
  /**
   */
  watch: {
    value: {
      handler (value) {
        if (!Array.isArray(value)) {
          return
        }
        if (this.valueKey) {
          this.ticked = value.map((item) => item[this.valueKey])
        }
        this.ticked = value
      },
      immediate: true
    },
    open: {
      handler (expanded) {
        if (!Array.isArray(expanded)) {
          return
        }
        this.expanded = expanded
      },
      immediate: true
    }
  },
  /**
   */
  components: {
    QTree
  }
}
</script>
