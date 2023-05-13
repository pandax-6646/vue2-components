<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="使用依赖" name="directly">
        <el-input
          v-model="inputData"
          placeholder="请输入需要复制的文本"
          style="width:400px;max-width:100%;"
        />
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">复制</el-button>
      </el-tab-pane>
      <el-tab-pane label="使用自定义命令" name="v-directive">
        <el-input
          v-model="inputData"
          placeholder="请输入需要复制的文本"
          style="width:400px;max-width:100%;"
        />
        <el-button
          v-clipboard:copy="inputData"
          v-clipboard:success="clipboardSuccess"
          type="primary"
          icon="el-icon-document"
        >复制</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clip from '@/utils/clipboard'

export default {
  name: 'Clipboard',
  data() {
    return {
      activeName: 'directly',
      inputData: 'https://github.com/PanJiaChen/vue-element-admin'
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>
