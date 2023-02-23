<template>
  <div>
    <el-row>
      <!-- <el-col :span="12">数据列表</el-col> -->
      <el-col class="text-right" :span="12">
        <el-button
          v-if="buttonControl.indexOf('isExport')>-1"
          size="small"
          @click="exportList"
        >导出excel</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="tableLoading" :data="tableData" border>
      <el-table-column
        v-for="item in columns"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <!-- <div v-if="item.prop === 'content'">
            <div v-if="row.action" style="cursor:pointer" @click="gotoPage(row)">
              <span :style="parseInt(row.color)===1?'color:red':'color:#0474ef'">{{ row.action }} :</span>
              <span>{{ row.detail }}</span>
            </div>
          </div> -->
          <span>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'Table',
  props: {
    tableLoading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        {
          label: '标题',
          prop: 'title',
          width: 'auto'
        },
        {
          label: '作者',
          prop: 'author',
          width: 'auto'
        },
        {
          label: '操作时间',
          prop: 'display_time',
          width: 'auto'
        },
        {
          label: '浏览量',
          prop: 'pageviews',
          width: 'auto'
        }
      ]
    }
  },

  methods: {
    // 导出列表数据
    exportList() {
      exportLogList({
        parameter: {
          ...this.params,
          type: this.tabStatus || ''
        },
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(
        (res) => {
          if (Number(res.code) === 200) {
            const label = document.createElement('a')
            label.href = `${res.data}?attname=操作日志-${this.typeText(
              this.tabStatus
            )}-${this.exportData()}.${this.urlFormat(res.data)}`
            document.body.appendChild(label)
            label.click()
            document.body.removeChild(label)
          } else {
            this.$message.error(res.msg || '导出失败')
          }
        },
        (err) => {
          this.$message.error(err.msg || '导出失败')
        }
      )
    }
  }
}
</script>
<style scoped lang="scss">
// 清楚表格未知横线
>>> .el-table__fixed-right {
  height: 100% !important;
}
</style>

