<template>
  <div class="editor-container">
    <div class="editor-box" ref="editor" />
    <div class="desc" >{{currLength}} / {{maxLength}}</div>
  </div>
</template>

<script>
import Editor from 'wangeditor'

export default {
  name: 'Editor',
  props: {
    // 需要隐藏的菜单
    hideMenus: {
      type: Array,
      default: () => []
    },

    // 最大输入文本数
    maxLength: {
      type: Number,
      default: 200
    },

    height: {
      type: Number
    },

    placeholder: {
      type: String
    },

    // 触发 onchange 的时间频率
    onchangeTimeout: {
      type: String
    },

    // 图片服务器地址
    imgServer: {
      type: String,
      default: 'http://127.0.0.1:3000/api/upload-img'
    },

    // 上传图片大小限制
    maxSize: {
      type: Number
    },

    // 显示 base 64 图片
    showBase64: {
      type: Boolean
    },

    // 单次最多上传图片数量
    imgMaxLength: {
      type: Number
    },

    // 图片上传超时时间（毫秒）
    imgTimeout: {
      type: Number
    }
  },

  data() {
    return {
      editor: null,
      maxLengthHtml: '',
      currLength: 0
    }
  },

  mounted() {
    this.initEditor()
  },

  methods: {
    initEditor() {
      this.editor = new Editor(this.$refs.editor)

      this.editor.config.excludeMenus = this.hideMenus
      this.editor.config.zIndex = 5

      this.editor.config.uploadImgServer =
        'http://127.0.0.1:3000/api/upload-img'

      if (this.height) {
        this.editor.config.height = this.height
      }

      if (this.placeholder) {
        this.editor.config.placeholder = this.placeholder
      }

      if (this.showBase64) {
        this.editor.config.uploadImgShowBase64 = this.showBase64
      }

      if (this.maxSize) {
        this.editor.config.uploadImgMaxSize = this.maxSize
      }

      if (this.imgMaxLength) {
        this.editor.config.uploadImgMaxLength = this.imgMaxLength
      }

      if (this.imgTimeout) {
        this.editor.config.uploadImgTimeout = this.imgTimeout
      }

      if (this.onchangeTimeout) {
        this.editor.config.onchangeTimeout = this.onchangeTimeout
      }

      this.editor.config.onchange = (newHtml) => {
        this.changeHtml(newHtml)
      }

      this.editor.create()
    },

    changeHtml(newHtml) {
      // 最大文本输入校验处理
      const textLength = this.getText().length
      this.currLength = textLength
      if (textLength < this.maxLength) {
        this.$emit('changeHtml', newHtml)
      } else if (textLength == this.maxLength) {
        this.maxLengthHtml = this.getHtml()
      } else {
        this.setHtml(this.maxLengthHtml)
        this.$message.error(`最多输入${this.maxLength}字符`)
      }

      // 删除上传的所有图片后，不显示 placeholder
      if (this.getHtml() == '<p></p>') {
        this.clearEditor()
      }
    },

    setHtml(html) {
      this.editor.txt.html(html)
    },

    getHtml() {
      return this.editor.txt.html()
    },

    getText() {
      return this.editor.txt.text()
    },

    clearEditor() {
      this.editor.txt.clear()
    },

    // 禁用
    disable() {
      this.editor.disable()
    },

    // 解除禁用
    enable() {
      this.editor.enable()
    },

    destroy() {
      this.editor.destroy()
      this.editor = null
    }
  }
}
</script>
<style lang="scss" scoped>
.editor-container {
  position: relative;
}
.desc {
  position: absolute;
  right: 30px;
  bottom: 20px;
  color: #5e5e5e;
  z-index: 6;
}
</style>
