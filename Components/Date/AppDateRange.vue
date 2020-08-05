<template>
  <QInput
    mask="##/##/#### - ##/##/####"
    :value="inputValue"
    @input="inputUpdateValue($event)"
    v-bind="inputAttrs"
  >
    <template v-slot:prepend>
      <DateWidgetDate
        :format="format"
        :value="startValue"
        @input="startUpdateValue($event)"
      />
    </template>
    <template v-slot:append>
      <DateWidgetDate
        :format="format"
        :value="endValue"
        :disable="endDisabled"
        @input="endUpdateValue($event)"
      />
    </template>
  </QInput>
</template>

<script>
import { QInput } from 'quasar'

import MixinPropsDate from './MixinPropsDate'
import MixinBehaviour from './MixinBehaviour'
import DateWidgetDate from './DateWidgetDate'
import { dateFormatter } from '@devitools/Util/formatter'

export default {
  /**
   */
  name: 'AppDateRange',
  /**
   */
  mixins: [MixinPropsDate, MixinBehaviour],
  /**
   */
  components: { QInput, DateWidgetDate },
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    inputValue () {
      const start = dateFormatter(this.startValue, this.display, this.format)
      const end = dateFormatter(this.endValue, this.display, this.format)
      return `${start} - ${end}`
    },
    /**
     * @returns {string}
     */
    startValue () {
      const start = String(this.value).split(',').shift().trim()
      const value = dateFormatter(start, this.format, this.format)
      if (!value) {
        return ''
      }
      return value
    },
    /**
     * @returns {string}
     */
    endValue () {
      const end = String(this.value).split(',').pop().trim()
      const value = dateFormatter(end, this.format, this.format)
      if (!value) {
        return ''
      }
      return value
    },
    /**
     * @return {boolean}
     */
    endDisabled () {
      return String(this.value).split(',') < 1
    }
  },
  /**
   */
  methods: {
    /**
     * @param {string} value
     */
    inputUpdateValue (value) {
      let [start, end] = String(value).split('-')
      start = dateFormatter(String(start).trim(), this.format, this.display)
      end = dateFormatter(String(end).trim(), this.format, this.display)
      if (start && end) {
        this.$emit('input', `${start},${end}`)
        return
      }
      this.$emit('input', '')
    },
    /**
     * @param {string} start
     */
    startUpdateValue (start) {
      let [, end] = String(this.value).split(',')
      end = dateFormatter(String(end).trim(), this.format, this.format)
      if (end) {
        this.$emit('input', `${start},${end}`)
        return
      }
      this.$emit('input', start)
    },
    /**
     * @param {string} end
     */
    endUpdateValue (end) {
      let [start] = String(this.value).split(',')
      start = dateFormatter(String(start).trim(), this.format, this.format)
      if (start) {
        this.$emit('input', `${start},${end}`)
        return
      }
      this.$emit('input', `,${end}`)
    }
  }
}
</script>

<style scoped>

</style>
