<template>
  <q-input
    :mask="mask"
    :value="inputValue"
    @input="inputUpdateValue($event)"
    v-bind="inputAttrs"
  >
    <template v-slot:prepend>
      <DateWidgetDate
        :format="format"
        :value="widgetValue"
        @input="widgetUpdateValue($event)"
      />
    </template>
    <template v-slot:append>
      <DateWidgetDatetime
        :format="format"
        :value="widgetValue"
        @input="widgetUpdateValue($event)"
      />
    </template>
  </q-input>
</template>

<script>
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
  components: { DateWidgetDate, DateWidgetDatetime },
  /**
   */
  mixins: [MixinPropsDatetime, MixinBehaviour]
}
</script>

<style scoped>

</style>
