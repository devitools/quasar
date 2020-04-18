<template>
    <QFile
      ref="file"
      v-bind="bind"
      :value="input"
      @input="updateValue"
    >
        <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="attach_file"
              @click="pickFiles"
            />
        </template>
    </QFile>
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
    props: {
        value: {
            type: [File, FileList, Array, Object, String],
            default: null
        }
    },
    /**
     */
    computed: {
        bind () {
            return { ...this.$attrs, ...this.$props }
        },
        input () {
            if (typeof this.value === 'string') {
                return null
            }
            return this.value
        }
    },
    /**
     */
    data: () => ({
        model: null,
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
        }
    }
}
</script>
