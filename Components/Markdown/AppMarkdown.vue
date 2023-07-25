<template>
  <div
    class="AppMarkdown"
    :class="{ 'AppMarkdown--both': selected === 'both' }"
  >
    <div class="q-field__toolbar">
      <QBtnToggle
        v-if="!readonly"
        v-model="selected"
        color="default"
        toggle-color="primary"
        :options="options"
      >
        <template v-slot:preview>
          <div class="row items-center no-wrap">
            <QIcon
              name="image"
              size="xs"
            />
          </div>
        </template>
        <!--<template v-slot:both>-->
        <!--  <div class="row items-center no-wrap">-->
        <!--    <QIcon-->
        <!--      name="vertical_split"-->
        <!--      size="xs"-->
        <!--    />-->
        <!--  </div>-->
        <!--</template>-->
        <template v-slot:editor>
          <div class="row items-center no-wrap">
            <QIcon
              name="mdi-language-markdown-outline"
              size="xs"
            />
          </div>
        </template>
      </QBtnToggle>
    </div>
    <QField v-bind="$attrs">
      <template v-slot:control>
        <textarea
          v-if="selected !== 'preview'"
          class="q-field__in"
          :value="value"
          @input="update"
        />
        <div
          v-if="selected !== 'editor'"
          class="q-field__out"
          v-html="output"
        />
      </template>
    </QField>
  </div>
</template>

<script>
import { debounce, QBtnToggle, QIcon } from 'quasar'
import { marked } from 'marked'

export default {
  /**
   */
  name: 'AppMarkdown',
  /**
   */
  components: { QBtnToggle, QIcon },
  /**
   */
  props: {
    value: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'editor'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  data: () => ({
    selected: 'preview',
    options: [
      { slot: 'editor', value: 'editor' },
      /*{ slot: 'both', value: 'both' },*/
      { slot: 'preview', value: 'preview' }
    ]
  }),
  /**
   */
  computed: {
    /**
     */
    output () {
      if (typeof this.value !== 'string') {
        return ''
      }
      return marked(this.value, { breaks: true })
    }
  },
  /**
   */
  watch: {
    /**
     */
    mode: {
      immediate: true,
      handler (selected) {
        this.selected = selected
      }
    },
    /**
     */
    readonly: {
      immediate: true,
      handler (readonly) {
        if (!readonly) {
          return
        }
        this.selected = 'preview'
      }
    }
  },
  /**
   */
  methods: {
    /**
     */
    update: debounce(function (e) {
      if (this.readonly) {
        return
      }
      this.$emit('input', e.target.value)
    }, 300)
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppMarkdown {
  position: relative;

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  h5 {
    font-size: 1.1rem;
  }

  h6 {
    font-size: 1.05rem;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 5px 0;
    line-height: 150%;
  }

  .q-field__toolbar {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 4px;
    z-index: 100;
    background-color: #fff;
    opacity: 0.4;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .q-field__control {
    color: #3c3c3c;
    display: block;
    padding: 1px;
    min-height: 80px !important;

    .q-field__native {
      padding: 0;
    }

    .q-field__out {
      overflow: auto;
      padding: 15px 10px 10px 10px;
      font-family: 'Monaco', courier, monospace !important;
      font-size: 0.8rem;
      background-color: #f9f9f9;
      width: 100%;
      min-height: 400px;

      table {
        width: 100%;
        color: #212529;
        border-collapse: collapse;
        font-size: 0.8rem;

        thead > tr > th {
          vertical-align: bottom;
          border-bottom: 1px solid #c2c2c2;
        }

        tbody > tr > td {
          border-top: 1px solid #c2c2c2;
        }

        thead > tr > th, tbody > tr > td {
          padding: 5px 10px;
          vertical-align: top;
        }

        tbody > tr:nth-child(2n) {
          background-color: #ededed;
        }
      }
    }

    .q-field__in {
      border: none;
      resize: none;
      outline: none;
      padding: 15px 10px 10px 10px;
      font-size: 0.8rem;
      font-family: 'Monaco', courier, monospace !important;
      width: 100%;
      display: block;
      min-height: 400px;
    }
  }


  &.AppMarkdown--both {
    .q-field__control {
      .q-field__native {
        align-items: baseline;
      }

      .q-field__in, .q-field__out {
        width: 50%;
        height: 100%
      }

      .q-field__in {
        border-right: 1px solid #c2c2c2;
      }
    }
  }
}
</style>
