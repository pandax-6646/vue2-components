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
            style="margin-left: 5px;"
            v-if="row.isShowTitle"
          >{{ `- ${row.psiName}（${row.psiScore}分）` }}</div>
        </template>
      </el-table-column>
      <el-table-column label="二级指标" width="350">
        <template slot-scope="{ row }">
          <div>{{`${row.psiName}（${row.psiScore}分）`}}</div>
        </template>
      </el-table-column>
      <el-table-column label="分数" prop="psiScore">
        <template slot-scope="orderScope">
          <el-input-number
            v-model="orderScope.row.pasiScore"
            :min="0"
            :step="1"
            step-strictly
            :placeholder="`请输入 ${orderScope.row.psiName} 分数`"
            style="width: 100%"
            :max="Number(orderScope.row.psiScore)"
            size="mini"
          />
        </template>
      </el-table-column>
      <el-table-column label="意见" prop="auditRemark">
        <template slot-scope="orderScope">
          <el-input
            clearable
            :placeholder="`请输入 ${orderScope.row.psiName} 意见`"
            v-model="orderScope.row.auditRemark"
            size="mini"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ProjectEdit',
  data() {
    return {
      // 考核得分
      tableData: [
        {
          psiId: '1',
          isShowTitle: true,
          psiName: '一级指标一',
          psiScore: '50',
          children: [
            {
              psiId: '1-1',
              isShowTitle: false,
              psiName: '指标一-二级指标一',
              psiScore: '10'
            },
            {
              psiId: '1-2',
              isShowTitle: false,
              psiName: '指标一-二级指标二',
              psiScore: '20'
            },
            {
              psiId: '1-3',
              isShowTitle: false,
              psiName: '指标一-二级指标三',
              psiScore: '15'
            },
            {
              psiId: '1-4',
              isShowTitle: false,
              psiName: '指标一-二级指标四',
              psiScore: '5'
            }
          ]
        },
        {
          psiId: '2',
          isShowTitle: true,
          psiName: '一级指标二',
          psiScore: '30',
          children: [
            {
              psiId: '2-1',
              isShowTitle: false,
              psiName: '指标二-二级指标一',
              psiScore: '20'
            },
            {
              psiId: '2-2',
              isShowTitle: false,
              psiName: '指标二-二级指标二',
              psiScore: '10'
            }
          ]
        },
        {
          psiId: '3',
          isShowTitle: true,
          psiName: '一级指标三',
          psiScore: '20',
          children: [
            {
              psiId: '3-1',
              isShowTitle: false,
              psiName: '指标三-二级指标一',
              psiScore: '15'
            },
            {
              psiId: '3-3',
              isShowTitle: false,
              psiName: '指标三-二级指标二',
              psiScore: '5'
            }
          ]
        }
      ]
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

    // 暴露得分参数
    exportScoreForm() {
      let list = this.tableData
      list = list.map((it) => {
        const children = it.children.map((data) => {
          return {
            isShowTitle: false,
            psiId: data.psiId,
            psiScore: data.psiScore,
            pasiScore: data.pasiScore,
            psiName: data.psiName,
            auditRemark: data.auditRemark
          }
        })
        return {
          children,
          isShowTitle: true,
          psiId: it.psiId,
          psiName: it.psiName,
          psiScore: it.psiScore
        }
      })

      const rows = list.reduce((prov, it) => prov.concat(it.children), [])
      const objScore = rows.find((item) => !item.pasiScore)
      const objRemark = rows.find((item) => !item.auditRemark)

      if (objScore) {
        let msg = objScore.psiName
        this.$message.error(`请填写${msg}的分数`)
        return false
      }

      if (objRemark) {
        let msg = objRemark.psiName
        this.$message.error(`请填写${msg}的意见`)
        return false
      }
      return list
    }
  }
}
</script>
