<template>
  <QInput
    v-bind="bind"
    v-on="$listeners"
    :type="visible ? 'text' : 'password'"
  >
    <template
      v-slot:prepend
      v-if="generator"
    >
      <q-icon
        name="vpn_key"
        class="cursor-pointer"
        @click="generate"
      />
    </template>
    <template v-slot:append>
      <q-icon
        :name="visible ? 'no_encryption' : 'lock'"
        class="cursor-pointer"
        @click="visible = !visible"
      />
    </template>
  </QInput>
</template>

<script>
import { QInput, copyToClipboard } from 'quasar'

export default {
  /**
   */
  name: 'AppPassword',
  /**
   */
  components: { QInput },
  /**
   */
  props: {
    value: {
      default: null
    },
    generator: {
      type: Boolean,
      default: true
    },
    length: {
      type: Number,
      default: 8
    }
  },
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
    visible: false
  }),
  /**
   */
  methods: {
    /**
     */
    generate () {
      this.visible = true
      // noinspection SpellCheckingInspection
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      const value = Array(this.length)
        .fill(chars)
        .map((item) => item[Math.floor(Math.random() * item.length)])
        .join('')
      copyToClipboard(value)
        .then(() => {
          this.$q.notify({
            message: 'A new password was created and has been copied to clipboard',
            caption: value
          })
          this.$emit('generate', value)
          this.$emit('input', value)
        })
    }
  }
}
</script>

<style scoped>

</style>