<template>
  <div class="app-container">
    <el-button type="primary" @click="showFile">通过 vue 插件的方式</el-button>
    <view-pdf-dialog ref="viewPdfDialog" />
  </div>
</template>

<script>
import ViewPdfDialog from '@/components/ViewPdfDialog'
export default {
  name: 'ViewPdf',
  components: {
    ViewPdfDialog
  },
  data() {
    return {
      urls: ''
    }
  },
  methods: {
    showFile() {
      if (!this.urls) {
        this.$message.warning('无效的文件地址')
        return
      }
      this.$refs.viewPdfDialog.toView()
    }
  }
}
</script>
