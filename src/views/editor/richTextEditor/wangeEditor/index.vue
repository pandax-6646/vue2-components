<template>
  <div class="wangeditor-container">
    <wang-editor @changeHtml="editorChange" ref="wangeditor" />
    <div>
      <h4>富文本内容：</h4>
      <div style="margin-left: 20px;">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import WangEditor from '@/components/WangEditor/index'
export default {
  name: 'WangEditorDemo',
  components: {
    WangEditor
  },
  data() {
    return {
      content: ''
    }
  },

  methods: {
    editorChange(content) {
      this.content = content
    }
  }
}
</script>
<style lang="scss" scoped>
.wangeditor-container {
  padding: 30px;
}
</style>