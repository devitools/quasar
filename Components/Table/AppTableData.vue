<template>
  <AppTable
    class="AppTableData"
    ref="table"
    :style="{ height }"
    :title="title"
    :data="rows"
    :columns="columnsWithActions"
    :row-key="rowKey"
    :pagination="pagination"
    :hide-bottom="hideBottom"
  >
    <template v-slot:body-cell-actions="props">
      <QTd
        :props="props"
        :style="{ padding: 0 }"
      >
        <QBtn
          v-if="isRemovable(props)"
          icon="delete"
          flat
          dense
          round
          color="grey-8"
          @click="remove(index(props))"
        />
      </QTd>
    </template>
  </AppTable>
</template>

<script>
import { QBtn, QTable, QTd } from 'quasar'
import Dialog from '../Schema/Contracts/Dialog'
import AppTable from './AppTable'

export default {
  /**
   */
  name: 'AppTableData',
  /**
   */
  mixins: [Dialog],
  /**
   */
  components: {
    AppTable,
    QTable,
    QTd,
    QBtn
  },
  /**
   */
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    readonly: {
      type: Boolean,
      default: () => false
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
    },
    removable: {
      type: Function,
      default: () => undefined
    },
    hideBottom: {
      type: Boolean,
      default: () => false
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
      return this.readonly ? this.columns : [
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
    /**
     * @param {number} index
     * @return {Promise<void>}
     */
    async remove (index) {
      const remove = () => {
        const rows = [...this.rows]
        const removed = rows.splice(index, 1)
        this.$emit('remove', removed)
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
    },
    /**
     * @param {Record<string, unknown>} row
     */
    add (row) {
      const rows = [...this.rows]
      rows.push(row)
      this.$emit('input', rows)
    },
    /**
     * @param {Record<string, unknown>} row
     */
    isRemovable ({ row }) {
      if (typeof this.removable !== 'function') {
        return true
      }
      const isRemovable = this.removable(row)
      if (isRemovable === undefined) {
        return true
      }
      return isRemovable
    },
    /**
     * @param {Record<string,unknown>} props
     * @return {number}
     */
    index (props) {
      if (!Array.isArray(this.rows)) {
        return -1
      }
      return this.rows.findIndex((row) => String(props.row[this.rowKey]) === String(row[this.rowKey]))
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

<style>
.has-error > .AppTableData {
  background: rgba(255, 225, 220, 0.7);
}

.AppTableData {
  box-shadow: none;
  border: 1px solid #c2c2c2;
}
</style>
