<template>
  <div class="app-container">
    <el-form ref="form">
      <el-col :sm="24" :md="12" :lg="8">
        <el-form-item label="最多可选：">
          <el-input-number
            v-model="maxAllowedNumber"
            step-strictly
            :step="1"
            :min="1"
            :max="10"
          />
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8">
        <el-form-item label="添加数据：">
          <el-button plain size="mini" icon="el-icon-plus" :disabled="selected.length == maxAllowedNumber" circle @click="showDialog" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="选中的数据：">
          <el-table border row-key="id" ref="multipleTable" :data="selected">
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
    <table-dialog ref="tableDialog" @select="select" :maxAllowedNumber="maxAllowedNumber" />
  </div>
</template>

<script>
import TableDialog from './components/TableDialog'
export default {
  name: 'TableSelect',
  data() {
    return {
      maxAllowedNumber: 1,
      // 选中回显数据
      selected: []
    }
  },
  components: {
    TableDialog
  },
  methods: {
    showDialog() {
      this.$refs.tableDialog.show(JSON.parse(JSON.stringify(this.selected)))
    },
    select(list) {
      this.selected = list
    }
  }
}
</script>

<style scoped lang="scss"></style>
