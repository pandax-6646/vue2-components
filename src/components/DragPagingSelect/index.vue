<template>
  <el-select
    ref="dragSelect"
    v-model="selectIds"
    v-load-more="loadMore"
    remote
    clearable
    filterable
    :class="(multiple && dragValue) ? 'drag-select' : ''"
    reserve-keyword
    :loading="loading"
    :multiple="multiple"
    :placeholder="placeholder"
    :remote-method="remoteMethod"
  >
    <slot />
  </el-select>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'DragPagingSelect',
  props: {
    value: {
      type: [String, Array],
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键词'
    },
    loading: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    dragValue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectIds: {
      get() {
        return this.multiple ? [...this.value] : this.value
      },
      set(val) {
        this.$emit('input', this.multiple ? [...val] : val)
      }
    }
  },
  mounted() {
    if (this.multiple && this.dragValue) {
      this.setSort()
    }
  },
  methods: {
    loadMore() {
      this.$emit('loadMore')
    },
    remoteMethod(val) {
      this.$emit('remoteMethod', val)
    },

    // 拖拽函数
    setSort() {
      const el = this.$refs.dragSelect.$el.querySelectorAll(
        '.el-select__tags > span'
      )[0]
      if (!el) return
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        animation: 300, // ms, number 单位：ms，定义排序动画的时间
        setData: (dataTransfer) => {
          dataTransfer.setData('Text', '')
        },
        onEnd: (evt) => {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0]
          this.value.splice(evt.newIndex, 0, targetRow)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-select {
  ::v-deep {
    .sortable-ghost {
      opacity: 0.8;
      color: #fff !important;
      background: #42b983 !important;
    }

    .el-tag {
      cursor: pointer;
    }
  }
}
</style>
