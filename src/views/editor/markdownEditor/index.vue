<template>
  <div class="components-container">
    <div class="editor-container">
      <markdown-editor ref="markdownEditor" v-model="content" @editorLoad="editorLoad" />
    </div>

    <div style="margin-top:80px;display: flex; align-items: center">
      <div>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="getHtml">Get HTML</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-document"
          @click="setMarkdown"
        >Set Markdown</el-button>
      </div>
      <div style="margin-left: 500px;" v-html="html" />
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'

const content = `
**This is test**

* vue
* element
* webpack

`

export default {
  name: 'MarkdownEditorDemo',
  components: { MarkdownEditor },
  data() {
    return {
      editor: null,
      content: content,
      html: ''
    }
  },

  methods: {
    editorLoad(editor) {
      this.editor = editor
    },

    getHtml() {
      this.html = this.editor.getHTML()
    },

    setMarkdown() {
      this.html = this.editor.setMarkdown(this.content)
    }
  }
}
</script>

<style scoped lang="scss">
.components-container {
  padding: 30px;
  .editor-container {
    margin-bottom: 30px;
  }
  .tag-title {
    margin-bottom: 5px;
  }
  /deep/.te-md-splitter {
    width: 100%;
  }
}
</style>
