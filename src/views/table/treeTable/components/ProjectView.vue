<template>
  <el-table :data="formData.data" class="project-table" style="width: 100%">
    <el-table-column type="expand" width="20">
      <template slot-scope="orderScope">
        <div class="device" style="padding-left: 48px;">
          <!--仪器table-->
          <el-table class="device-table" :data="orderScope.row.device">
            <el-table-column type="expand" width="20">
              <template slot-scope="deviceScope">
                <!--项目table-->
                <el-table :data="deviceScope.row.project">
                  <el-table-column label="序号" type="index" width="50" align="center" />
                  <el-table-column label="检测项目/要求">
                    <template slot-scope="projectScope">
                      <div class="td-cell">{{projectScope.row.itemName}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="使用时长(时)" prop="useTime" align="center" />
                  <el-table-column label="服务金额(元)" prop="itemAmount" align="center" />
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="序号" width="50" type="index" align="center" />
            <el-table-column label="仪器名称" prop="instrumentName" align="center" />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="序号" width="50" type="index" align="center" />
    <el-table-column label="样品名称" align="center" prop="specimenName" />
    <el-table-column label="样品编号" align="center" prop="specimenNum" />
    <el-table-column label="样品日期" align="center" prop="specimenTime" />
    <el-table-column label="单价" align="center" prop="price" />
    <el-table-column label="数量" align="center" prop="specimenQuantity" />
    <el-table-column label="使用总时长(时)" align="center">
      <template slot-scope="orderScope">
        <div style="color: red">{{orderScope.row.totalUseTime}}</div>
      </template>
    </el-table-column>
    <el-table-column label="服务总金额(元)" align="center">
      <template slot-scope="orderScope">
        <div style="color: red">{{orderScope.row.totalServiceAmount}}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        data: []
      }
    }
  },
  methods: {
    // 设置回显数据
    setData(data) {
      if (data) this.$set(this.formData, 'data', data)
    }
  }
}
</script>
