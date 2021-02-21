<template>
  <QFile
    ref="file"
    v-bind="bind"
    :value="input"
    :accept="accept"
    :multiple="multiple"
    :max-files="maxFiles"
    :max-file-size="maxFileSize"
    :max-total-size="maxTotalSize"
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
        <AppTooltip>{{ $lang('agnostic.components.file.download') }}</AppTooltip>
      </QIcon>
    </template>
  </QFile>
</template>

<script>
import { QFile, QIcon, QBtn } from 'quasar'
import AppTooltip from '../Tooltip/AppTooltip'

export default {
  /**
   */
  name: 'AppFileSync',
  /**
   */
  components: { QFile, QIcon, QBtn, AppTooltip },
  /**
   */
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxFiles: {
      type: [Number, String],
      default: 1
    },
    maxFileSize: {
      type: [Number, String],
      default: undefined
    },
    maxTotalSize: {
      type: [Number, String],
      default: undefined
    },
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
