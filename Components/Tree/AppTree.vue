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
      validator (value) {
        if (value === undefined || value === null) {
          return true
        }
        return Array.isArray(value)
      },
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
    },
    readonly: {
      type: Boolean,
      default: false
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
        expanded: this.expanded,
        nodes: this.parseNodes()
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
    },
    /**
     * @return {Array}
     */
    parseNodes () {
      const reducer = (accumulator, node) => {
        const newest = { ...node }
        if (!newest.children || (Array.isArray(newest.children) && !newest.children.length)) {
          if (this.readonly) {
            newest.disabled = true
          }
          accumulator.push(this.parseNodeLabel(newest))
          return accumulator
        }
        newest.children = newest.children.reduce(reducer, [])
        accumulator.push(this.parseNodeLabel(newest))
        return accumulator
      }
      return this.nodes.reduce(reducer, [])
    },
    /**
     * @param node
     * @returns {*}
     */
    parseNodeLabel (node) {
      const label = this.$t(node.label)
      return { ...node, label }
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
          return
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
