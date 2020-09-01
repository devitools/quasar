<template>
  <div
    class="AppUploader AppFile"
    ref="container"
  >
    <div class="actions">
      <input
        type="file"
        ref="file"
        accept="image/*"
        style="display:none"
        @change="handleFiles"
      >

      <QBtn
        :disabled="locked"
        @click="onClick"
        color="primary"
        icon="attach_file"
        round
        flat
      />

      <QBtn
        :disabled="locked"
        color="negative"
        icon="delete"
        @click="$emit('input', undefined)"
        round
        flat
      />

      <div class="content">
        {{ content }}
      </div>
    </div>

    <div class="progress-bar">
      <div
        class="progress"
        ref="progress"
      />
    </div>
  </div>
</template>

<script>
import File from './Uploader'
import { QBtn } from 'quasar'

export default {
  /**
   */
  name: 'AppAwsFile',
  /**
   */
  mixins: [File],
  /**
   */
  components: {
    QBtn
  },
  /**
   */
  props: {
    bucketRegion: {
      type: String,
      required: true
    },
    bucketName: {
      type: String,
      required: true
    },
    identityPoolId: {
      type: String,
      required: true
    },
    filename: {
      type: Function,
      default: undefined
    }
  },
  /**
   */
  computed: {
    /**
     * @return {string}
     */
    content () {
      return String(this.value).split('/').pop()
    }
  },
  /**
   */
  methods: {
    /**
     */
    startAgent () {
      window.AWS.config.update({
        region: this.bucketRegion,
        credentials: new window.AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.identityPoolId
        })
      })
    },
    /**
     * @param {File} file
     */
    startFileUpload (file) {
      let filename = file.name
      if (typeof this.filename === 'function') {
        filename = this.filename(file)
      }

      this.agent = new window.AWS.S3.ManagedUpload({
        params: {
          Bucket: this.bucketName,
          Key: filename,
          Body: file,
          // https://docs.aws.amazon.com/pt_br/AmazonS3/latest/dev/acl-overview.html#canned-acl
          ACL: 'bucket-owner-full-control'
        }
      })
      const promise = this.agent.promise()

      promise.then(this.handleResponse)
    },
    /**
     * @param {Object} response
     */
    finishFileUpload (response) {
      const { Location: value } = response
      return value
    }
  }
}
</script>

<style lang="stylus">
.AppFile {
  > .actions {
    display flex
    justify-content flex-start
    align-items center
    flex-wrap nowrap

    > .content {
      border 1px solid #dddddd
      border-radius 4px
      padding 7px 10px 0 10px
      flex 1
      color #737373
      font-size 0.8rem
      height 35px
    }
  }
}
</style>
