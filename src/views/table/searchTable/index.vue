<template>
  <table-layout
    :pagination-total="pageParams.total"
    :page-size="pageParams.limit"
    :current-page="pageParams.page"
    @screenHandle="searchData"
    @resetHandle="resetData"
    @sizeChange="handleSizeChange"
    @currentChange="handleCurrentChange"
  >
    <template v-slot:screen>
      <search-form ref="searchForm" />
    </template>
    <template v-slot:table>
      <test-table :table-data="tableData" :table-loading="tableLoading" />
    </template>
  </table-layout>
</template>

<script>
import { getList } from '@/api/table'

import TableLayout from '@/components/TableLayout'
import SearchForm from './components/SearchForm'
import TestTable from './components/TestTable'

export default {
  name: 'SearchtTable',
  components: {
    TableLayout,
    SearchForm,
    TestTable
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      searchParams: {},
      pageParams: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      this.tableDataLoading = true
      const { page, limit } = this.pageParams
      const params = {
        page,
        limit,
        parameter: this.searchParams
      }
      getList(params)
        .then((res) => {
          if (Number(res.code) === 200) {
            this.tableData = res.data || []
            this.pageParams = {
              page: res.page,
              limit: res.limit,
              total: res.total
            }
            this.tableDataLoading = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.tableDataLoading = false
        })
    },

    // 查询
    searchData() {
      this.searchParams = this.$refs.searchForm.exposeParams()
      this.getData()
    },

    // 重置
    resetData() {
      this.searchParams = this.$refs.searchForm.resetParams()
      this.getData()
    },

    // 页码
    handleCurrentChange(page) {
      this.pageParams.page = page
      this.getData()
    },

    // 页容量
    handleSizeChange(limit) {
      this.pageParams.limit = limit
      this.getData()
    }
  }
}
</script>
