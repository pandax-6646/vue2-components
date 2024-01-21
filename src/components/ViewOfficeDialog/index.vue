<template>
  <el-dialog
    title="预览"
    :visible.sync="innerVisible"
    :before-close="innerCloseHandle"
  >
    <div v-show="fileLoading" class="shadow">
      <i class="el-icon-loading" />
    </div>
    <div v-show="!fileLoading">
      <vue-office-docx v-if="fileType == 'docx'" :src="previewUrl" @rendered="rendered" />
      <vue-office-excel v-else-if="fileType == 'xlsx'" :src="previewUrl" @rendered="rendered" />
      <vue-office-pdf v-else-if="fileType == 'pdf'" :src="previewUrl" @rendered="rendered" />
    </div>
  </el-dialog>
</template>

<script>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import VueOfficePdf from '@vue-office/pdf'

export default {
  name: 'ViewOfficeDialog',
  components: {
    VueOfficeDocx,
    VueOfficeExcel,
    VueOfficePdf
  },
  data() {
    return {
      innerVisible: false,
      fileLoading: false,
      previewUrl: '',
      fileType: ''
    }
  },
  methods: {
    toView(url) {
      this.innerVisible = true
      this.fileLoading = true
      this.fileType = url.split('.').pop()

      this.$nextTick(() => {
        this.previewUrl = url
      })
    },

    // 渲染完成
    rendered() {
      this.fileLoading = false
    },

    innerCloseHandle() {
      this.innerVisible = false
      this.previewUrl = ''
      this.fileLoading = false
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
