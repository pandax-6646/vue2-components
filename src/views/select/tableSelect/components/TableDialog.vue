<template>
  <el-dialog title="选择" :visible.sync="dialogVisible" width="50%">
    <el-table :data="tableData" style="width: 100%" ref="multipleTable" row-key="id" @select="handleOneSelect">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="date" label="日期" width="180">
        <template slot-scope="{row}">
          <div>{{ row.date }} = {{ row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
      :page-sizes="[5, 10, 20, 50]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper"
      :total="params.total" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeHandle">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'TableDialog',
  props: {
    exportSelected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      params: {
        page: 1,
        limit: 5,
        total: 0
      },
      data: [
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
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          id: 5,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 6,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 7,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 8,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          id: 9,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 10,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 11,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 12,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          id: 13,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 14,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 15,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 16,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          id: 17,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 18,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 19,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 20,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      selected: [],
      maxAllowedNumber: 4
    }
  },
  watch: {
    tableData: {
      handler(newV) {
        this.$nextTick(() => {
          newV.forEach((item) => {
            this.$refs.multipleTable.toggleRowSelection(
              this.selected.find((it) => it.id === item.id),
              true
            )
          })
        })
      },
      deep: true
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
      this.params.page = 1
      this.getData()
      this.selected = this.exportSelected
    },

    // 获取列表
    getData() {
      setTimeout(() => {
        this.tableData = this.pagingHandel(
          this.params.page,
          this.params.limit,
          this.data
        )
        this.params.total = this.data.length
      }, 500)
    },

    // 分页
    handleSizeChange(val) {
      this.params.limit = val
      this.params.page = 1
      this.getData()
    },

    // 当前页码
    handleCurrentChange(val) {
      this.params.page = val
      this.selected = this.getData()
    },

    // 单选数据
    handleOneSelect(rows, row) {
      // selection = selection.filter((item) => item)
      // console.log('单选一个', selection, row)
      // if (selection.length > this.maxAllowedNumber) {
      //   this.$message({
      //     message: '超出最大数量限制,不可再次选择333333',
      //     type: 'error'
      //   })
      //   this.$refs.multipleTable.toggleRowSelection(row, false)
      // }
    },


    // 提交数据
    submitHandle() {
      this.$emit('select', this.selected)
      this.closeHandle()
    },

    // 关闭弹窗
    closeHandle() {
      this.dialogVisible = false
    },

    // 分页函数
    pagingHandel(page, limit, list) {
      const start = (page - 1) * limit
      const end = page * limit
      return list.slice(start, end) || []
    }
  }
}
</script>

<style scoped lang="scss"></style>
