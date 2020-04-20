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
      <QIcon
        name="vpn_key"
        class="cursor-pointer"
        @click="generate"
      >
        <QTooltip>{{ generatorTooltip }}</QTooltip>
      </QIcon>
    </template>
    <template v-slot:append>
      <QIcon
        :name="visible ? 'no_encryption' : 'lock'"
        class="cursor-pointer"
        @click="visible = !visible"
      >
        <QTooltip>{{ visibleTooltip }}</QTooltip>
      </QIcon>
    </template>
  </QInput>
</template>

<script>
import { QInput, QTooltip, QIcon, copyToClipboard } from 'quasar'
import { replacement } from 'src/app/Util/string'

export default {
  /**
   */
  name: 'AppPassword',
  /**
   */
  components: { QInput, QTooltip, QIcon },
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
    },
    generatorTitle: {
      type: String,
      default: undefined
    },
    visibleTitle: {
      type: String,
      default: undefined
    }
  },
  /**
   */
  computed: {
    bind () {
      return { ...this.$attrs, ...this.$props }
    },
    generatorTooltip () {
      const template = this.generatorTitle || this.$lang(`agnostic.components.password.generator.tooltip`)
      return replacement(template, { length: this.length })
    },
    visibleTooltip () {
      return this.visibleTitle || this.$lang(`agnostic.components.password.visible.tooltip`)
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
