<template>
  <el-dialog title="选择" top="6vh" :visible.sync="dialogVisible" width="50%">
    <table-layout
      hide-breadcrumb
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
        <el-table ref="multipleTable" border row-key="id" :data="tableData">
          <el-table-column>
            <template slot-scope="scope">
              <el-radio
                v-model="selected"
                :label="scope.row.id"
                @change.native="submitHandle(scope.row)"
              >
                <i />
              </el-radio>
            </template>
          </el-table-column>
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

      tempData: null
    }
  },

  computed: {
    selected: {
      get() {
        return (this.selectedRow && this.selectedRow.id) || ''
      },
      set(val) {
        return val
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    show(data) {
      this.tempData = JSON.parse(JSON.stringify(data))
      this.selectedRow = this.tempData.device
      this.dialogVisible = true
      this.searchParams = {}
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

    // 获取选中数据
    submitHandle(row) {
      const data = {
        ...this.tempData,
        device: row
      }

      this.$emit('select', data)
      this.closeHandle()
    },

    // 关闭弹窗
    closeHandle() {
      this.dialogVisible = false
      this.searchParams = {}
    }
  }
}
</script>
