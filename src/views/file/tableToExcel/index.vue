<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="130px" label-position="left">
          <el-col :span="12">
            <el-form-item label="表头类型">
              <el-radio-group v-model="form.headerType">
                <el-radio label="0">单级表头</el-radio>
                <el-radio label="1">多级表头</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="文件名称">
              <el-input
                v-model="form.filename"
                placeholder="请输入导出文件的名称，默认excel-list"
                style="width: 300px;"
              />
            </el-form-item>
            <el-form-item label="文件格式">
              <el-select v-model="form.bookType" placeholder="请选择导出文件格式">
                <el-option v-for="item in options" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="单元格宽度自适应" v-if="form.bookType == 'xlsx'">
              <el-radio-group v-model="form.autoWidth">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button
              :loading="downloadLoading"
              style="margin-bottom:20px"
              type="primary"
              icon="el-icon-document"
              @click="handleDownload"
            >导出</el-button>
          </el-col>
        </el-form>
      </el-col>
      <el-col :span="24" v-show="form.headerType == 0">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column label="编号" prop="id" align="center" width="95" />
          <el-table-column label="名字" prop="name" align="center" />
          <el-table-column label="地址" prop="address" align="center" />
          <el-table-column label="时间" prop="date" align="center" />
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" v-show="form.headerType == 1">
        <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" border>
          <el-table-column label="编号" prop="id" align="center" width="95" />
          <el-table-column label="主要信息" align="center">
            <el-table-column label="名字" prop="name" align="center" />
            <el-table-column label="地址" prop="address" align="center" />
          </el-table-column>
          <el-table-column label="时间" prop="date" align="center" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSelectTableList } from '@/api/table'
export default {
  name: 'TableToExcel',
  data() {
    return {
      tableData: null,
      tableLoading: true,
      form: { headerType: '0', bookType: 'xlsx', autoWidth: true },
      options: ['xlsx', 'csv', 'txt'],
      downloadLoading: false,
      multipleSelection: [] // 选中的数据
    }
  },
  watch: {
    'form.bookType': {
      handler(val) {
        if (val != 'xlsx') {
          delete this.form.autoWidth
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 请求数据
    fetchData() {
      this.tableLoading = true
      const params = {
        page: 1,
        limit: 10,
        parameter: {}
      }
      getSelectTableList(params).then((res) => {
        this.tableData = res.data
        this.tableLoading = false
      })
    },
    handleSelectionChange(rows) {
      this.multipleSelection = rows
    },
    handleDownload() {
      if (!this.multipleSelection.length && !this.tableData.length) {
        this.$message.error('没有可导出的数据')
        return
      }
      this.downloadLoading = true

      const filterVal = ['id', 'name', 'address', 'date']
      const list = this.multipleSelection.length
        ? this.multipleSelection
        : this.tableData
      const data = this.formatJson(filterVal, list)

      let params = {}
      // 单级表头
      if (this.form.headerType == 0) {
        params = {
          header: ['编号', '名字', '地址', '时间'],
          filename: this.form.filename,
          autoWidth: this.form.autoWidth,
          bookType: this.form.bookType,
          data
        }
      // 多级表头
      } else if (this.form.headerType == 1) {
        params = {
          multiHeader: [['编号', '主要信息', '', '时间']],
          merges: ['A1:A2', 'B1:C1', 'D1:D2'],
          header: ['', '名字', '地址', ''],
          filename: this.form.filename,
          autoWidth: this.form.autoWidth,
          bookType: this.form.bookType,
          data
        }
      }

      if (this.form.bookType != 'xlsx') {
        delete params.autoWidth
      }

      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel(params)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    }
  }
}
</script>

<style scoped lang="scss">
</style>
