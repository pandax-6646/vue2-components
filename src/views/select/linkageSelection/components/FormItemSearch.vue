<template>
  <el-select
    v-model="selectValue"
    :remote-method="remoteMethod"
    :placeholder="getPlaceholder"
    :loading="loading"
    filterable
    remote
    v-load-more="loadmore"
    clearable
    @change="change"
    value-key="recordId"
    popper-class="_base_info_select"
    :disabled="searchKey == 'je'"
  >
    <span slot="prefix" v-if="searchKey == 'je'">￥</span>
    <el-option disabled :key="searchKey" :value="searchKey" v-if="options.length">
      <span class="item" :class="searchKey == 'zcbh' ? 'red': ''">资产编号</span>
      <span class="item" :class="searchKey == 'zcmc' ? 'red': ''">仪器名称</span>
      <span class="item" :class="searchKey == 'xh' ? 'red': ''">品牌/型号</span>
      <span class="item" :class="searchKey == 'je' ? 'red': ''">仪器原值</span>
      <span class="item" style="width: 80px" :class="searchKey == 'sfjk' ? 'red': ''">是否进口</span>
      <span class="item" style="width: 100px" :class="searchKey == 'syrmc' ? 'red': ''">使用人</span>
      <span class="item" :class="searchKey == 'sydwmc' ? 'red': ''">使用部门</span>
      <span class="item" style="width: 100px" :class="searchKey == 'glr' ? 'red': ''">资产管理员</span>
      <span class="item" :class="searchKey == 'gzrq' ? 'red': ''">购置日期</span>
      <span class="item" :class="searchKey == 'cfdmc' ? 'red': ''">放置地址</span>
    </el-option>
    <el-option
      v-for="item in options"
      :key="item.recordId"
      :label="item[searchKey]"
      :value="item.recordId"
    >
      <span class="item" :class="searchKey == 'zcbh' ? 'red': ''">{{ item.zcbh }}</span>
      <el-tooltip effect="dark" :content="item.zcmc" placement="top">
        <span class="item" :class="searchKey == 'zcmc' ? 'red': ''">{{ item.zcmc }}</span>
      </el-tooltip>
      <el-tooltip effect="dark" :content="item.xh" placement="top">
        <span class="item" :class="searchKey == 'xh' ? 'red': ''">{{ item.xh }}</span>
      </el-tooltip>
      <span class="item" :class="searchKey == 'je' ? 'red': ''">￥{{ item.je }}</span>
      <span
        class="item"
        style="width: 80px"
        :class="searchKey == 'sfjk' ? 'red': ''"
      >{{ item.sfjk }}</span>
      <span
        class="item"
        style="width: 100px"
        :class="searchKey == 'syrmc' ? 'red': ''"
      >{{ item.syrmc }}</span>
      <el-tooltip effect="dark" :content="item.sydwmc" placement="top">
        <span class="item" :class="searchKey == 'sydwmc' ? 'red': ''">{{ item.sydwmc }}</span>
      </el-tooltip>
      <span class="item" style="width: 100px" :class="searchKey == 'glr' ? 'red': ''">{{ item.glr }}</span>
      <span class="item" :class="searchKey == 'gzrq' ? 'red': ''">{{ item.gzrq }}</span>
      <el-tooltip effect="dark" :content="item.cfdmc" placement="top">
        <span class="item" :class="searchKey == 'cfdmc' ? 'red': ''">{{ item.cfdmc }}</span>
      </el-tooltip>
    </el-option>
    <div slot="empty" class="empty">
      <template v-if="!loading && !options.length">
        <div class="empty_tit">
          <i class="el-icon-warning" />
          <div>查询结果不存在！</div>
        </div>
        <div class="empty_desc">
          <div>请重新输入资产编号或仪器名称、品牌/型号等信息查找。</div>
          <div>如果还查询不到您要报修的仪器，请咨询设备处处理。</div>
        </div>
      </template>
      <div v-else-if="loading" class="loading">
        <i class="el-icon-loading" />
        <span class="text">加载中</span>
      </div>
    </div>
  </el-select>
</template>

<script>
export default {
  name: 'FormItemSearch',
  props: {
    recordId: {
      type: String,
      default: ''
    },
    searchKey: {
      require: true,
      type: String
    },
    options: {
      type: Array
    },
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyName: '', // 查询文本
      selectValue: '', // 选中的数据,
      page: 1
    }
  },
  watch: {
    recordId(newV) {
      const row = this.options.find((item) => item.recordId == newV)
      this.selectValue = row && row[this.searchKey] ? newV : ''
    }
  },
  filters: {
    formatText(val, len = 16) {
      if (!val) return ' '
      return val.length > len ? `${val.slice(0, len)}...` : val
    }
  },
  computed: {
    getPlaceholder() {
      let placeholder = ''
      switch (this.searchKey) {
        case 'zcbh':
          placeholder = '资产编号'
          break
        case 'zcmc':
          placeholder = '仪器名称'
          break
        case 'xh':
          placeholder = '品牌/型号'
          break
        case 'je':
          placeholder = '仪器原值'
          break
        case 'sfjk':
          placeholder = '是否进口'
          break
        case 'syrmc':
          placeholder = '使用人'
          break
        case 'sydwmc':
          placeholder = '使用部门'
          break
        case 'glr':
          placeholder = '资产管理员'
          break
        case 'gzrq':
          placeholder = '购置日期'
          break
        case 'cfdmc':
          placeholder = '放置地址'
          break
        default:
          placeholder = ''
          break
      }
      return `请输入${placeholder}`
    }
  },
  methods: {
    // 选择数据
    change(recordId) {
      this.$emit('change', recordId, this.searchKey)
    },
    // 请求数据
    remoteMethod(value, isConcatList = false) {
      if (!value) return

      let searchValue = ''
      searchValue = value

      const params = {
        page: this.page,
        pageSize: 10,
        parameter: {
          [`${this.searchKey}`]: searchValue
        }
      }
      // 重新查询置空列表
      if (this.keyName != value) {
        this.page = 1
      }

      this.keyName = value
      this.$emit('remoteMethod', params, isConcatList)
    },

    // 加载更多
    loadmore() {
      this.page++
      const value = this.keyName
      this.remoteMethod(value, true)
    }
  }
}
</script>

<style scoped lang="scss">
.empty {
  height: 130px;
  padding: 20px;
  box-sizing: border-box;
  .empty_tit {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: bold;
    .el-icon-warning {
      color: #f1330d;
      margin-right: 20px;
    }
  }
  .empty_desc {
    font-size: 14px;
    text-align: center;
    line-height: 20px;
  }
}
.item {
  display: inline-block;
  width: 150px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.loading {
  text-align: center;
  font-size: 14px;
  line-height: 100px;
  .text {
    margin-left: 10px;
  }
}
.red {
  color: red;
}
</style>
