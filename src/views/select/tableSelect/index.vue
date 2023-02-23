<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="水果：">
        <el-tag v-for="item of form.selected" :key="item.id" closable @close="closeHandle(item)">{{ item.date }} - {{
          item.id }}</el-tag>
        <el-button plain size="mini" icon="el-icon-plus" circle @click="showDialog" />
      </el-form-item>
    </el-form>
    <table-dialog ref="tableDialog" @select="select" :exportSelected="form.selected" />
  </div>
</template>

<script>
import TableDialog from './components/TableDialog'
export default {
  name: 'TableSelect',
  data() {
    return {
      form: {
        // 选中回显数据
        selected: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }
        ]
      }
    }
  },
  components: {
    TableDialog
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    showDialog() {
      this.$refs.tableDialog.show()
    },
    select(list) {
      this.$set(this.form, 'selected', list)
      console.log('拿到的数据', list)
    },
    closeHandle(row) {
      const list = this.form.selected.filter((it) => it.id != row.id)
      this.$set(this.form, 'selected', list)
    }
  }
}
</script>

<style scoped lang="scss"></style>
