<template>
  <el-table v-loading="tableLoading" :data="tableData" border>
    <el-table-column
      v-for="item in columns"
      :key="item.id"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      row-key="id"
      align="center"
      show-overflow-tooltip
    />
  </el-table>
</template>
<script>
export default {
  name: 'TestTable',
  props: {
    tableLoading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        {
          label: '标题',
          prop: 'title',
          width: 'auto'
        },
        {
          label: '作者',
          prop: 'author',
          width: 'auto'
        },
        {
          label: '操作时间',
          prop: 'display_time',
          width: 'auto'
        },
        {
          label: '浏览量',
          prop: 'pageviews',
          width: 'auto'
        }
      ]
    }
  }
}
</script>

