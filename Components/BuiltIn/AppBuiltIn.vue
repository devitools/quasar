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
import Props from '../Schema/Contracts/Props'
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
  mixins: [Props, Handler],
  /**
   */
  components: {
    AppBuiltInFormContainer,
    AppBuiltInTableContainer
  },
  /**
   */
  props: {
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
      scope: SCOPES.SCOPE_ADD
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
        schema: '',
        debuggerAllowed: false,
        actions: this.createActions
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
