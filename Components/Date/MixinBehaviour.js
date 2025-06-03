import { dateFormatter } from '../../Util/formatter'

/**
 * @typedef {Object} AppDateMixin
 */
export default {
  /**
   */
  computed: {
    /**
     * @returns {Object}
     */
    bind () {
      return { ...this.$attrs, ...this.$props }
    },
    /**
     * @returns {string}
     */
    widgetValue () {
      const value = dateFormatter(this.value, this.format, this.format)
      if (!value) {
        return ''
      }
      return value
    }
  },
  /**
   */
  data () {
    return {
      localValue: undefined
    }
  },
  /**
   */
  methods: {
    /**
     * @param {string|null} value
     */
    inputUpdateValue (value) {
      if (value === null) {
        this.$emit('input', undefined)
      }
      if (String(value).length < String(this.display).length) {
        this.$emit('input', undefined)
        return
      }
      const input = dateFormatter(value, this.format, this.display)
      if (input) {
        this.$emit('input', input)
        return
      }
      this.$emit('input', undefined)
    },
    /**
     * @param {string|null} value
     */
    blurUpdateValue (value) {
      if (typeof value !== 'string' || value === '') {
        return
      }
      if (String(value).length < String(this.display).length) {
        this.localValue = undefined
        return
      }
      const localValue = dateFormatter(this.value, this.display, this.format)
      if (!localValue) {
        this.localValue = undefined
      }
    },
    /**
     * @param {string} value
     */
    widgetUpdateValue (value) {
      this.$emit('input', value)
    }
  },
  /**
   */
  watch: {
    /**
     */
    value: {
      immediate: true,
      handler (value) {
        if (typeof value !== 'string') {
          this.localValue = undefined
          return
        }
        if (String(value).length < String(this.format).length) {
          return
        }
        const localValue = dateFormatter(value, this.display, this.format)
        if (!localValue) {
          this.localValue = undefined
          return
        }
        this.localValue = localValue
      }
    }
  }
}
