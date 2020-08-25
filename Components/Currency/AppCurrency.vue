<template>
  <QField
    v-model="currency"
    v-bind="bind"
    v-on="on"
  >
    <template v-slot:control="{ id, floatingLabel, value: money, emitValue }">
      <money
        :id="id"
        class="q-field__input text-right"
        :value="money"
        @input="emitValue"
        v-bind="moneyFormatForComponent"
        v-show="floatingLabel"
      />
    </template>
  </QField>
</template>

<script>
import { QField } from 'quasar'
import { Money } from 'v-money'

export default {
  name: 'AppCurrency',
  components: { Money, QField },
  /**
   */
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    decimal: {
      type: String,
      default: '.'
    },
    thousands: {
      type: String,
      default: ','
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    precision: {
      type: Number,
      default: 2
    },
    masked: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  data: () => ({
    currency: 0
  }),
  /**
   */
  computed: {
    bind () {
      return { ...this.$attrs, ...this.$props, clearable: false }
    },
    on () {
      return { ...this.$listeners, input: this.updateValue, keyup: this.handleKeyboard }
    },
    moneyFormatForComponent () {
      return {
        decimal: this.decimal,
        thousands: this.thousands,
        precision: this.precision,
        masked: this.masked
      }
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Event} $event
     */
    handleKeyboard ($event) {
      $event.stopPropagation()
      $event.preventDefault()
      if ($event.key === 'ArrowDown') {
        this.minus()
        return
      }
      if ($event.key === 'ArrowUp') {
        this.plus()
      }
    },
    /**
     */
    minus () {
      this.updateValue(Number(this.value) - 1)
    },
    /**
     */
    plus () {
      this.updateValue(Number(this.value) + 1)
    },
    /**
     * @param {number | string} input
     */
    updateValue (input) {
      this.$emit('input', input)
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.currency = value
      }
    }
  }
}
</script>

<style scoped>

</style>
