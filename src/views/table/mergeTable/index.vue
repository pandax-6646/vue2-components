<template>
  <div class="merge-table-cocntainer">
    <el-table v-loading="tableLoading" :data="tableData" :span-method="objectSpanMethod" border>
      <el-table-column label="编号" prop="id" align="center" width="95" />
      <el-table-column label="名字" prop="name" align="center" />
      <el-table-column label="地址" prop="address" align="center" />
      <el-table-column label="时间" prop="date" align="center" />
    </el-table>
  </div>
</template>

<script>
import { getSelectTableList } from '@/api/table'
export default {
  name: 'MergeTable',
  data() {
    return {
      tableLoading: false,
      tableData: []
    }
  },
  mounted() {
    this.fetchDate()
  },
  methods: {
    // 获取数据
    fetchDate() {
      this.tableLoading = true
      getSelectTableList({ page: 1, limit: 10, parameter: {}})
        .then((res) => {
          if (Number(res.code) == 200) {
            this.tableData = [
              {
                id: '1',
                date: '2016-05-02',
                name: '王虎',
                address: '上海市普陀区金沙江路 1517 弄'
              },
              {
                id: '1',
                date: '2016-05-04',
                name: '小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              },
              {
                id: '1',
                date: '2016-05-01',
                name: '小王',
                address: '上海市普陀区金沙江路 1519 弄'
              },
              {
                id: '2',
                date: '2016-05-03',
                name: '老王',
                address: '上海市普陀区金沙江路 1516 弄'
              },
              {
                id: '2',
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              },
              {
                id: '2',
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              },
              {
                id: '3',
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              },
              {
                id: '3',
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
              },
              {
                id: '4',
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              },
              {
                id: '4',
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              },
              {
                id: '11',
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              },
              {
                id: '12',
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
              }
            ]
            this.tableLoading = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 合并行方式二（第一、二行）
    setTable(tableData) {
      const spanOneArr = []
      const spanTwoArr = []
      let concatOne = 0
      let concatTwo = 0
      tableData.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
          spanTwoArr.push(1)
        } else {
          // 第一列合并相同内容的判断条件
          if (item.id.trim() === tableData[index - 1].id.trim()) {
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }

          // 第二列合并相同内容的判断条件（在第一列的合并基础上进行合并）
          if (
            item.id.trim() === tableData[index - 1].id.trim() &&
            item.name.trim() === tableData[index - 1].name.trim()
          ) {
            spanTwoArr[concatTwo] += 1
            spanTwoArr.push(0)
          } else {
            spanTwoArr.push(1)
            concatTwo = index
          }
        }
      })
      return {
        one: spanOneArr,
        two: spanTwoArr
      }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.setTable(this.tableData).one[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = this.setTable(this.tableData).two[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.merge-table-cocntainer {
  padding: 20px;
}
</style>
