<template>
  <div class="app-container">
    <el-button type="primary" @click="showPdf(pdf)">vue-pdf</el-button>
    <el-button type="primary" @click="showFile(docx)">vue-office-docx</el-button>
    <el-button type="primary" @click="showFile(excel)">vue-office-xlsx</el-button>
    <el-button type="primary" @click="showFile(pdf)">vue-office-pdf</el-button>
    <ViewPdfDialog ref="viewPdfDialog" />
    <ViewOfficeDialog ref="viewOfficeDialog" />
  </div>
</template>

<script>
import ViewPdfDialog from '@/components/ViewPdfDialog'
import ViewOfficeDialog from '@/components/ViewOfficeDialog'
export default {
  name: 'ViewPdf',
  components: {
    ViewPdfDialog,
    ViewOfficeDialog
  },
  data() {
    return {
      urls: '',
      docx: 'http://static.shanhuxueyuan.com/test6.docx', // 设置文档网络地址，可以是相对地址
      excel: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx', // 设置文档地址
      pdf: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf' // 设置文档地址
    }
  },
  methods: {
    showPdf(url) {
      if (!url) {
        this.$message.warning('文件地址为空')
        return
      }
      this.$refs.viewPdfDialog.toView(url)
    },

    showFile(url) {
      if (!url) {
        this.$message.warning('文件地址为空')
        return
      }
      this.$refs.viewOfficeDialog.toView(url)
    }
  }
}
</script>
