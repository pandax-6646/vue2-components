<template>
  <div class="components-container">
    <div class="editor-container">
      <h3>编辑</h3>
      <div class="editor-content">
        <json-editor ref="jsonEditor" v-model="value" />
      </div>
    </div>
    <div class="view-container">
      <div style="display: flex; align-items: center">
        <h3>数据</h3>
        <div style="margin-left: 130px;">
          <el-button size="mini" @click="updateJsonData">更新</el-button>
        </div>
      </div>
      <p style="color: #5e5e5e">点击下面的数据展示美化视图</p>
      <el-popover placement="top" trigger="click">
        <pre class="handleLog-pre" v-html="viewData" />
        <div class="record-text" ref="recordText" slot="reference" v-html="viewData" />
      </el-popover>
    </div>
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'

let initJsonData =
  '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'

export default {
  name: 'JsonEditorDemo',
  components: { JsonEditor },
  data() {
    return {
      value: JSON.parse(initJsonData),
      viewData: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 更新 json 数据
    updateJsonData() {
      const val = this.$refs.jsonEditor.getValue()
      console.log(val)
      this.value = JSON.parse(val)
      this.init()
    },

    // 更新 json 视图
    init() {
      this.viewData = this.getJson(this.value)
    },

    // 将数据转为 json
    getJson(val) {
      let json = ''
      if (val) {
        try {
          let obj = {}
          obj = typeof val === 'object' ? val : JSON.parse(val)
          json = JSON.stringify(obj, null, 4)
          return this.SyntaxHighlight(json)
        } catch (err) {
          json = val
          return json
        }
      }
    },

    // 高亮json
    SyntaxHighlight(json) {
      if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 2)
      }
      json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          var cls = 'jsonnumber'
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'jsonkey'
            } else {
              cls = 'jsonstring'
            }
          } else if (/true|false/.test(match)) {
            cls = 'jsonboolean'
          } else if (/null/.test(match)) {
            cls = 'jsonnull'
          }
          return '<span class="' + cls + '">' + match + '</span>'
        }
      )
    }
  }
}
</script>

<style lang="scss">
.record-text {
  width: 280px;
}
.handleLog-pre {
  padding: 5px 10px;
  margin: 5px;
  word-break: break-all;
  max-height: 350px;
  overflow: auto;
  max-width: 800px;
  .jsonstring {
    color: #3ab54a;
  }
  .jsonnumber {
    color: #25aae2;
  }
  .jsonboolean {
    color: blue;
  }
  .jsonnull {
    color: #f1592a;
  }
  .jsonkey {
    color: #92278f;
  }
}
</style>
<style scoped lang="scss">
.components-container {
  display: flex;
  justify-content: space-around;
}
.editor-container,
.view-container {
  position: relative;
  height: 100%;
  width: 40%;
}
.editor-content {
  height: 650px;
  overflow-y: auto;
}
</style>


