<template>
  <AppArray
    class="AppArrayLazy"
    :domain="domain"
    :fields="fields"
    :value="value"
    :primary-key="primaryKey"
    :optimize="optimize"
    :use-uuid="useUuid"
    :hooks="hooks"
    :readonly="readonly"
    :static="static"
    :debugger-allowed="debuggerAllowed"
    :inherit-errors="inheritErrors"
  >
    <template v-for="(record, index) in records">
      <AppArrayRow
        :key="record.__uuid"
        :ref="`body-${index}`"
        :fields="fields"
        :value="record"
        :domain="domain"
        :primary-key="primaryKey"
        :hooks="hooks"
        :readonly="readonly"
        :static="static"
        :editable="editable[record.__uuid]"
        @edit="setEditable(record.__uuid, $event)"
        @input="updateItem(index, $event)"
        @cancel="cancelItem(index)"
        @remove="removeItem(index)"
      />
    </template>
  </AppArray>
</template>

<script type="text/javascript">
import AppArray from './AppArray'
import AppArrayRow from './Partials/AppArrayRow'
import { AppArrayBasic, AppArrayProps, AppArrayLazy } from './Mixins'

export default {
  /**
   */
  name: 'AppArrayLazy',
  /**
   */
  mixins: [AppArrayBasic, AppArrayProps, AppArrayLazy],
  /**
   */
  components: { AppArray, AppArrayRow }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
</style>
