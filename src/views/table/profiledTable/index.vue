<template>
  <div class="profiled-table-container">
    <div>
      <el-button @click="handleSubmit">提交</el-button>
    </div>
    <project-edit ref="projectEdit" />
    <project-view ref="projectView" style="margin-top: 30px;" />
  </div>
</template>

<script>
import ProjectEdit from './components/ProjectEdit'
import ProjectView from './components/ProjectView'
export default {
  name: 'TreeTable',
  components: {
    ProjectEdit,
    ProjectView
  },
  data() {
    return {}
  },
  methods: {
    handleSubmit() {
      const tableData = this.$refs.projectEdit.exportScoreForm()
      this.$refs.projectView.setData(tableData)
    }
  }
}
</script>

<style scoped lang="scss">
.profiled-table-container {
  padding: 30px;
}
/deep/.cell .el-table__expand-icon {
  display: none;
}
</style>
