<template>
  <div class="SchemaWizardWizardNavigation">
    <QBtn
      v-if="back"
      :dense="$q.screen.lt.md"
      :round="$q.screen.lt.md"
      :ripple="false"
      outline
      color="primary"
      class="SchemaWizardWizardNavigation__previous"
      @click="previous"
    >
      <QIcon
        v-if="!$q.screen.lt.md"
        left
        class="q-mr-sm"
        name="arrow_back"
      />
      <QIcon
        v-else
        style="font-size: 1.8em"
        name="arrow_back"
      />
      {{ !$q.screen.lt.md ? 'Voltar' : undefined }}
    </QBtn>

    <QBtn
      v-if="finish"
      :dense="$q.screen.lt.md"
      :round="$q.screen.lt.md"
      :ripple="false"
      class="SchemaWizardWizardNavigation__finish"
      text-color="white"
      @click="confirm"
    >
      {{ !$q.screen.lt.md ? 'Confirmar' : undefined }}
      <QIcon
        v-if="!$q.screen.lt.md"
        class="q-ml-sm"
        name="done"
        right
      />
      <QIcon
        v-else
        style="font-size: 1.8em"
        name="done"
      />
    </QBtn>

    <QBtn
      v-else
      :dense="$q.screen.lt.md"
      :round="$q.screen.lt.md"
      :ripple="false"
      color="primary"
      class="SchemaWizardWizardNavigation__next"
      @click="next"
    >
      {{ !$q.screen.lt.md ? 'Próximo' : undefined }}
      <QIcon
        v-if="!$q.screen.lt.md"
        right
        class="q-ml-sm"
        name="arrow_forward"
      />
      <QIcon
        v-else
        style="font-size: 1.8em"
        name="arrow_forward"
      />
    </QBtn>
  </div>
</template>

<script>
import { QBtn, QIcon } from 'quasar'

export default {
  /**
   */
  name: 'SchemaWizardWizardNavigation',
  /**
   */
  components: {
    QBtn,
    QIcon
  },
  /**
   */
  props: {
    back: {
      type: Boolean,
      default: false
    },
    finish: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  methods: {
    /**
     */
    previous () {
      this.$emit('previous')
    },
    /**
     */
    next () {
      this.$emit('next')
    },
    /**
     */
    confirm () {
      this.$emit('finish')
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.SchemaWizardWizardNavigation {
  min-height: 40px

  .SchemaWizardWizardNavigation__previous {
    float: left
    margin-left: 5px
  }

  .SchemaWizardWizardNavigation__next {
    float: right
    margin-right: 5px
  }

  .SchemaWizardWizardNavigation__finish {
    background-color: #35a947
    transition: border .2s ease, background-color .2s ease, color .15s ease
    user-select: none
    float: right

    &:hover {
      background-color: #2d8f3c
    }
  }
}
</style>
