<template>
  <div
    class="Printable"
    style="margin: 0 auto; max-width: 810px;"
  >
    <div class="flex justify-between">
      <img
        :src="$static('/logo/app-logo-128x128.png')"
        alt="logo"
        style="height: 40px; margin: 5px 0;"
        class="float-left"
      >
      <QIcon
        name="close"
        size="2rem"
        class="cursor-pointer"
        @click="close"
      />
    </div>

    <template v-if="printing.header">
      <component :is="printing.header" />
    </template>
    <template v-else>
      <div>
        <h6>{{ $lang(`domains.${domain}.print.title`) }}</h6>
      </div>
    </template>

    <template v-if="printing.body">
      <component :is="printing.body" />
    </template>
    <template v-else>
      <div class="form form-grid no-break">
        <div
          v-for="(component, key) in components"
          :key="key"
          :class="`field width-${component.$layout.formWidth}`"
        >
          <label>{{ label(key) }}:</label> &nbsp; {{ value(record, key) }}
        </div>
      </div>
      <div
        v-for="(component, key) in arrays"
        :key="key"
        style="margin: 15px 0; border-top: 1px solid #333"
      >
        <label>{{ label(key) }}</label>
        <PrintableArray
          :component="component"
          :items="value(record, key)"
        />
      </div>
    </template>

    <template v-if="printing.footer">
      <component :is="printing.footer" />
    </template>
    <template v-else>
      <div
        class="flex"
        style="justify-content: space-between; margin: 15px 0; border-top: 1px solid #333"
      >
        <small><strong>{{ $lang('app.print.user') }}:</strong> &nbsp; {{ name }}</small>
        <small><strong>{{ $lang('app.print.date') }}:</strong> &nbsp; {{ now }}</small>
      </div>

      <div
        v-if="signatures.length"
        class="flex"
        style="justify-content: space-around; margin-top: 40px;"
      >
        <div
          v-for="(signature, index) in signatures"
          :key="index"
          class="text-center"
        >
          <div>_______________________________________</div>
          <div>{{ signature }}</div>
        </div>
      </div>

      <QIcon
        name="print"
        size="1.8rem"
        class="float-right cursor-pointer"
        @click="print"
      />
    </template>
  </div>
</template>

<script>
import { QIcon } from 'quasar'
import { datetimeFormatter } from '../../../Util/formatter'
import { now } from '../../../Util/date'
import PrintableMixin from './PrintableMixin'
import PrintableArray from './PrintableArray'
import $emporium from '../../../emporium'

export default {
  /**
   */
  name: 'Printable',
  /**
   */
  components: {
    PrintableArray,
    QIcon
  },
  /**
   */
  mixins: [PrintableMixin],
  /**
   */
  computed: {
    /**
     * @returns {*}
     */
    printing () {
      return $emporium.state.printing
    },
    /**
     * @returns {string}
     */
    name () {
      return this.$util.get($emporium.state.printing, 'user')
    },
    /**
     * @returns {string}
     */
    now () {
      return datetimeFormatter(now())
    },
    /**
     * @returns {Object}
     */
    components () {
      const components = this.$util.get($emporium.state.printing, 'components')
      if (!components) {
        return {}
      }
      return Object.keys(components).reduce((accumulator, key) => {
        const hidden = (components[key].$layout.formHidden || components[key].$type === 'array')
        if (hidden && !components[key].attrs.printable) {
          return accumulator
        }
        accumulator[key] = components[key]
        return accumulator
      }, {})
    },
    /**
     * @returns {Object}
     */
    arrays () {
      const components = this.$util.get($emporium.state.printing, 'components')
      if (!components) {
        return {}
      }
      return Object.keys(components).reduce((accumulator, key) => {
        if (components[key].$layout.formHidden || components[key].$type !== 'array') {
          return accumulator
        }
        accumulator[key] = components[key]
        return accumulator
      }, {})
    },
    /**
     * @returns {Object}
     */
    domain () {
      return this.$util.get($emporium.state.printing, 'domain', '')
    },
    /**
     * @returns {Object}
     */
    record () {
      return this.$util.get($emporium, 'state.printing.record', {})
    },
    /**
     * @returns {Array}
     */
    signatures () {
      const signatures = this.$lang(`domains.${this.domain}.print.signatures`)
      if (!Array.isArray(signatures)) {
        return []
      }
      return signatures
    }
  },
  /**
   */
  created () {
    document.body.classList.add('printing')
  },
  /**
   */
  destroyed () {
    document.body.classList.remove('printing')
  },
  /**
   */
  methods: {
    /**
     */
    close () {
      $emporium.commit('updatePrinting', undefined)
    },
    /**
     */
    print () {
      window.print()
    }
  }
}
</script>

<style
  lang="stylus"
  scoped
>
label
  font-weight bold

h6
  line-height normal
  letter-spacing normal
  padding 15px 0
  border-width 1px 0
  border-color #333
  border-style solid
  margin 10px 0

@media print
  .q-icon
    display none
</style>
