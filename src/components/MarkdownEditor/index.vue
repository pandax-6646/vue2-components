<template>
  <div :id="id" />
</template>

<script>
import 'codemirror/lib/codemirror.css' // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import '@toast-ui/editor/dist/i18n/zh-cn.js'

import Editor from '@toast-ui/editor'
import defaultOptions from './default-options'

export default {
  name: 'MarkdownEditor',
  props: {
    id: {
      type: String,
      required: false,
      default() {
        return (
          'markdown-editor-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    mode: {
      type: String,
      default: 'markdown'
    },
    height: {
      type: Number,
      default: 250
    }
  },
  data() {
    return {
      editor: null
    }
  },
  computed: {
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options)
      options.initialEditType = this.mode
      options.placeholder = this.placeholder
      options.height = `${this.height}px`
      return options
    }
  },
  mounted() {
    this.initEditor()
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        ...this.editorOptions,
        events: {
          load: this.editorLoad
        }
      })
    },
    editorLoad(editor) {
      this.$emit('editorLoad', editor)
    },

    destroyEditor() {
      if (!this.editor) return
      this.editor.destroy()
    }
  }
}
</script>
