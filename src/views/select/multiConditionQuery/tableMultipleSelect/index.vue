<template>
  <div class="app-container">
    <el-form ref="form">
      <el-col :sm="24" :md="12" :lg="8">
        <el-form-item label="最多可选：">
          <el-input-number v-model="maxAllowedNumber" step-strictly :step="1" :min="1" :max="10" />
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8">
        <el-form-item label="添加数据：">
          <el-button
            plain
            size="mini"
            icon="el-icon-plus"
            :disabled="selectedRows.length == maxAllowedNumber"
            circle
            @click="showDialog"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="选中的数据：">
          <el-table ref="multipleTable" border row-key="id" :data="selectedRows">
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
    <table-dialog ref="tableDialog" :max-allowed-number="maxAllowedNumber" @select="select" />
  </div>
</template>

<script>
import TableDialog from './components/TableDialog'
export default {
  name: 'TableMultipleSelect',
  components: {
    TableDialog
  },
  data() {
    return {
      // 最多可选
      maxAllowedNumber: Math.floor(Math.random() * 10),

      // 选中回显数据
      selectedRows: []
    }
  },
  methods: {
    showDialog() {
      this.$refs.tableDialog.show(JSON.parse(JSON.stringify(this.selectedRows)))
    },
    select(rows) {
      this.selectedRows = rows
    }
  }
}
</script>

<style scoped lang="scss"></style>
