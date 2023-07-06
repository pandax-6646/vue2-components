<template>
  <el-dialog
    title="预览"
    custom-class="dialog"
    :visible.sync="innerVisible"
    :before-close="innerCloseHandle"
    append-to-body
  >
    <template v-if="fileLoading">
      <div class="shadow">
        <i class="el-icon-loading" />
      </div>
    </template>
    <template v-else>
      <pdf v-for="i in numPages" :key="i" :src="previewUrl" :page="i" style="width: 100%" />
    </template>
  </el-dialog>
</template>

<script>
import Pdf from 'vue-pdf'
export default {
  name: 'ViewPDF',
  components: { Pdf },
  data() {
    return {
      // 预览pdf
      innerVisible: false,
      previewUrl: 'https://ysa.file65.upload.ilabeco.com/group1/M00/02/4C/wKgEQWQ86kiASvUvAAV6wXVYpcE767.pdf',
      numPages: '',
      fileLoading: false
    }
  },
  methods: {
    // 查看附件
    toView(url) {
      this.innerVisible = true
      this.fileLoading = true
      this.previewUrl = Pdf.createLoadingTask(url)
      this.previewUrl.promise.then((pdf) => {
        this.numPages = pdf.numPages
        this.fileLoading = false
      })
    },
    innerCloseHandle() {
      this.innerVisible = false
      this.previewUrl = ''
      this.numPages = ''
    }
  }
}
</script>
<style scoped lang="scss">
  .shadow {
    height: 500px;
    text-align: center;
    line-height: 500px;
    color: #409eff;
    font-size: 40px;
  }
</style>
