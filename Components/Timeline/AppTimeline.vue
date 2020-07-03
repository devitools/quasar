<template>
  <QTimeline :color="color">
    <QTimelineEntry
      v-for="(entry, index) in entries"
      :key="index"
      v-bind="entry"
    >
      <template v-if="entry.html">
        <div v-html="entry.html" />
      </template>
    </QTimelineEntry>
  </QTimeline>
</template>

<script>
import { QTimeline, QTimelineEntry } from 'quasar'

export default {
  /**
   */
  name: 'AppTimeline',
  /**
   */
  components: { QTimeline, QTimelineEntry },
  /**
   */
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    map: {
      type: Function,
      default: (row) => row
    },
    color: {
      type: String,
      default: 'accent'
    }
  },
  /**
   */
  computed: {
    entries () {
      return this.value.map(this.map)
    }
  }
}
</script>

<style scoped>

</style>
