<template>
  <q-input
    :mask="mask"
    v-model="localValue"
    @input="inputUpdateValue($event)"
    @blur="blurUpdateValue($event.target.value)"
    v-bind="bind"
  >
    <template v-slot:prepend>
      <DateWidgetDate
        :format="format"
        :value="widgetValue"
        :disable="readonly"
        @input="widgetUpdateValue($event)"
      />
    </template>
    <template v-slot:append>
      <DateWidgetDatetime
        :format="format"
        :value="widgetValue"
        :disable="readonly"
        @input="widgetUpdateValue($event)"
      />
    </template>
  </q-input>
</template>

<script>
import { QInput } from 'quasar'
import MixinPropsDatetime from './MixinPropsDatetime'
import MixinBehaviour from './MixinBehaviour'
import DateWidgetDate from './DateWidgetDate'
import DateWidgetDatetime from './DateWidgetDatetime'

export default {
  /**
   */
  name: 'AppDate',
  /**
   */
  components: { QInput, DateWidgetDate, DateWidgetDatetime },
  /**
   */
  mixins: [MixinPropsDatetime, MixinBehaviour]
}
</script>

<style scoped>

</style>
