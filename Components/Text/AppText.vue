<template>
  <div
    class="AppText"
    :class="classNames"
    :style="styles"
  >
    <template v-if="html">
      <div v-html="value" />
    </template>
    <template v-else>
      {{ value }}
    </template>
  </div>
</template>

<script> export default {
  /**
  */
  name: 'AppText',
  /**
  */
  props: {
    value: {
      type: [String, Number, undefined],
      default: ''
    },
    classNames: {
      type: [String, Object, Array],
      default: 'text-default'
    },
    styles: {
      type: [String, Object, Array],
      default: ''
    },
    html: {
      type: Boolean,
      default: false
    }
  }
} </script>
