<template>
  <div class>
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      row-key="psiId"
      default-expand-all
      class="project-table"
      :tree-props="{children: 'children'}"
    >
      <el-table-column label="一级指标">
        <template slot-scope="{ row }">
          <div
            v-if="row.isShowTitle"
            style="margin-left: 5px;"
          >{{ `- ${row.psiName}（${row.psiScore}分）` }}</div>
        </template>
      </el-table-column>
      <el-table-column label="二级指标" width="350">
        <template slot-scope="{ row }">
          <div>{{ `${row.psiName}（${row.psiScore}分）` }}</div>
        </template>
      </el-table-column>
      <el-table-column label="分数">
        <template slot-scope="{ row }">
          <div>{{ row.pasiScore }}</div>
        </template>
      </el-table-column>
      <el-table-column label="意见">
        <template slot-scope="{ row }">
          <div>{{ row.auditRemark }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ProjectView',
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if ([0, 5, 8].includes(rowIndex)) {
        if (columnIndex === 0) {
          return [1, 4]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },
    setData(data) {
      this.tableData = data
    }
  }
}
</script>
