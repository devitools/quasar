<!--suppress ES6ModulesDependencies -->
<template>
  <div class="AppBuiltIn">
    <div
      class="AppBuiltInForm__container"
      :class="{ 'AppBuiltInForm__container--active': formActive }"
    >
      <AppBuiltInFormContainer
        ref="form"
        v-if="formActive"
        v-bind="attributes"
        :active.sync="formActive"
        :scope="scope"
        :item.sync="item"
        @actionCancel="actionCancel"
        @actionBack="actionBack"
        @actionApply="actionApply"
        @actionDestroy="actionDestroy"
      />
    </div>

    <div class="AppBuiltInTable__container">
      <AppBuiltInTableContainer
        v-bind="attributes"
        :items="items"
        @actionBuiltInAdd="actionAdd"
        @actionEdit="actionEdit"
        @actionView="actionView"
        @actionDestroy="actionDestroy"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { displayKey, primaryKey } from 'src/settings/schema'

import { SCOPES } from '../../Agnostic/enum'

import Handler from './Mixin/AppBuiltInActionHandler'

import AppBuiltInTableContainer from './Partials/AppBuiltInTableContainer'
import AppBuiltInFormContainer from './Partials/AppBuiltInFormContainer'

import { APP_BUILT_IN_DEFAULT_TABLE_HEIGHT } from './settings'

export default {
  /**
   */
  name: 'AppBuiltIn',
  /**
   */
  mixins: [Handler],
  /**
   */
  components: {
    AppBuiltInFormContainer,
    AppBuiltInTableContainer
  },
  /**
   */
  props: {
    providing: {
      type: Function,
      required: true
    },
    builtIn: {
      type: Boolean,
      default: false
    },
    debuggerAllowed: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => ([])
    },
    disable: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: APP_BUILT_IN_DEFAULT_TABLE_HEIGHT
    },
    size: {
      type: Number,
      default: 10
    },
    defaults: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  data () {
    return {
      scope: SCOPES.SCOPE_ADD,
      path: '',
      domain: '',
      table: {},
      form: {},
      settings: {},
      primaryKey: primaryKey,
      displayKey: displayKey,
      fields: () => ({}),
      groups: () => () => ({}),
      actions: () => ({}),
      hooks: () => ({}),
      watches: () => ({})
    }
  },
  /**
   */
  computed: {
    /**
     * @return {*}
     */
    attributes () {
      return {
        ...this.$attrs,
        ...this.$props,
        debuggerAllowed: false,
        path: this.path,
        domain: this.domain,
        table: this.table,
        form: this.form,
        settings: this.settings,
        primaryKey: this.primaryKey,
        displayKey: this.displayKey,
        fields: this.fields,
        groups: this.groups,
        actions: this.createActions,
        hooks: this.hooks,
        watches: this.watches
      }
    }
  },
  /**
   */
  methods: {
    /**
     * @return {Array}
     */
    createActions () {
      const allowed = [
        'builtinAdd',
        'builtinBack',
        'builtinCancel',
        'builtinApply',
        'builtinView',
        'builtinEdit',
        'builtinDestroy'
      ]
      return this.actions().filter((action) => allowed.includes(action.$key))
    }
  },
  watch: {
    providing: {
      immediate: true,
      handler (providing) {
        const provide = providing()
        this.path = provide['path']
        this.domain = provide['domain']
        this.table = provide['table']
        this.form = provide['form']
        this.settings = provide['settings']
        this.primaryKey = provide['primaryKey']
        this.displayKey = provide['displayKey']
        this.fields = provide['fields']
        this.groups = provide['groups']
        this.actions = provide['actions']
        this.hooks = provide['hooks']
        this.watches = provide['watches']
      }
    }
  }
}
</script>

<style
  scoped
  lang="stylus"
>
.AppBuiltIn
  border-width 1px
  border-style solid
  border-color #ddd
  border-radius 4px
  position relative
  overflow-x hidden
  min-height 300px

  .AppBuiltInTable__container
    position relative
    overflow hidden

  .AppBuiltInForm__container
    position absolute
    top 0
    height 100%
    bottom 0
    left 0
    right 0
    z-index 9000
    overflow auto

    background #fff
    box-shadow 0 0 4px 2px #ddd
    transform translateX(100vw)
    transition transform 0.250s

    &.AppBuiltInForm__container--active
      transform translateX(0)
</style>
