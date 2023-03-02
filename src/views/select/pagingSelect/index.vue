<template>
  <div class="paging-select-container">
    <el-select v-model="select" v-load-more="loadMore" multiple filterable remote reserve-keyword placeholder="请输入搜索关键词"
      :remote-method="remoteMethod" :loading="loading" clearable>
      <el-option v-for="item in remoteOptions" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>

    <h4>选中的数据 id 列表</h4>
    <p>{{ selectIds }}</p>
  </div>
</template>

<script>
import { getSelectTableList } from '@/api/table'
export default {
  name: 'PagingSelect',
  data() {
    return {
      page: 1,
      total: 0,
      loading: false,
      selectIds: null,
      remoteOptions: []
    }
  },
  methods: {
    remoteMethod(value) {
      this.loading = true
      this.searchKey = value
      const params = {
        page: this.page,
        limit: 10,
        parameter: { name: this.searchKey }
      }
      getSelectTableList(params)
        .then((res) => {
          if (Number(res.code) == 200) {
            this.loading = false
            this.remoteOptions = this.remoteOptions.concat(res.data || [])
            this.total = res.total || 0
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    loadMore() {
      if (this.total > this.remoteOptions.length) {
        this.page++
        this.remoteMethod(this.searchKey)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.paging-select-container {
  padding: 30px;
}
</style>
