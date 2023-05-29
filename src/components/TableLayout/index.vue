<template>
  <div class="table-layout">
    <el-card v-if="!hideBreadcrumb" class="breadcrumb mb20">
      <breadcrumb />
    </el-card>
    <!-- 其他插槽 -->
    <slot name="other-card" />

    <el-card v-if="showCollapse" class="mb20">
      <el-collapse v-model="collapseKey" class="table-screen">
        <el-collapse-item name="mian-collapse">
          <template slot="title">
            <span class="collapse-title">{{ title }}</span>
            <div class="table-screen-btn">
              <slot v-if="!hideSearch" name="header">
                <!--     插槽可自定义内容，覆盖掉默认内容       -->
                <el-button size="small" type="primary" @click.stop="screenHandle">查询</el-button>
                <el-button size="small" @click.stop="resetHandle">重置</el-button>
              </slot>
            </div>
          </template>
          <el-row class="collapse-form">
            <slot name="screen" />
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-row class="table-content">
      <el-card>
        <el-row>
          <slot name="table" />
        </el-row>
        <el-row v-if="!hidePagination" class="mt20">
          <el-pagination
            background
            :page-sizes="pageSizes"
            :page-size="currentPageSize"
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
import { mapState } from 'vuex'
import { scrollTo } from '@/utils/scroll-to'

import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: { Breadcrumb },
  props: {
    // 折叠框标题
    title: {
      type: String,
      default: '筛选查询'
    },

    // 页容量选择
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 20, 30, 40, 50]
      }
    },

    // 页容量
    pageSize: {
      type: Number,
      default: 10
    },

    // 分页总数据
    paginationTotal: {
      type: Number,
      default: 500
    },

    // 是否隐藏搜索重置按钮
    hideSearch: {
      type: Boolean,
      default: false
    },

    // 是否隐藏分页
    hidePagination: {
      type: Boolean,
      default: false
    },

    // 是否隐藏面包屑
    hideBreadcrumb: {
      type: Boolean,
      default: false
    },

    // 点击底部分页组件查询是否滚动到顶部
    autoScroll: {
      type: Boolean,
      default: true
    },

    // 滚动时间
    scrollTime: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      collapseKey: 'mian-collapse',
      currentPage: 1, // 当前第几页
      currentPageSize: 10, // 当前页容量
      showCollapse: false // 是否显示折叠框
    }
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device
    }),

    // 响应式控制分页器样式
    paginationConfig() {
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
      handler(page) {
        this.currentPageSize = page
      },
      immediate: true
    }
  },
  mounted() {
    if (this.$slots.screen) {
      this.showCollapse = true
    }
  },

  methods: {
    // 查询
    screenHandle() {
      this.currentPage = 1
      this.$emit('screenHandle')
    },

    // 重置
    resetHandle() {
      this.currentPage = 1
      this.$emit('resetHandle')
    },

    // 页容量
    sizeChange(limit) {
      this.currentPage = 1
      this.currentPageSize = limit
      this.$emit('sizeChange', limit)
    },

    // 当前页码
    currentChange(page) {
      this.$emit('currentChange', page)
      this.handleAutoScroll()
    },

    // 上一页
    prevClick(page) {
      this.$emit('prevClick', page)
      this.handleAutoScroll()
    },

    // 下一页
    nextClick(page) {
      this.$emit('nextClick', page)
      this.handleAutoScroll()
    },

    // 自动滚动
    handleAutoScroll() {
      if (this.autoScroll) {
        scrollTo(0, this.scrollTime)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-layout {
  margin: 20px;

  @media screen and (max-width: 992px) {
    margin: 10px;
  }

  @media screen and (max-width: 768px) {
    margin: 2px;
  }
  /deep/ .el-collapse-item__header {
    background-color: #eee !important;
    border-bottom: 1px solid #ebeef5;
  }
  .table-screen-btn {
    position: absolute;
    right: 100px;
  }

  .el-collapse {
    border-radius: 4px;
    overflow: hidden;
  }

  /deep/ .el-collapse-item__content {
    padding-bottom: 0;
  }

  .collapse-title {
    margin-left: 15px;
  }

  .collapse-form {
    padding: 20px 20px 0 20px;
  }

  /deep/ .breadcrumb .el-card__body {
    padding: 10px 20px 5px;
  }
}
</style>
