<template>
  <el-table border style="margin-bottom: 50px;" :data="tableData" :show-header="isShowHeader">
    <el-table-column
      v-for="(item, index) in topTitle"
      :key="index"
      :label="item"
      align="center"
      :fixed="index === 0"
    >
      <template slot-scope="scope">{{ scope.row[index] }}</template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    originData: {
      type: Array,
      default: () => []
    },
    leftTitle: {
      type: Array,
      default: () => []
    },

    // 数组里面必须要有值，就算不显示顶部表头也要传
    topTitle: {
      type: Array,
      required: true
    },
    isShowHeader: {
      type: Boolean,
      deafult: false
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  watch: {
    originData: {
      handler(val) {
        if (val && val.length && this.leftTitle && this.leftTitle.length) {
          // 列表每一行的数据都转换为一个数组
          const matrixData = val.map((row) => {
            const arr = []
            for (const key in row) {
              if (Object.hasOwnProperty.call(row, key)) {
                arr.push(row[key])
              }
            }
            return arr
          })

          // 加入标题拼接最终的数据
          this.tableData = matrixData[0].map((col, i) => {
            return [this.leftTitle[i], ...matrixData.map((row) => row[i])]
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.el-table__fixed-body-wrapper
  .el-table__row
  .is-center:not(.is-hidden):first-child,
/deep/.el-table__header-wrapper .is-leaf:not(.is-hidden) {
  background-color: #f5f7fa;
}
</style>
