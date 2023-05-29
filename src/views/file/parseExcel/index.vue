<template>
  <div class="app-container">
    <upload-excel-component
      :accept="accept"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :is-excel="isExcel"
    />
    <el-table
      v-if="tableData.length"
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%;margin-top:20px;"
    >
      <el-table-column
        v-for="(item, index) of tableHeader"
        :key="index"
        show-overflow-tooltip
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'ParseExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      accept: '.xlsx', // 仅支持 xlsx、xls、csv 格式的文件
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    // 点击上传限制的文件
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.warning('请上传 1M 以内的文件')
      }
      return isLt1M
    },

    // 拖拽上传限制文件
    isExcel(file) {
      return /\.(xlsx)$/.test(file.name)
    },

    // 文件解析成功回调
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
