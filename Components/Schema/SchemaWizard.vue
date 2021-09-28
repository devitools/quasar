<template>
  <QStepper
    v-model="current"
    :vertical="$q.screen.lt.md"
    class="SchemaWizard"
    alternative-labels
    flat
    bordered
    keep-alive
  >
    <QStep
      v-for="(step, index) in steps"
      :key="index"
      :name="index"
      :title="step.title"
      :icon="step.icon"
      :active-icon="step.icon"
      done-color="positive"
      :done="current >= (index + 1)"
    >
      <AppForm
        :ref="`step-${index}`"
        v-bind="step.provide"
        v-model="data[step.id]"
        :builtin="true"
        :debugger-allowed="false"
        :scope="scope"
        :data="data"
      />

      <QStepperNavigation>
        <SchemaWizardWizardNavigation
          :back="index > 0"
          :finish="index === steps.length - 1"
          @previous="previousStep()"
          @next="nextStep()"
          @finish="finishStep()"
        />
      </QStepperNavigation>
    </QStep>
  </QStepper>
</template>

<script>
import { QStep, QStepper, QStepperNavigation } from 'quasar'
import AppForm from '@devitools/Components/Form/AppForm'
import SchemaWizardWizardNavigation from './Wizard/SchemaWizardWizardNavigation'

export default {
  /**
   */
  name: 'SchemaWizard',
  /**
   */
  props: {
    domain: {
      type: String,
      default: ''
    },
    schemata: {
      type: Array,
      default: () => []
    },
    finish: {
      type: Function,
      default: () => undefined
    },
    schema: {
      type: String,
      default: ''
    },
    scope: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    }
  },
  /**
   */
  components: { AppForm, SchemaWizardWizardNavigation, QStep, QStepper, QStepperNavigation },
  /**
   */
  data: () => ({
    current: 0,
    steps: [],
    data: {}
  }),
  /**
   */
  methods: {
    /**
     */
    previousStep () {
      let ref = this.$refs[`step-${this.current}`]
      if (Array.isArray(ref)) {
        ref = ref[0]
      }

      const step = this.steps[this.current]
      if (typeof step.previous === 'function') {
        step.previous.call(ref)
      }

      if (this.current <= 0) {
        this.current = 0
        return
      }
      this.current--
    },
    /**
     */
    nextStep () {
      let ref = this.$refs[`step-${this.current}`]
      if (Array.isArray(ref)) {
        ref = ref[0]
      }
      try {
        ref.$v.$touch()
        if (ref.$v.$error || ref.hasErrors()) {
          return
        }
      } catch (e) {
        // silence is gold
      }

      const step = this.steps[this.current]
      if (typeof step.next === 'function') {
        step.next.call(ref)
      }

      const max = this.steps.length - 1
      if (this.current >= max) {
        this.current = max
        return
      }

      this.current++
    },
    /**
     */
    async finishStep () {
      try {
        const payload = Object.values(this.data).reduce((payload, datum) => Object.assign(payload, datum))
        await this.finish.call(this, payload)
      } catch (e) {
        // silence is gold
      }
    }
  },
  /**
   */
  watch: {
    /**
     */
    schemata: {
      immediate: true,
      handler (schemata) {
        const steps = []
        for (const schema of schemata) {
          const id = schema.id
          const icon = schema.icon || id
          const next = schema.next
          const previous = schema.previous
          const title = this.$t(`domains.${this.domain}.steps.${id}`)
          const provide = schema.provider.providing()
          const step = {
            id,
            title,
            icon,
            previous,
            next,
            provide
          }
          steps.push(step)

          this.data[id] = {}
        }
        this.steps = steps
      }
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.SchemaWizard {
  background: #fff
  border-radius: 4px
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12) !important
}

@media (max-width: 768px) {
  .SchemaWizard.q-stepper--vertical {
    padding: 0;

    .q-stepper__step-inner {
      padding: 0 4px 12px 22px;
    }

    .q-stepper__tab {
      padding: 12px 4px;
    }

    .q-stepper__nav {
      padding: 0 10px 10px 10px;
    }
  }
}
</style>
