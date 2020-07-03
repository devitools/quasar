<template>
  <QFile
    ref="file"
    v-bind="bind"
    :value="input"
    @input="updateValue"
  >
    <template v-slot:prepend>
      <QBtn
        round
        dense
        flat
        icon="attach_file"
        @click="pickFiles"
      />
    </template>
    <template
      v-slot:after
      v-if="typeof value === 'string'"
    >
      <QIcon
        name="cloud_download"
        class="cursor-pointer"
        @click="download"
      >
        <QTooltip>{{ $lang('agnostic.components.file.download') }}</QTooltip>
      </QIcon>
    </template>
  </QFile>
</template>

<script>
import { QFile, QIcon, QBtn, QTooltip } from 'quasar'

export default {
  /**
   */
  name: 'AppFileSync',
  /**
   */
  components: { QFile, QIcon, QBtn, QTooltip },
  /**
   */
  props: {
    value: {
      type: [File, FileList, Array, Object, String],
      default: null
    },
    downloadFile: {
      type: Function,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    downloadName: {
      type: String,
      default: 'agnostic.components.file.downloadName'
    }
  },
  /**
   */
  computed: {
    bind () {
      return { ...this.$attrs, ...this.$props, label: !this.value ? this.placeholder : '' }
    },
    input () {
      if (typeof this.value === 'string') {
        const extension = this.value.split('.').pop()
        return new File(['empty'], `${this.$lang(this.downloadName)}.${extension}`)
      }
      return this.value
    }
  },
  /**
   */
  data: () => ({
    model: null
  }),
  /**
   */
  methods: {
    /**
     * @param {File} $event
     */
    updateValue ($event) {
      if ($event === undefined) {
        this.$emit('input', this.model)
        return
      }
      this.model = $event
      this.$emit('input', $event)
    },
    /**
     */
    pickFiles () {
      this.$refs.file.pickFiles()
    },
    /**
     */
    download () {
      // noinspection JSCheckFunctionSignatures
      this.downloadFile(this.value, this.model)
    }
  }
}
</script>
