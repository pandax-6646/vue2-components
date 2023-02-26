<template>
  <div class="wangeditor-container">
    <wang-editor @change="editorChange" :readOnly="readOnly" ref="editor" />
    <div>
      <h4>富文本内容：</h4>
      <div style="margin-left: 20px;">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import WangEditor from '@/components/WangEditor'
export default {
  name: 'WangEditorDemo',
  components: {
    WangEditor
  },
  data() {
    return {
      content: '',
      readOnly: false
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