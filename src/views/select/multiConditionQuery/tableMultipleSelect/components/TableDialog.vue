<template>
  <el-dialog title="选择" top="6vh" :visible.sync="dialogVisible" width="50%">
    <table-layout
      hideBreadcrumb
      :pagination-total="pageParams.total"
      :page-size="pageParams.limit"
      :current-page="pageParams.page"
      @screenHandle="getData"
      @resetHandle="resetData"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    >
      <template v-slot:screen>
        <el-form size="small" label-width="50px">
          <el-row :gutter="24">
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="姓名:">
                <el-input v-model="searchParams.name" placeholder="请输入姓名" clearable />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="地址:">
                <el-input v-model="searchParams.address" clearable placeholder="请输入地址" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template v-slot:table>
        <el-table border row-key="id" ref="multipleTable" :data="tableData" @select="handleSelect">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="date" label="日期">
            <template slot-scope="{row}">
              <div>{{ row.date }} = {{ row.id }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="address" label="地址" show-overflow-tooltip />
        </el-table>
      </template>
    </table-layout>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeHandle">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSelectTableList } from '@/api/table'

import TableLayout from '@/components/TableLayout'

export default {
  name: 'TableDialog',
  components: {
    TableLayout
  },
  props: {
    maxAllowedNumber: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      dialogVisible: false,

      // table表格
      tableDataLoading: false,
      tableData: [],
      searchParams: {},
      pageParams: {
        page: 1,
        limit: 5,
        total: 0
      },

      // 选中的数据
      selectedRows: []
    }
  },
  watch: {
    tableData: {
      handler(newV) {
        this.$nextTick(() => {
          const selectedIds = this.selectedRows.map((item) => item.id)
          newV.forEach((item) => {
            if (selectedIds.includes(item.id)) {
              this.$refs.multipleTable.toggleRowSelection(item, true)
            }
          })
        })
      },
      deep: true
    }
  },
  methods: {
    show(data) {
      this.dialogVisible = true
      this.pageParams.page = 1
      this.searchParams = {}
      this.getData()
      this.selectedRows = this.maxAllowedNumber > data.length ? data : []
    },

    // 获取列表
    getData() {
      this.tableDataLoading = true
      const { page, limit } = this.pageParams
      const params = {
        page,
        limit,
        parameter: this.searchParams
      }
      getSelectTableList(params)
        .then((res) => {
          if (Number(res.code) == 200) {
            this.tableDataLoading = false
            this.tableData = res.data || []
            this.pageParams = {
              page: res.page,
              limit: res.limit,
              total: res.total
            }
          }
        })
        .catch((err) => {
          console.log(err)
          this.tableDataLoading = false
        })
    },

    // 分页
    handleSizeChange(val) {
      this.pageParams.limit = val
      this.getData()
    },

    // 当前页码
    handleCurrentChange(val) {
      this.pageParams.page = val
      this.getData()
    },

    // 重置
    resetData() {
      this.searchParams = {}
      this.pageParams = {
        page: 1,
        limit: 5
      }
      this.getData()
    },
    // 单选数据
    handleSelect(rows, row) {
      if (this.selectedRows.length == this.maxAllowedNumber) {
        if (this.selectedRows.find((item) => item.id === row.id)) {
          this.selectedRows = this.selectedRows.filter(
            (item) => item.id !== row.id
          )
        } else {
          this.$message.error(`最多选择 ${this.maxAllowedNumber} 个`)
          this.$refs.multipleTable.toggleRowSelection(row, false)
        }
      } else if (this.selectedRows.length < this.maxAllowedNumber && row) {
        if (this.selectedRows.find((item) => item.id === row.id)) {
          this.selectedRows = this.selectedRows.filter(
            (item) => item.id !== row.id
          )
        } else {
          this.selectedRows.push(row)
        }
      } else if (
        this.selectedRows.length > this.maxAllowedNumber ||
        rows.length > this.maxAllowedNumber
      ) {
        this.$message.error(`最多选择 ${this.maxAllowedNumber} 个`)
        this.$refs.multipleTable.toggleRowSelection(row, false)
      }
    },

    // 提交数据
    submitHandle() {
      this.$emit('select', this.selectedRows)
      this.closeHandle()
    },

    // 关闭弹窗
    closeHandle() {
      this.dialogVisible = false
      this.selectedRows = []
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.el-table__header-wrapper .el-checkbox {
  display: none;
}
/deep/.el-dialog__body {
  padding: 0 20px;
}
</style>
