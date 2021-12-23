<template>
  <div
    class="AppImageCrop"
    :class="{ 'AppImageCrop--labeled': labeled }"
  >
    <div
      class="AppImageCrop__image"
      :class="{ 'AppImageCrop__image--readonly': readonly }"
      :style="{ 'min-height': `calc(${height}px - 30px)` }"
    >
      <img
        v-if="src"
        :src="src"
        :style="{ width: '100%', 'max-width': `${width}px` }"
        alt="photo"
      >
    </div>

    <div
      v-if="!readonly"
      class="AppImageCrop__actions row"
    >
      <QBtn
        flat
        round
        icon="add_photo_alternate"
        color="default"
        @click="openCropper"
      />
      <QSpace />
      <QBtn
        flat
        round
        icon="highlight_off"
        color="negative"
        @click="$emit('input', null)"
      />
    </div>

    <QDialog
      v-if="!readonly"
      v-model="open"
    >
      <div
        class="AppPhotoCropper"
        :style="{ 'width': 'auto', 'height': 'auto', 'max-width': 'none', 'max-height': 'none' }"
        :class="{ 'AppPhotoCropper--cropping': cropper }"
      >
        <div class="flex q-ml-md q-mr-md q-pa-sm">
          <strong class="flex items-center">Upload de imagem</strong>
          <QSpace />
          <QBtn
            flat
            round
            icon="close"
            @click="open = false"
          />
        </div>

        <div
          class="AppPhotoCropper__info q-ml-md q-mr-md"
          :style="{ 'min-width': `calc(${width}px + 80px)`, 'min-height': `calc(${height}px + 80px)` }"
          :class="{ 'AppPhotoCropper__info--dragging': dragging }"
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
        >
          <main class="text-center text-grey-6">
            <div class="q-pa-sm">
              <QIcon
                name="backup"
                color="grey-6"
                size="3rem"
              />
            </div>
            <h5 class="q-ma-sm text-grey-7">
              Arraste e solte
            </h5>
            <div class="q-pa-sm text-grey-6">
              sua imagem aqui, ou
              <a
                href="javascript: void(0)"
                @click="selectImage"
              >
                clique aqui
              </a>
              <br>
              para selecionar o arquivo no seu dispositivo
            </div>
          </main>
        </div>

        <div
          ref="cropper"
          :style="{ 'min-width': `calc(${width}px + 80px)`, 'min-height': `calc(${height}px + 80px)` }"
          class="AppPhotoCropper__image"
        />

        <div class="AppPhotoCropper__actions flex items-end">
          <input
            v-if="active"
            ref="file"
            type="file"
            accept="image/*"
            style="display:none"
            @change="handleSelectImage"
          >

          <QBtn
            flat
            round
            icon="attach_file"
            color="default"
            @click="selectImage"
          />

          <QSpace />

          <QBtn
            v-if="cropper"
            flat
            round
            icon="check"
            color="default"
            @click="applyCrop"
          />
        </div>
      </div>
    </QDialog>
  </div>
</template>

<script>
import { QBtn, QDialog, QIcon, QSpace } from 'quasar'
import Croppie from 'croppie'
import 'croppie/croppie.css'

export default {
  /**
   */
  name: 'AppImageCrop',
  /**
   */
  components: {
    QBtn,
    QDialog,
    QIcon,
    QSpace
  },
  /**
   */
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: undefined
    },
    previously: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 320
    },
    height: {
      type: [String, Number],
      default: 370
    },
    unknown: {
      type: String,
      default: ''
    },
    blob: {
      type: Boolean,
      default: true
    },
    filename: {
      type: String,
      default: 'cropped.jpg'
    },
    labeled: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  data: () => ({
    src: '',
    open: false,
    active: false,
    cropper: undefined,
    dragging: false
  }),
  /**
   */
  watch: {
    /**
     */
    value: {
      immediate: true,
      handler (value) {
        if (typeof value === 'undefined' || value === null) {
          this.src = undefined
          return
        }

        if (typeof value === 'string') {
          this.src = this.$static(value, true)
          return
        }

        if (typeof value !== 'object') {
          return
        }

        try {
          this.src = URL.createObjectURL(value)
          return
        } catch (e) {
          // silent is gold
        }

        try {
          const reader = new FileReader()
          reader.onload = () => {
            this.src = reader.result
          }
          reader.readAsDataURL(value)
        } catch (e) {
          // silent is gold
        }
      }
    },
    /**
     */
    open (open) {
      if (open) {
        return
      }
      this.cropper = undefined
    }
  },
  /**
   */
  methods: {
    /**
     */
    openCropper () {
      this.open = true
      if (!this.previously) {
        return
      }
      if (this.src) {
        this.startCropper(this.src)
      }
    },
    /**
     * @param {string} url
     */
    startCropper (url) {
      if (this.cropper) {
        this.cropper.destroy()
      }

      const interval = window.setInterval(() => {
        const $element = this.$refs.cropper
        if (!$element) {
          return
        }
        window.clearInterval(interval)
        try {
          const enableExif = true
          const viewport = {
            width: this.width,
            height: this.height,
            type: 'square'
          }
          const options = {
            url,
            enableExif,
            viewport
          }
          this.cropper = new Croppie($element, options)
        } catch (e) {
          // silent is gold
        }
      }, 100)
    },
    /**
     * @param {Event} event
     */
    selectImage (event) {
      this.active = true
      const interval = window.setInterval(() => {
        const input = this.$refs.file
        if (!input) {
          return
        }
        window.clearInterval(interval)
        input.click()
      }, 100)
    },
    /**
     */
    handleSelectImage () {
      const file = this.$refs.file?.files[0]
      this.active = false
      if (!file) {
        return
      }
      const url = URL.createObjectURL(file)
      this.startCropper(url)
    },
    /**
     * @param {Event} event
     */
    async applyCrop (event) {
      if (!this.cropper) {
        return
      }
      this.open = false
      event.preventDefault()
      if (this.blob) {
        const blob = await this.cropper.result({ type: 'blob' })
        const file = new File([blob], this.filename)
        this.$emit('input', file)
        return
      }
      const base64 = await this.cropper.result({ type: 'base64' })
      this.$emit('input', base64)
    },
    /**
     * @param {Event} event
     */
    dragover (event) {
      this.active = true
      event.preventDefault()
      this.dragging = true
    },
    /**
     * @param {Event} event
     */
    dragleave (event) {
      event.preventDefault()
      this.dragging = false
    },
    /**
     * @param {Event} event
     */
    drop (event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.handleSelectImage()
      this.dragging = false
      this.active = false
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppImageCrop {
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  height: calc(100% - 22px);

  &.AppImageCrop--labeled {
    height: calc(100% - 43px);
  }

  > .AppImageCrop__image {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(45deg, #efefef 25%, transparent 25%),
      linear-gradient(-45deg, #efefef 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #efefef 75%),
      linear-gradient(-45deg, transparent 75%, #efefef 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    height: calc(100% - 60px);

    &.AppImageCrop__image--readonly {
      height: 100%;
    }

    > img {
      border-radius: 4px;
      box-shadow: 0 0 5px #565656, 0 2px 2px #7d7d7d, 0 3px 1px -2px #464646;
    }
  }

  > .AppImageCrop__actions {
    padding: 10px;
    border-top: 1px solid #dddddd;
  }
}

.AppPhotoCropper {
  position: relative;
  background: #ffffff;
  width: 60vw;
  min-width: 320px;

  .AppPhotoCropper__info {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #fafafa;
    border: 1px dashed #C2C2C2;
    transition: border,background 0.3s;

    &:hover {
      border: 1px dashed #000000;
    }

    &.AppPhotoCropper__info--dragging {
      border: 1px dashed #7299b7;
      background: #eff8ff;
    }
  }

  .AppPhotoCropper__image {
    display: none;
    height: 500px;
    background: #e2e2e2;

    &.croppie-container .cr-slider-wrap {
      width: 60%;
      margin: 20px auto;
    }
  }

  .AppPhotoCropper__actions {
    padding: 10px;
  }

  &.AppPhotoCropper--cropping {
    .AppPhotoCropper__info {
      display: none
    }

    .AppPhotoCropper__image {
      display: block
    }
  }
}

</style>
