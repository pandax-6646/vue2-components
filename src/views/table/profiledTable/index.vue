<template>
  <div class="profiled-table-container">
    <el-form ref="orderForm" label-width="0" class="detail" :model="formData">
      <el-table
        :data="formData.data"
        :span-method="arraySpanMethod"
        row-key="psiId"
        default-expand-all
        class="project-table"
        :tree-props="{children: 'children'}"
      >
        <el-table-column label="一级指标">
          <template slot-scope="orderScope">
            <div
              class="td-cell"
              v-if="orderScope.row.showtitle"
            >{{ `- ${orderScope.row.psiName}（${orderScope.row.psiScore}分）` }}</div>
          </template>
        </el-table-column>
        <el-table-column label="二级指标" width="350">
          <template slot-scope="orderScope">
            <div class="td-cell">{{`${orderScope.row.psiNameItem}（${orderScope.row.psiScore}分）`}}</div>
          </template>
        </el-table-column>
        <el-table-column label="分数" prop="psiScore">
          <template slot-scope="orderScope">
            <div class="td-cell">
              <el-form-item>
                <el-input-number
                  v-model="orderScope.row.pasiScore"
                  :min="0"
                  :step="1"
                  step-strictly
                  :max="Number(orderScope.row.psiScore)"
                  size="mini"
                />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="意见" prop="auditRemark">
          <template slot-scope="orderScope">
            <div class="td-cell">
              <el-form-item>
                <el-input v-model="orderScope.row.auditRemark" size="mini" />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- <el-table
      :data="formData.data"
      :span-method="arraySpanMethod"
      row-key="psiId"
      default-expand-all
      style="width: 80%"
      class="project-table"
      :tree-props="{children: 'item'}"
    >
      <el-table-column label="一级指标">
        <template slot-scope="orderScope">
          <div
            class="td-cell"
            style="margin-left: 5px;"
            v-if="orderScope.row.showtitle"
          >{{ `- ${orderScope.row.psiName}（${orderScope.row.psiScore}分）` }}</div>
        </template>
      </el-table-column>
      <el-table-column label="二级指标" width="350">
        <template slot-scope="orderScope">
          <div class="td-cell">{{`${orderScope.row.psiName}（${orderScope.row.psiScore}分）`}}</div>
        </template>
      </el-table-column>
      <el-table-column label="分数">
        <template slot-scope="orderScope">
          <div class="td-cell">{{orderScope.row.pasiScore}}</div>
        </template>
      </el-table-column>
      <el-table-column label="意见">
        <template slot-scope="orderScope">
          <div class="td-cell">{{orderScope.row.auditRemark}}</div>
        </template>
      </el-table-column>
    </el-table>-->
  </div>
</template>

<script>
export default {
  name: 'treeTable',
  data() {
    return {
      // 考核得分
      formData: {
        data: [
          {
            psiId: '1',
            showtitle: true,
            psiName: '一级指标一',
            psiScore: '20',
            children: [
              {
                psiId: '1-1',
                showTitle: false,
                psiNameItem: '12123',
                psiScore: '10'
              },
              {
                psiId: '1-2',
                showTitle: false,
                psiNameItem: '12123',
                psiScore: '10'
              },
              {
                psiId: '1-3',
                showTitle: false,
                psiNameItem: '12123',
                psiScore: '10'
              },
              {
                psiId: '1-4',
                showTitle: false,
                psiNameItem: '12123',
                psiScore: '10'
              }
            ]
          },
          {
            psiId: '2',
            showtitle: true,
            psiName: '一级指标二',
            psiScore: '20',
            children: [
              {
                psiId: '2-1',
                showTitle: false,
                psiNameItem: '12123',
                psiScore: '22'
              },
              {
                psiId: '2-2',
                showTitle: false,
                psiNameItem: '12123',
                psiScore: '22'
              }
            ]
          },
          {
            psiId: '3',
            showtitle: true,
            psiName: '一级指标三',
            psiScore: '20',
            children: [
              {
                psiId: '3-1',
                showTitle: false,
                psiNameItem: '12123',
                psiScore: '22'
              },
              {
                psiId: '3-3',
                showTitle: false,
                psiNameItem: '12123',
                psiScore: '22'
              }
            ]
          }
        ]
      }
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
      let list = this.formData.data
      list = list.map((it) => {
        const item = it.children.map((data) => {
          return {
            psiId: data.psiId,
            psiScore: data.psiScore,
            pasiScore: data.pasiScore,
            psiName: data.psiNameItem,
            auditRemark: data.auditRemark
          }
        })
        return {
          item,
          psiId: it.psiId,
          psiName: it.psiName,
          psiScore: it.psiScore
        }
      })

      const rows = list.reduce((prov, it) => prov.concat(it.item), [])
      const objScore = rows.find((item) => !item.pasiScore)
      // const objRemark = rows.find((item) => !item.auditRemark)

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

<style scoped lang="scss">
.profiled-table-container {
  padding: 30px;
}
/deep/.cell .el-table__expand-icon {
  display: none;
}
</style>
