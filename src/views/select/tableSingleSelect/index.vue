<template>
  <div class="app-container">
    <el-form ref="form">
      <el-col :sm="24" :md="12" :lg="8">
        <el-form-item label="操作：">
          <el-button plain size="mini" icon="el-icon-plus" @click="showDialog" />
          <el-button size="mini" @click="selectedRow = {}">删除选中</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="选中的数据：">
          <el-table border row-key="id" ref="multipleTable" :data="getSelectRows">
            <el-table-column prop="date" label="日期">
              <template slot-scope="{row}">
                <div>{{ row.date }} = {{ row.id }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="address" label="地址" show-overflow-tooltip />
          </el-table>
        </el-form-item>
      </el-col>
    </el-form>
    <table-dialog ref="tableDialog" @select="select" :selectedRow="selectedRow" />
  </div>
</template>

<script>
import TableDialog from './components/TableDialog'
export default {
  name: 'tableSingleSelect',
  components: {
    TableDialog
  },
  data() {
    return {
      // 选中回显数据
      selectedRow: {}
    }
  },
  computed: {
    getSelectRows() {
      if (!this.selectedRow.id) return []
      return [this.selectedRow]
    }
  },
  methods: {
    showDialog() {
      this.$refs.tableDialog.show()
    },
    select(row) {
      this.selectedRow = row
    }
  }
}
</script>