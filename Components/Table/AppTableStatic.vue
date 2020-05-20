<template>
  <QTable
    ref="table"
    selection="multiple"
    :style="{ height }"
    :title="title"
    :data="data"
    :columns="columns"
    :row-key="rowKey"
    :selected.sync="selected"
    :pagination="pagination"
  />
</template>

<script>
import { QTable } from 'quasar'

export default {
  /**
   */
  name: 'AppTableStatic',
  /**
   */
  components: {
    QTable
  },
  props: {
    title: {
      type: String,
      default: () => ('')
    },
    rowKey: {
      type: String,
      default: () => ('id')
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    height: {
      type: String,
      default: () => ('')
    },
    rowsPerPage: {
      type: Number,
      default: () => 100
    }
  },
  /**
   * @return {{lastIndex: null, selected: []}}
   */
  data () {
    return {
      selected: [],
      lastIndex: null,
      pagination: {
        page: 1,
        rowsPerPage: this.rowsPerPage
      }
    }
  },
  /**
   */
  watch: {
    selected () {
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style scoped>

</style>
