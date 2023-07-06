<template>
  <el-dialog
    title="编辑节点"
    :visible.sync="modalVisible"
    :close-on-click-modal="false"
    @close="dialogClose"
  >
    <el-form ref="currentForm" :model="params" :rules="rules" size="small" label-width="130px">
      <el-form-item label="节点名称" prop="nodeName">
        <el-input v-model="params.nodeName" maxlength="20" placeholder="请输入节点名称" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="modalVisible = false">取 消</el-button>
      <el-button type="primary" size="small" @click="dialogConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'NodeDetail',

  data() {
    return {
      modalVisible: false,
      params: {},
      rules: {
        nodeName: [
          { required: true, message: '请输入节点名称' },
          { max: 20, message: '长度在20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 编辑传参数
    editApproval(row) {
      this.params = {
        ...row
      }
      this.modalVisible = true
    },
    // 关闭回掉
    dialogClose() {
      this.params = {}
      this.modalVisible = false
    },
    // 确认（保存、修改）
    dialogConfirm() {
      this.$refs.currentForm.validate((valid) => {
        if (valid) {
          this.$emit('dialogConfirm', this.params)
          this.dialogClose()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
