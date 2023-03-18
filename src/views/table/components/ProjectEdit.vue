<template>
  <div class="box">
    <el-form ref="orderForm" label-width="0" class="detail" :model="formData">
      <el-table
        :data="formData.data"
        class="project-table"
        style="width: 100%"
        row-key="id"
        :expand-row-keys="expandFirstKeys"
      >
        <el-table-column type="expand" width="20">
          <template slot-scope="orderScope">
            <div class="device" style="padding-left: 48px;">
              <!--仪器table-->
              <el-table
                class="device-table"
                :data="orderScope.row.device"
                row-key="id"
                :expand-row-keys="expandSecondKeys"
              >
                <el-table-column type="expand" width="20">
                  <template slot-scope="deviceScope">
                    <!--项目table-->
                    <el-table :data="deviceScope.row.project">
                      <el-table-column label="序号" type="index" width="50" align="center" />

                      <el-table-column label="检测项目/要求" width="200" align="center">
                        <template slot-scope="projectScope">
                          <div class="td-cell">
                            <el-form-item
                              :prop="'data.' + orderScope.$index + '.device.'+ deviceScope.$index + '.project.' + projectScope.$index + '.itemName'"
                              :rules="formData.rules.itemName"
                            >
                              <el-input
                                :disabled="isDetails"
                                clearable
                                v-model="projectScope.row.itemName"
                                size="mini"
                              />
                            </el-form-item>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="使用时长(时)" prop="name" width="200" align="center">
                        <template slot-scope="projectScope">
                          <div class="td-cell">
                            <el-form-item
                              :prop="'data.' + orderScope.$index + '.device.'+ deviceScope.$index + '.project.' + projectScope.$index + '.useTime'"
                              :rules="formData.rules.useTime"
                            >
                              <el-input-number
                                :disabled="isDetails"
                                v-model="projectScope.row.useTime"
                                size="mini"
                                :precision="2"
                                style="width: 100%"
                                :min="0"
                                :max="999999999"
                                @change="serviceUseTimeHandle(orderScope.$index)"
                              />
                            </el-form-item>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="服务金额(元)" prop="name" width="200" align="center">
                        <template slot-scope="projectScope">
                          <div class="td-cell">
                            <el-form-item
                              :prop="'data.' + orderScope.$index + '.device.'+ deviceScope.$index + '.project.' + projectScope.$index + '.itemAmount'"
                              :rules="formData.rules.itemAmount"
                            >
                              <el-input-number
                                :disabled="isDetails"
                                v-model="projectScope.row.itemAmount"
                                size="mini"
                                :precision="2"
                                :min="0"
                                style="width: 100%"
                                :max="999999999"
                                @change="serviceAmountHandle(orderScope.$index)"
                              />
                            </el-form-item>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label align="right">
                        <template slot-scope="projectScope">
                          <el-button
                            type="text"
                            v-if="!isDetails"
                            @click="handleDelProject(orderScope.row.id,deviceScope.row.id,projectScope.row.id, orderScope.$index)"
                          >删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column label="序号" width="50" type="index" align="center" />
                <el-table-column label="仪器名称" prop="instrumentName" width="300" align="center">
                  <template slot-scope="deviceScope">
                    <div class="td-cell topdevice">
                      <el-form-item
                        :prop="'data.'+ orderScope.$index + '.device.'+ deviceScope.$index + '.instrumentName'"
                        :rules="formData.rules.device"
                      >
                        <div
                          @click="chooseDevice(orderScope.row.id,deviceScope.row,formData.data[orderScope.$index].device[deviceScope.$index].id,orderScope.$index)"
                        >
                          <el-input
                            :disabled="isDetails"
                            v-model="deviceScope.row.instrumentName"
                            size="mini"
                          />
                        </div>
                      </el-form-item>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot-scope="deviceScope">
                    <el-button
                      type="text"
                      v-if="!isDetails"
                      @click="handleAddProject( orderScope.row,orderScope.row.id,deviceScope.row.id)"
                    >添加项目</el-button>
                    <el-button
                      type="text"
                      v-if="!isDetails"
                      @click="handleDelDevice(orderScope.row.id,deviceScope.row.id, orderScope.$index)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="序号" width="50" align="center" type="index" />
        <el-table-column label="样品名称" align="center">
          <template slot-scope="orderScope">
            <div class="td-cell">
              <el-form-item
                :prop="'data.' + orderScope.$index + '.specimenName'"
                :rules="formData.rules.specimenName"
              >
                <el-input
                  :disabled="isDetails"
                  clearable
                  v-model="orderScope.row.specimenName"
                  size="mini"
                />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="样品编号" align="center">
          <template slot-scope="orderScope">
            <div class="td-cell">
              <el-form-item
                :prop="'data.' + orderScope.$index + '.specimenNum'"
                :rules="formData.rules.specimenNum"
              >
                <el-input
                  clearable
                  :disabled="isDetails"
                  v-model="orderScope.row.specimenNum"
                  size="mini"
                />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="样品日期" align="center">
          <template slot-scope="orderScope">
            <div class="td-cell">
              <el-form-item
                :prop="'data.' + orderScope.$index + '.specimenTime'"
                :rules="formData.rules.specimenTime"
              >
                <el-date-picker
                  :disabled="isDetails"
                  v-model="orderScope.row.specimenTime"
                  type="date"
                  clearable
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  size="mini"
                  style="width: 100%;"
                />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" align="center">
          <template slot-scope="orderScope">
            <div class="td-cell">
              <el-form-item
                :prop="'data.' + orderScope.$index + '.price'"
                :rules="formData.rules.price"
              >
                <el-input-number
                  :disabled="isDetails"
                  style="width: 100%"
                  :precision="2"
                  v-model="orderScope.row.price"
                  :min="0"
                  :max="999999999"
                  size="mini"
                />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="orderScope">
            <div class="td-cell">
              <el-form-item
                :prop="'data.' + orderScope.$index + '.specimenQuantity'"
                :rules="formData.rules.specimenQuantity"
              >
                <el-input-number
                  :disabled="isDetails"
                  style="width: 100%"
                  :step="1"
                  step-strictly
                  v-model="orderScope.row.specimenQuantity"
                  :min="0"
                  :max="999999999"
                  size="mini"
                />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="使用总时长(时)" align="center" width="80">
          <template slot-scope="scope">
            <div style="color: red">{{scope.row.totalUseTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="服务总金额(元)" align="center" width="80">
          <template slot-scope="scope">
            <div style="color: red">{{scope.row.totalServiceAmount}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="desc" align="center" width="130">
          <template slot-scope="orderScope">
            <el-button
              type="text"
              v-if="!isDetails"
              @click="chooseDevice(orderScope.row.id,orderScope.row,'add',orderScope.$index)"
            >选择仪器</el-button>
            <el-button type="text" v-if="!isDetails" @click="handleDelSample(orderScope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <single-choose-device ref="singleChooseDevice" @select="handleChooseDevice" />
  </div>
</template>

<script>
import SingleChooseDevice from './tableSingleSelect'

export default {
  components: {
    SingleChooseDevice
  },
  props: {
    isDetails: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 一级表格要展开的列表
      expandFirstKeys: [],
      // 二级表格要展开的列表
      expandSecondKeys: [],
      formData: {
        data: [],

        rules: {
          specimenName: [
            { required: true, message: '请填写样品名称', trigger: 'blur' },
            { max: 50, message: '样品名称不超过50个字' }
          ],
          specimenNum: [
            { required: true, message: '请填写样品编号', trigger: 'blur' },
            { max: 100, message: '样品编号不超过100个字' }
          ],
          specimenQuantity: [
            { required: true, message: '请填写样品数量', trigger: 'blur' }
          ],
          price: [{ required: true, message: '请填写单价', trigger: 'blur' }],
          specimenTime: [
            { required: true, message: '请选择样品日期', trigger: 'blur' }
          ],
          device: [
            { required: true, message: '请选择仪器', trigger: 'change' }
          ],
          itemName: [
            { required: true, message: '请填写检测项目/要求', trigger: 'blur' },
            { max: 50, message: '检测项目/要求不超过50个字' }
          ],
          useTime: [
            { required: true, message: '请填写使用时长', trigger: 'blur' }
          ],
          itemAmount: [
            { required: true, message: '请填写服务金额', trigger: 'blur' }
          ]
        }
      }
    }
  },

  methods: {
    // 计算总数
    getTotal(arr, prop) {
      let total = 0
      total = arr.reduce((pro, item) => {
        const num = item[prop] ? (item[prop] * 100).toFixed(2) : 0
        return pro + Number(num)
      }, 0)

      return (total / 100).toFixed(2)
    },

    // 添加样品
    handleAddSample() {
      this.formData.data.push({
        id: `sample${new Date().getTime()}`,
        device: []
      })
    },

    // 显示选择仪器弹窗
    chooseDevice(sampleId, device, editType, index) {
      this.$refs.singleChooseDevice.show({ sampleId, device, editType })
    },

    // 弹窗确认添加/修改仪器
    handleChooseDevice(params) {
      const { sampleId, device, editType } = params
      const func =
        editType === 'add' ? this.handleAddDevice : this.handleChangeDevice
      func(sampleId, device, editType)
      this.expandFirstKeys = [sampleId]
    },

    // 添加仪器
    handleAddDevice(sampleId, device) {
      this.formData.data.map((item) => {
        if (item.id === sampleId) {
          item.device.push({
            id: `${sampleId}Device${new Date().valueOf()}`,
            instrumentName: device.name,
            project: []
          })
        }
        return item
      })
    },

    // 修改仪器
    handleChangeDevice(sampleId, device, editType) {
      this.formData.data.map((item) => {
        if (item.id === sampleId) {
          item.device = item.device.map((ele) => {
            if (ele.id === editType) {
              return {
                ...ele,
                equipmentId: device.id,
                instrumentName: device.name,
                project: []
              }
            }
            return ele
          })
        }
        return item
      })
    },

    // 添加项目
    handleAddProject(row, sample, device) {
      this.formData.data.map((item) => {
        if (item.id === sample) {
          item.device.map((ele) => {
            if (ele.id === device) {
              ele.project.push({
                id: `${sample}${device}${new Date().getTime()}`
              })
            }
            return ele
          })
        }
        return item
      })
      this.expandSecondKeys = [device]
    },

    //使用时长
    serviceUseTimeHandle(index) {
      let dataList = this.formData.data.map((item) => {
        if (item.device) {
          return {
            ...item,
            device: item.device.map((e) => {
              return {
                ...e,
                serviceUseTime: this.getTotal(e.project, 'useTime')
              }
            })
          }
        } else {
          return { ...item, device: [] }
        }
      })

      if (this.formData.data[index] || dataList[index]) {
        this.$set(
          this.formData.data[index],
          'totalUseTime',
          this.getTotal(dataList[index].device, 'serviceUseTime')
        )
      }
    },

    //服务金额
    serviceAmountHandle(index) {
      let dataList = this.formData.data.map((item) => {
        if (item.device) {
          return {
            ...item,
            device: item.device.map((e) => {
              return {
                ...e,
                serviceAmount: this.getTotal(e.project, 'itemAmount')
              }
            })
          }
        } else {
          return { ...item, device: [] }
        }
      })

      if (this.formData.data[index] || dataList[index]) {
        this.$set(
          this.formData.data[index],
          'totalServiceAmount',
          this.getTotal(dataList[index].device, 'serviceAmount')
        )
      }
    },

    // 删除样品
    handleDelSample(id, i) {
      const index = this.formData.data.findIndex((item) => item.id === id)
      this.formData.data.splice(index, 1)
      this.serviceUseTimeHandle(i)
      this.serviceAmountHandle(i)
    },

    // 删除仪器
    handleDelDevice(sampleId, deviceId, index) {
      this.formData.data.map((item) => {
        if (item.id === sampleId) {
          const index = item.device.findIndex((ele) => ele.id === deviceId)
          item.device.splice(index, 1)
        }
        return item
      })
      this.serviceUseTimeHandle(index)
      this.serviceAmountHandle(index)
    },

    // 删除项目
    handleDelProject(sampleId, deviceId, projectId, index) {
      this.formData.data.map((item) => {
        if (item.id === sampleId) {
          item.device.map((ele) => {
            if (ele.id === deviceId) {
              const index = ele.project.findIndex((i) => i.id === projectId)
              ele.project.splice(index, 1)
            }
            return ele
          })
        }
        return item
      })
      this.serviceUseTimeHandle(index)
      this.serviceAmountHandle(index)
    },

    // 校验表单
    validateProjectForm() {
      return new Promise((resolve, reject) => {
        this.$refs['orderForm'].validate((valid) => {
          if (valid) {
            console.log('项目表单校验成功：', this.formData.data)
            resolve(this.formData.data)
          } else {
            reject()
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
//
.box {
  .el-form-item__error {
    position: relative;
    top: 100%;
    left: 0;
  }
}
/deep/.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 88%;
  left: 0;
}
.del {
  cursor: pointer;
}
/deep/.el-form-item {
  margin-bottom: 0;
}
.td-cell {
  height: 60px;
  padding-top: 9px;
}
.orderScope {
  padding-top: 15px;
}
</style>
