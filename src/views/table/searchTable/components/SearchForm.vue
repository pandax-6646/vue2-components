<template>
  <el-form size="small" label-width="100px">
    <el-row :gutter="24">
      <el-col :sm="24" :md="12" :lg="8">
        <el-form-item label="标题名称:">
          <el-input v-model="searchParams.title" clearable placeholder="请输入标题名称" />
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8">
        <el-form-item label="姓名:">
          <el-input v-model="searchParams.operName" placeholder="请输入姓名/登录账号" clearable />
        </el-form-item>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8">
        <el-form-item label="操作时间:">
          <el-date-picker
            v-model="useData"
            type="daterange"
            clearable
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      useData: null,
      searchParams: {}
    }
  },
  watch: {
    useData(val) {
      if (val === null) {
        this.searchParams.startTime = ''
        this.searchParams.endTime = ''
      } else {
        this.searchParams.startTime = val[0]
        this.searchParams.endTime = val[1]
      }
    }
  },
  methods: {
    // 暴露参数
    exposeParams() {
      return JSON.parse(JSON.stringify(this.searchParams))
    },
    // 重置参数
    resetParams() {
      this.useData = null
      this.searchParams = this.$options.data().searchParams
      return JSON.parse(JSON.stringify(this.searchParams))
    }
  }
}
</script>

