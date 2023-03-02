<template>
  <el-select
    multiple
    clearable
    ref="dragSelect"
    class="drag-select"
    v-model="selectVal"
    :placeholder="placeholder"
  >
    <slot />
  </el-select>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'DragSelect',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  computed: {
    selectVal: {
      get() {
        return [...this.value]
      },
      set(val) {
        this.$emit('input', [...val])
      }
    }
  },
  mounted() {
    this.setSort()
  },
  methods: {
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
