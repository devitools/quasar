<template>
  <div
    class="AppPhotoManager"
    :class="{ 'AppPhotoManager--labeled': labeled }"
  >
    <div
      class="AppPhotoManager__image"
      :class="{ 'AppPhotoManager__image--readonly': readonly }"
      :style="{ height }"
    >
      <img
        v-if="src"
        :src="src"
        :alt="this.$lang('agnostic.components.photo.alt')"
      >
    </div>

    <div
      v-if="!readonly"
      class="AppPhotoManager__actions"
    >
      <QBtn
        flat
        round
        icon="add_photo_alternate"
        @click="openCropper"
      >
        <AppTooltip
          anchor="bottom middle"
          :offset="[10, 10]"
        >
          {{ $lang('agnostic.components.photo.actions.openCropper') }}
        </AppTooltip>
      </QBtn>
    </div>

    <QDialog
      v-if="!readonly"
      v-model="open"
    >
      <div
        class="AppPhotoCropper"
        :class="{ 'AppPhotoCropper--cropping': cropper }"
      >
        <div class="flex q-ml-md q-mr-md q-pa-sm">
          <strong class="flex items-center">{{ title }}</strong>
          <QSpace />
          <QBtn
            flat
            round
            icon="close"
            @click="open = false"
          >
            <AppTooltip
              anchor="bottom middle"
              :offset="[10, 10]"
            >
              {{ $lang('agnostic.components.photo.actions.close') }}
            </AppTooltip>
          </QBtn>
        </div>

        <div
          class="AppPhotoCropper__info q-ml-md q-mr-md"
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
              {{ this.$lang('agnostic.components.photo.dragAndDrop.action') }}
            </h5>
            <div class="q-pa-sm text-grey-6">
              {{ this.$lang('agnostic.components.photo.dragAndDrop.body1') }}
              <a
                href="javascript: void(0)"
                @click="selectImage"
              >
                {{ this.$lang('agnostic.components.photo.dragAndDrop.clickHere') }}
              </a>
              <br>
              {{ this.$lang('agnostic.components.photo.dragAndDrop.body2') }}
            </div>
          </main>
        </div>

        <div
          ref="cropper"
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
          >
            <AppTooltip
              anchor="bottom middle"
              :offset="[10, 10]"
            >
              {{ $lang('agnostic.components.photo.actions.selectPhoto') }}
            </AppTooltip>
          </QBtn>

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
  name: 'AppPhotoManager',
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
      default: 300
    },
    height: {
      type: [String, Number],
      default: 400
    },
    unknown: {
      type: String,
      default: 'no-photo.jpg'
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
  computed: {
    title () {
      if (this.cropper) {
        return this.$lang('agnostic.components.photo.cropping')
      }
      return this.$lang('agnostic.components.photo.submit')
    }
  },
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
          const url = process.env.VUE_APP_STATIC_URL
          const photo = value || this.unknown
          const ttl = new Date().getTime().toString(32)
          this.src = `${url}/foto/${photo}?ttl=${ttl}`
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
      const blob = await this.cropper.result({ type: 'blob' })
      const file = new File([blob], 'cropped')
      this.$emit('input', file)
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
.AppPhotoManager {
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  height: calc(100% - 22px);

  &.AppPhotoManager--labeled {
    height: calc(100% - 43px);
  }

  > .AppPhotoManager__image {
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

    &.AppPhotoManager__image--readonly {
      height: 100%;
    }

    > img {
      width: 150px;
      height: 200px;
      border-radius: 4px;
      box-shadow: 0 0 5px #565656, 0 2px 2px #7d7d7d, 0 3px 1px -2px #464646;
    }
  }

  > .AppPhotoManager__actions {
    padding: 8px;
    border-top: 2px dashed #dddddd;
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
