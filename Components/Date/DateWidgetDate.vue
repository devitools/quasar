<template>
  <QIcon
    class="cursor-pointer"
    name="event"
  >
    <QPopupProxy
      ref="qDateProxy"
      transition-hide="scale"
      transition-show="scale"
    >
      <QDate
        :mask="format"
        :value="value"
        @input="input"
      />
    </QPopupProxy>
  </QIcon>
</template>

<script>
import { QIcon, QPopupProxy, QDate } from 'quasar'
import AppDateMixinProps from './MixinPropsDate'

export default {
  /**
   */
  name: 'DateWidgetDate',
  /**
   */
  mixins: [AppDateMixinProps],
  /**
   */
  components: { QIcon, QPopupProxy, QDate },
  /**
   */
  methods: {
    /**
     * @param value
     */
    input (value) {
      this.$refs.qDateProxy.hide()
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>

</style>
