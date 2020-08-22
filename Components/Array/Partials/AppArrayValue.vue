<template>
  <label class="q-field row q-input q-field--outlined q-field--dense q-field--readonly">
    <div class="q-field__inner relative-position col self-stretch column justify-center">
      <div class="q-field__control relative-position row no-wrap">
        <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
          <div
            class="q-field__native q-placeholder"
            v-html="output"
          />
        </div>
      </div>
    </div>
  </label>
</template>

<script type="text/javascript">
export default {
  /**
   */
  name: 'AppArrayValue',
  /**
   */
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    },
    field: {
      type: Object,
      required: true
    }
  },
  /**
   */
  computed: {
    output () {
      if (typeof this.field.$layout.tableFormat === 'function') {
        return this.field.$layout.tableFormat(this.value)
      }
      if (typeof this.value === 'undefined') {
        return ''
      }
      return String(this.value)
    }
  }
}
</script>
