<template>
  <div class="profiled-table-container">
    <div>
      <el-button class="yangping" @click="handleAddSample">添加样品+</el-button>
      <el-button @click="handleSubmit">提交</el-button>
    </div>

    <project-edit ref="projectEdit" />
    <project-view ref="projectView" style="margin-top: 100px;" />
  </div>
</template>

<script>
import ProjectEdit from './components/ProjectEdit'
import ProjectView from './components/ProjectView'
export default {
  name: 'profiledTable',
  components: {
    ProjectEdit,
    ProjectView
  },
  data() {
    return {
      serviceOrgId: '',
      orderId: '',
      orderNo: ''
    }
  },
  methods: {
    invoiceHanlde() {},
    TIMEHanlde() {},
    ServiceHanlde() {},

    // 添加样品
    handleAddSample() {
      this.$refs.projectEdit.handleAddSample()
    },

    async handleSubmit() {
      let params = await this.$refs.projectEdit.validateProjectForm()
      this.$refs.projectView.setData(params)
    }
  }
}
</script>

<style scoped lang="scss">
.profiled-table-container {
  padding: 30px;
}

/deep/.el-table__expanded-cell {
  padding-top: 0;
}
</style>
