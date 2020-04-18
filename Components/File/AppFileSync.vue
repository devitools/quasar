<template>
    <QFile
      v-model="model"
      v-bind="bind"
      @input="updateValue"
    />
</template>

<script>
import { QFile } from 'quasar'

export default {
  /**
   */
  name: 'AppFileSync',
  /**
   */
  components: { QFile },
  /**
   */
  computed: {
    bind () {
      return { ...this.$attrs, ...this.$props }
    }
  },
  /**
   */
  data: () => ({
    model: undefined
  }),
  /**
   */
  methods: {
    /**
     * @param {File} $event
     */
    updateValue ($event) {
      if ($event === undefined) {
        return
      }
      this.$emit('input', $event)
    }
  }
}
</script>
