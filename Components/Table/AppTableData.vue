<template>
  <QTable
    class="AppTableData"
    ref="table"
    :style="{ height }"
    :title="title"
    :data="rows"
    :columns="columnsWithActions"
    :row-key="rowKey"
    :pagination="pagination"
  >
    <template v-slot:body-cell-actions="props">
      <QTd
        :props="props"
        :style="{ padding: 0 }"
      >
        <QBtn
          icon="delete"
          flat
          dense
          round
          color="grey-8"
          @click="remove(props.rowIndex)"
        />
      </QTd>
    </template>
  </QTable>
</template>

<script>
import { QTable, QTd, QBtn } from 'quasar'
import Dialog from '@devitools/Components/Schema/Contracts/Dialog'

export default {
  /**
   */
  name: 'AppTableData',
  /**
   */
  mixins: [Dialog],
  /**
   */
  components: { QTable, QTd, QBtn },
  /**
   */
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
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
    height: {
      type: String,
      default: () => ('')
    },
    rowsPerPage: {
      type: Number,
      default: () => 100
    },
    confirm: {
      type: String,
      default: () => undefined
    }
  },
  /**
   */
  data () {
    return {
      rows: [],
      lastIndex: null,
      pagination: {
        page: 1,
        rowsPerPage: this.rowsPerPage
      }
    }
  },
  /**
   */
  computed: {
    columnsWithActions () {
      return [
        ...this.columns,
        {
          name: 'actions',
          style: 'width: 50px',
          align: 'center'
        }
      ]
    }
  },
  /**
   */
  methods: {
    async remove (index) {
      const remove = () => {
        const rows = [...this.rows]
        rows.splice(index, 1)
        this.$emit('input', rows)
      }

      if (!this.confirm) {
        remove()
        return
      }

      try {
        const confirm = await this.$confirm(this.confirm)
        if (confirm) {
          remove()
        }
      } catch (e) {
        // silent is gold
      }
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (!Array.isArray(value)) {
          return
        }
        this.rows = value
      }
    }
  }
}
</script>

<style scoped>
.AppTableData {
  box-shadow: none;
  border: 1px solid #c2c2c2;
}
</style>
