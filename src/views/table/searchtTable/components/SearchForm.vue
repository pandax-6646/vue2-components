<template>
  <el-form size="small" label-width="110px">
    <el-row :gutter="20">
      <el-col :sm="12" :md="8" :lg="6">
        <el-form-item label="标题名称:">
          <el-input v-model="params.title" clearable placeholder="请输入标题名称" />
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="params.operName" placeholder="请输入姓名/登录账号" clearable />
        </el-form-item>
        <template v-if="isOpen">
          <el-col :sm="12" :md="12" :lg="6">
            <el-form-item label="操作时间:">
              <el-date-picker
                v-model="useData"
                type="daterange"
                clearable
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'SearchForm',
  props:{
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      useData: null,
      params: {}
    }
  },
  watch: {
    useData(val) {
      if (val === null) {
        this.params.startTime = ''
        this.params.endTime = ''
      } else {
        this.params.startTime = val[0]
        this.params.endTime = val[1]
      }
    }
  },
  methods: {
    // 暴露参数
    exposeParams() {
      return JSON.parse(JSON.stringify())
    },
    // 重置参数
    resetParams() {
      this.useData = null
      this.params = this.$options.data().params
      return JSON.parse(JSON.stringify(this.params))
    }
  }
}
</script>

