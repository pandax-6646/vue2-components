<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ height: `${height}px`, 'overflow-y': 'hidden' }"
      v-model="html"
      :defaultConfig="{ ...baseEditorConfig, placeholder, readOnly, maxLength }"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
      @onMaxLength="onMaxLength"
    />
  </div>
</template>

<script>
import { Toolbar, Editor } from '@wangeditor/editor-for-vue'
import { Message as $message } from 'element-ui'
import '@wangeditor/editor/dist/css/style.css'

export default {
  name: 'WangEditor',
  components: { Toolbar, Editor },
  props: {
    height: {
      type: Number,
      default: 300
    },

    placeholder: {
      type: String,
      default: '请输入内容...'
    },

    readOnly: {
      type: Boolean,
      default: false
    },

    //  工具栏配置
    toolbarConfig: {
      type: Object,
      default() {
        return {}
      }
    },

     // 文本最大长度
    maxLength: {
      type: Number,
      default: 500
    },

    mode: {
      type: String,
      default: 'simple' // 'simple' or 'default'
    }
  },
  data() {
    return {
      editor: null,
      baseEditorConfig: {
        MENU_CONF: {
          uploadImage: {
            server: 'http://127.0.0.1:3000/api/upload-img', // 上传图片地址

            // 最多可上传文件数，默认为 100，不起作用
            maxNumberOfFiles: 2,

            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 1024 * 1024 * 1, // 1M

            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['image/*'],

            base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

            // 服务端响应的不是规定格式，使用自定义方式插入图片
            customInsert({ data }, insertFn) {
              const { alt, href, url } = data[0]
              insertFn(url, alt, href)
            },

            // 上传失败
            onError(fileInfo, err, res) {
              $message.error(err.toString().split(':')[1] || res.msg)
            }
          },
          uploadVideo: {
            server: 'http://127.0.0.1:3000/api/upload-video', // 上传视频地址

            // 单个文件的最大体积限制，默认为 10M
            maxFileSize: 50 * 1024 * 1024, // 5M

            // 最多可上传几个文件，默认为 5，不起作用
            maxNumberOfFiles: 1,

            customInsert: ({ data }, insertVideoFn) => {
              console.log(data)
              insertVideoFn(data.url)
            },
            // 上传失败
            onError(fileInfo, err, res) {
              $message.error(err.toString().split(':')[1] || res.msg)
            }
          }
        }
      },
      html: ''
    }
  },

  beforeDestroy() {
    if (this.editor == null) return
    this.editor.destroy() // 组件销毁时，及时销毁编辑器
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange() {
      this.$emit('change', this.html)
    },
    onMaxLength() {
      this.$message.error('输入超过最大字数限制')
    }
  }
}
</script>