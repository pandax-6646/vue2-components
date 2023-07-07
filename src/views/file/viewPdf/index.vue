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
      urls: 'https://ysa.file65.upload.ilabeco.com/group1/M00/02/57/wKgEQWSnqVaAD2fnACqbsEYiysU705.pdf'
    }
  },
  methods: {
    showFile() {
      this.$refs.viewPdfDialog.toView(this.urls)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
