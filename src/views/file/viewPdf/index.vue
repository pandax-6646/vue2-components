<template>
  <div class="app-container">
    <el-button type="primary" @click="showFile(urls)">通过 vue 插件的方式</el-button>
  </div>
</template>

<script>
export default {
  name: 'ViewPdf',
  data() {
    return {
      urls: 'http://127.0.0.1:3000/upload-files/1.pdf'
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
