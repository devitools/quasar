<template>
  <QStepper
    v-model="stage"
    :vertical="$q.screen.lt.md"
    class="SchemaWizard"
    alternative-labels
    flat
    bordered
    keep-alive
  >
    <QStep
      v-for="(step, index) in steps"
      :key="step.id"
      :name="step.id"
      :title="step.title"
      :icon="step.icon"
      :active-icon="step.icon"
      done-color="positive"
      :done="stage >= (index + 1)"
    >
      <AppForm
        :ref="step.id"
        v-bind="step.provide"
        :value="data[step.id]"
        @input="updateData(step.id, $event)"
        :builtin="true"
        :debugger-allowed="false"
        :scope="scope"
        :data="data"
        @hide="setHidden($event)"
        @show="setShown($event)"
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
import AppForm from '../Form/AppForm'
import SchemaForm from './SchemaForm'
import SchemaWizardWizardNavigation from './Wizard/SchemaWizardWizardNavigation'

export default {
  /**
   */
  name: 'SchemaWizard',
  /**
   */
  extends: SchemaForm,
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
    stage: '',
    stages: [],
    data: {},
    hidden: {}
  }),
  /**
   */
  computed: {
    steps () {
      return this.stages.filter((step) => !this.hidden[step.id])
    }
  },
  /**
   */
  methods: {
    /**
     * @return {Vue | Element | Vue[] | Element[]}
     */
    getRef () {
      const step = this.steps[this.current]
      const id = step.id
      let ref = this.$refs[id]
      if (Array.isArray(ref)) {
        ref = ref[0]
      }
      return ref
    },
    /**
     */
    previousStep () {
      const ref = this.getRef()
      if (!ref) {
        return
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
      const ref = this.getRef()
      if (!ref) {
        return
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
        await this.finish.call(this, this.data)
      } catch (e) {
        // silence is gold
      }
    },
    /**
     * @param {string} id
     */
    setHidden (id) {
      this.$set(this.hidden, id, true)
    },
    /**
     * @param {string} id
     */
    setShown (id) {
      this.$set(this.hidden, id, false)
    },
    /**
     * @param {string} id
     * @param {Record<string,unknown>} data
     */
    updateData (id, data) {
      this.$set(this.data, id, data)
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
        const stages = []
        for (const schema of schemata) {
          const id = schema.id
          const icon = schema.icon || id
          const next = schema.next
          const previous = schema.previous
          const title = this.$t(`domains.${this.domain}.steps.${id}`)
          const provide = schema.provider.providing()
          const stage = {
            id,
            title,
            icon,
            previous,
            next,
            provide
          }
          stages.push(stage)

          this.updateData(id, {})
        }
        this.stages = stages
      }
    },
    stages: {
      immediate: true,
      handler (stages) {
        if (this.stage) {
          return
        }
        if (stages.length <= 0) {
          return
        }
        this.current = 0
      }
    },
    current: {
      immediate: true,
      handler (current) {
        const stage = this.steps[current]
        if (!stage) {
          return
        }
        this.stage = stage.id
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
