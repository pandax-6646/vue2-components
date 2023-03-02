<template>
  <div class="paging-select-container">
    <paging-select
      v-model="selectIds"
      :placeholder="placeholder"
      :loading="loading"
      @loadMore="loadMore"
      @remoteMethod="remoteMethod"
      style="width: 500px"
    >
      <el-option
        v-for="item in remoteOptions"
        :key="item.id"
        :label="`${item.name}-${item.id}`"
        :value="item.id"
      />
    </paging-select>
    <h4>选中的数据 id 列表</h4>
    <p>{{ selectIds.join(', ') }}</p>
  </div>
</template>

<script>
import { getSelectTableList } from '@/api/table'
import PagingSelect from '@/components/PagingSelect'
export default {
  name: 'PagingSelectDemo',
  components: { PagingSelect },
  data() {
    return {
      placeholder: '请输入关键字查询',
      loading: false,
      searchKey: '',
      selectIds: [],

      remoteOptions: [],
      page: 1,
      total: 0
    }
  },
  methods: {
    // 加载远程数据
    remoteMethod(value) {
      if (!value) {
        this.remoteOptions = []
        this.searchKey = ''
        return
      }

      this.searchKey = value
      this.loading = true

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

    // 加载更多
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
