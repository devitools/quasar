<template>
  <AppTable
    class="AppTableStatic"
    ref="table"
    :selection="selection"
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
import AppTable from './AppTable'

export default {
  /**
   */
  name: 'AppTableStatic',
  /**
   */
  components: {
    AppTable
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
    },
    selection: {
      type: String,
      default: () => ('multiple')
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
.AppTableStatic {
  box-shadow: none;
  border: 1px solid #c2c2c2;
}
</style>
