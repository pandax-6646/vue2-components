<template>
  <div class="node-box">
    <div class="start-box">
      <div class="start-conter">
        <div class="start-title">{{ headText }}</div>
        <span class="start-line" />
      </div>
    </div>
    <div v-for="(item,index) in processNodeList" :key="index" class="process-box">
      <div class="process-conter">
        <div class="process-title " :class="{'select':selectIndex === index}" @click="seeNode(index)" @contextmenu.prevent="openMenu(...arguments,index)">{{ item.nodeName === '' ? `节点${index+1}` : item.nodeName }}</div>
        <span v-if="processNodeList.length !== (index+1)" class="process-line" />
      </div>
    </div>
    <div class="end-box">
      <div class="end-conter">
        <span class="end-line" />
        <div class="end-title">{{ tailText }}</div>
      </div>
    </div>
    <el-popover v-model="popoverVisible" width="60" trigger="click" :style="{'display':'block','position': 'absolute','top':`${location.top}px`,'left':`${location.left}px`}">
      <div class="popover-box" @click.stop>
        <ul class="popover-content">
          <li style="border-bottom:1px solid #d9d9d9" @click.stop="addNode">增加节点</li>
          <li @click.stop="deleteNode">删除节点</li>
        </ul>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'NodeBox',
  props: {
    processSign: {
      type: Number,
      default: 1
    },
    currentStep: {
      type: Number,
      default: 1
    },
    headText: {
      type: String,
      default: '提交审批'
    },
    tailText: {
      type: String,
      default: '审批完成'
    },
    processNodeList: { // 节点列表
      type: Array,
      default: () => ([{
        nodeName: '',
        type: '',
        typeContentArr: [],
        approvalMethod: '2',
        processType: '',
        costSmall: '',
        costBig: ''
      }])
    }
  },
  data() {
    return {
      // ............................................................................. 右键菜单栏状态
      popoverVisible: false,
      // ............................................................................. 右键菜单栏位置
      location: {
        top: 0,
        left: 0
      },
      // ............................................................................. 点击的节点下标
      selectIndex: null
    }
  },
  mounted() {
    document.addEventListener('click', this.closeMenu, false)
  },
  destroyed() {
    document.removeEventListener('click', this.closeMenu, false)
  },
  methods: {
    seeNode(index) {
      this.selectIndex = index
      const row = this.processNodeList[index]
      this.$refs.approvalDialog.editApproval(row)
    },
    // ............................................................................. 右键打开菜单
    openMenu(e, index) {
      this.selectIndex = index
      this.location.top = e.layerY
      this.location.left = e.layerX
      this.popoverVisible = true
    },
    // ............................................................................. 关闭菜单
    closeMenu() {
      this.popoverVisible = false
    },
    // ............................................................................. 增加节点、删除节点
    addNode() {
      this.popoverVisible = false
      if (this.processNodeList.length >= 10) {
        this.$message.closeAll()
        this.$message({
          message: '最多增加10个节点',
          type: 'warning'
        })
        return
      }
      const node = {
        nodeName: '',
        type: '',
        typeContentArr: [],
        approvalMethod: '2',
        processType: '',
        costSmall: '',
        costBig: ''
      }
      this.processNodeList.splice(this.selectIndex + 1, 0, node)
    },
    deleteNode() {
      this.popoverVisible = false
      if (this.processNodeList.length <= 1) {
        this.$message.closeAll()
        this.$message({
          message: '至少保留一个节点',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定要将节点删除吗？', '温馨提示', { type: 'warning' }).then(() => {
        this.processNodeList.splice(this.selectIndex, 1)
        this.$message({ message: '删除成功', type: 'success' })
      }).catch(() => { })
    },
    // ..............................................................................暴露节点数据
    exposeData() {
      if (this.verifyNode(this.processNodeList)) {
        this.$message.closeAll()
        this.$message({
          message: '节点不能为空，请求完善',
          type: 'warning'
        })
        return undefined
      } else {
        return JSON.parse(JSON.stringify(this.processNodeList))
      }
    },
    // ..............................................................................节点验证
    verifyNode(data) {
      if (data.length <= 0) return false
      return data.some((item) => item.nodeName === '')
    },
    // ............................................................................. 节点弹窗回调
    dialogConfirm(val) {
      this.processNodeList.splice(this.selectIndex, 1, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.node-box {
  text-align: center;
  padding-top: 10px;
  position: relative;

  .start-box {
    .start-conter {
      display: inline-block;
      text-align: center;
    }

    .start-title {
      width: 100px;
      height: 40px;
      box-sizing: border-box;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      border: 1px solid #3366cc;
      border-radius: 12px;
    }

    .start-line {
      display: inline-block;
      box-sizing: border-box;
      height: 40px;
      border-left: 2px solid #0099cc;
    }
  }

  .process-box {
    margin-top: -4px;

    .process-conter {
      display: inline-block;
      text-align: center;
    }

    .process-title {
      min-width: 100px;
      padding: 0 5px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      border: 1px solid #3366cc;
    }

    .process-title.select {
      border: 2px solid #3366cc;
    }

    .process-line {
      display: inline-block;
      height: 40px;
      border-left: 2px solid #0099cc;
    }
  }

  .end-box {
    .end-conter {
      display: inline-block;
      text-align: center;
    }

    .end-title {
      margin-top: -4px;
      width: 100px;
      height: 40px;
      box-sizing: border-box;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      border: 1px solid #3366cc;
      border-radius: 12px;
    }

    .end-line {
      display: inline-block;
      box-sizing: border-box;
      height: 40px;
      border-left: 2px solid #0099cc;
    }
  }

  & >>> .el-popover {
    padding: 0;
    min-width: 100px;
  }

  .popover-box {
    padding: 5px;

    .popover-content {
      margin: 0;
      padding: 0;
      list-style: none;
      border: 1px solid #d9d9d9;
    }

    li {
      padding: 3px;
      cursor: pointer;
    }
  }
}
</style>
