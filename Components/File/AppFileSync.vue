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
      v-slot:append
      v-if="typeof value === 'string'"
    >
      <QIcon
        name="cloud_download"
        class="cursor-pointer"
        @click="download"
      />
    </template>
  </QFile>
</template>

<script>
import { QFile, QIcon, QBtn } from 'quasar'

export default {
  /**
   */
  name: 'AppFileSync',
  /**
   */
  components: { QFile, QIcon, QBtn },
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
        return new File(['empty'], this.value)
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
