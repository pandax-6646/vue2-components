<template>
  <div class="table-layout" :class="{'m20':isMargin}">
    <breadcrumb v-if="!hideBreadcrumb" />
    <!-- 其他插槽 -->
    <slot name="other-card" />
    <el-row v-if="showCollapse" class="collapse-form">
      <el-col class="screen-box" :class="{'open':!isShrink}" :sm="isShrink ? 24 : 18" :xs="24">
        <!-- 插槽可自定义内容-->
        <slot name="screen" :is-open="isShrink" />
      </el-col>
      <el-col class="operation-region" :sm="isShrink ? 24 : 6" :xs="24">
        <el-button size="small" @click.stop="resetHandle">重置</el-button>
        <el-button size="small" type="primary" @click.stop="screenHandle">查询</el-button>
        <span v-if="isFold" class="shrink" @click="shrink">
          <span>{{ isShrink ? '收起' : '展开' }}</span>
          <i v-if="isShrink" class="el-icon-arrow-up" />
          <i v-else class="el-icon-arrow-down" />
        </span>
      </el-col>
    </el-row>
    <!-- 搜索框和表格之间的插槽 -->
    <el-row>
      <slot name="arbitrarily" />
    </el-row>
    <el-row class="table-content mt20">
      <el-card>
        <el-row>
          <slot name="table" />
        </el-row>
        <el-row v-if="!hidePagination" class="mt20" style="text-align:right">
          <el-pagination
            :page-sizes="pageSizes"
            :page-size.sync="currentSize"
            :pager-count="paginationConfig.pagerCount"
            :layout="paginationConfig.layout"
            :total="paginationTotal"
            :current-page.sync="currentPage"
            @size-change="sizeChange"
            @current-change="currentChange"
            @prev-click="prevClick"
            @next-click="nextClick"
          />
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'TableLayout',
  components: { Breadcrumb },
  props: {
    title: {
      // 折叠框标题
      type: String,
      default: '筛选查询'
    },
    pageSizes: {
      // 分页每页显示数选择
      type: Array,
      default() {
        return [10, 20, 30, 40, 50]
      }
    },
    pageSize: {
      // 分页每页显示数
      type: Number,
      default: 10
    },
    paginationTotal: {
      // 分页总数据
      type: Number,
      default: 500
    },
    hidePagination: {
      // 是否隐藏分页
      type: Boolean,
      default: false
    },
    hideBreadcrumb: {
      // 是否隐藏面包屑
      type: Boolean,
      default: false
    },
    showCollapse: {
      // 是否显示折叠框
      type: Boolean,
      default: false
    },
    isMargin: {
      // 是否需要外边距
      type: Boolean,
      default: true
    },
    isFold: {
      // 是否开启折叠
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShrink: false, // 展开和收起
      currentPage: 1, // 当前第几页
      currentSize: 10, // 当前显示数
      collapseKey: 'mian-collapse'
    }
  },
  computed: {
    // ...mapState({
    //   device: (state) => state.app.device
    // }),
    paginationConfig() {
      // 响应式控制分页器样式
      if (this.device === 'mobile') {
        return {
          pagerCount: 5,
          layout: 'prev, pager, next'
        }
      } else {
        return {
          pagerCount: 7,
          layout: 'total, sizes, prev, pager, next, jumper'
        }
      }
    }
  },
  watch: {
    pageSize: {
      handler(val) {
        this.currentSize = val
      },
      immediate: true
    }
  },
  methods: {
    shrink() {
      // 展开和收起
      this.isShrink = !this.isShrink
    },
    screenHandle() {
      // 点击查询回调
      this.resetPage()
      this.$emit('screenHandle')
    },
    resetHandle() {
      // 点击重置按钮回调
      this.currentPage = 1
      this.$emit('resetHandle')
    },
    resetPage() {
      // 重置页码
      this.currentPage = 1
      return 1
    },
    sizeChange(data) {
      // 每页条数改变时会触发
      this.antiShake()
      this.$emit('sizeChange', data)
    },
    currentChange(data) {
      // currentPage 改变时会触发
      this.antiShake()
      this.$emit('currentChange', data)
    },
    prevClick(data) {
      // 用户点击上一页按钮改变当前页后触发
      this.$emit('prevClick', data)
    },
    nextClick(data) {
      // 用户点击下一页按钮改变当前页后触发
      this.$emit('nextClick', data)
    },
    // ..............................................................................防抖处理
    antiShake() {
      if (this.shakeTimer) {
        clearTimeout(this.shakeTimer)
        this.shakeTimer = null
      }
      this.shakeTimer = setTimeout(() => {
        this.$emit('change', this.currentPage, this.currentSize)
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-layout {
  @media screen and (max-width: 992px) {
    margin: 10px;
  }

  @media screen and (max-width: 768px) {
    margin: 2px;
  }

  .el-collapse {
    border-radius: 4px;
    overflow: hidden;
  }

  >>> .el-collapse-item__content {
    padding-bottom: 0;
  }

  .collapse-title {
    margin-left: 15px;
  }

  .collapse-form {
    padding: 20px 0;
    margin-top: 20px;
    background-color: #ffffff;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .screen-box {
      padding-right: 20px;
    }

    .operation-region {
      line-height: 40px;
      text-align: right;
      padding-right: 20px;

      .shrink {
        font-size: 14px;
        color: #0474ef;
        cursor: pointer;
        margin-left: 10px;
      }
    }

    .open >>> .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
