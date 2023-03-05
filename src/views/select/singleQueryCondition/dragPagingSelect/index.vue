<template>
  <div class="paging-select-container">
    <drag-paging-select
      :dragValue="dragValue"
      v-model="selectIds"
      :placeholder="placeholder"
      :loading="loading"
      :multiple="multiple"
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
    </drag-paging-select>
    <div style="margin-top:30px;">
      <p style="color: #b3b3b3">需在源码中修改单、多选，拖拽</p>
      <h4>选中的数据 id 列表</h4>

      <template v-if="multiple && Array.isArray(selectIds)">
        <p>多选 {{dragValue ? '可' : '不可'}} 拖拽数据</p>
        <el-tag v-for="item of selectIds" :key="item" style="margin-right:15px;">{{ item }}</el-tag>
      </template>
      <template v-else>
        <p>单选数据</p>
        <el-tag v-if="selectIds" style="margin-right:15px;">{{ selectIds }}</el-tag>
      </template>
    </div>
  </div>
</template>

<script>
import { getSelectTableList } from '@/api/table'
import DragPagingSelect from '@/components/DragPagingSelect'
export default {
  name: 'DragPagingSelectDemo',
  components: { DragPagingSelect },
  data() {
    return {
      placeholder: '请输入关键字查询',
      loading: false,
      searchKey: '',
      selectIds: [],

      remoteOptions: [],
      page: 1,
      total: 0,

      // 是否多选
      multiple: true,

      // 多选时是否启用拖拽
      dragValue: false
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
