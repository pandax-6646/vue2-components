<template>
  <table-layout
    class="app-container"
    show-collapse
    :is-fold="false"
    hide-pagination
    @screenHandle="searchData"
    @resetHandle="resetData"
  >
    <template v-slot:other-card>
      <div class="pageTitle">操作日志</div>
    </template>
    <template v-slot:screen="{ isOpen }">
      <search-form ref="searchForm" :is-open="isOpen" />
    </template>
    <template v-slot:table>
      <table :tableData="tableData" :tableLoading="tableLoading" />
    </template>
  </table-layout>
</template>

<script>
import { getList } from '@/api/table'

import TableLayout from '@/components/TableLayout'
import SearchForm from './components/SearchForm'
import Table from './components/Table'

export default {
  name: 'SearchtTable',
  components: {
    TableLayout,
    SearchForm,
    Table
  },
  data() {
    return {
      isOpen: false,
      tableLoading: false,
      tableData: null,
      params: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.tableDataLoading = true
      getList().then((res) => {
        console.log(res);
        if (Number(res.code) === 200) {
          this.tableData = res.data || []
          this.params = {
            page: res.page,
            limit: res.limit,
            total: res.total
          }
          this.tableDataLoading = false
        }
      }).catch((err) => {
        console.log(err);
        this.tableDataLoading = false
      })
    },

    // 查询
    searchData() {
      this.params = this.$refs.searchForm.exposeParams()
      this.currentPage = 1
      this.fetchData()
    },

    // 重置
    resetData() {
      this.params = this.$refs.searchForm.resetParams()
      this.currentPage = 1
      this.fetchData()
    },

    // 页码
    handleCurrentChange(page) {
      this.currentPage = page
      this.pagingLoading()
    },

    // 页容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.pagingLoading()
    }
  }
}
</script>
