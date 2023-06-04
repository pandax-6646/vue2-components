<template>
  <el-select
    v-model="selectValue"
    v-load-more="loadmore"
    :remote-method="remoteMethod"
    :placeholder="getPlaceholder"
    :loading="loading"
    filterable
    remote
    clearable
    value-key="id"
    popper-class="_base_info_select"
    @change="change"
  >
    <span v-if="searchKey == 'name'" slot="prefix">@</span>
    <el-option v-if="options.length" :key="searchKey" disabled :value="searchKey">
      <span class="item" style="width: 50px" :class="searchKey == 'id' ? 'red': ''">序号</span>
      <span class="item" style="width: 100px" :class="searchKey == 'name' ? 'red': ''">名字</span>
      <span class="item" :class="searchKey == 'date' ? 'red': ''">日期</span>
      <span class="item" :class="searchKey == 'address' ? 'red': ''">地址</span>
    </el-option>
    <el-option v-for="item in options" :key="item.id" :label="item[searchKey]" :value="item.id">
      <span class="item" style="width: 50px" :class="searchKey == 'id' ? 'red': ''">￥{{ item.id }}</span>
      <span
        class="item"
        style="width: 100px"
        :class="searchKey == 'name' ? 'red': ''"
      >{{ item.name }}</span>
      <span class="item" :class="searchKey == 'date' ? 'red': ''">{{ item.date }}</span>
      <el-tooltip effect="dark" :content="item.address" placement="top">
        <span class="item" :class="searchKey == 'address' ? 'red': ''">{{ item.address }}</span>
      </el-tooltip>
    </el-option>
    <div slot="empty" class="empty">
      <template v-if="!loading && !options.length">
        <div class="empty_tit">
          <i class="el-icon-warning" />
          <div>查询结果不存在！</div>
        </div>
        <div class="empty_desc">
          <div>请重新输入名字、地址等信息查找。</div>
          <div>如果还查询不到您要选择的数据，请在数据库中添加。</div>
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
  filters: {
    formatText(val, len = 16) {
      if (!val) return ' '
      return val.length > len ? `${val.slice(0, len)}...` : val
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    searchKey: {
      required: true,
      type: String
    },
    options: {
      required: true,
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
  computed: {
    getPlaceholder() {
      let placeholder = ''
      switch (this.searchKey) {
        case 'id':
          placeholder = '序号'
          break
        case 'name':
          placeholder = '名字'
          break
        case 'date':
          placeholder = '日期'
          break
        case 'address':
          placeholder = '地址'
          break
        default:
          placeholder = ''
          break
      }
      return `请输入${placeholder}`
    }
  },
  watch: {
    id(newV) {
      const row = this.options.find((item) => item.id == newV)
      this.selectValue = row && row[this.searchKey] ? newV : ''
    }
  },
  methods: {
    // 选择数据
    change(id) {
      this.$emit('change', id, this.searchKey)
    },
    // 请求数据
    remoteMethod(value, isConcatList = false) {
      if (!value) return

      let searchValue = ''
      searchValue = value

      const params = {
        page: this.page,
        limit: 10,
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
