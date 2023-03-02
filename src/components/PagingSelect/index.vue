<template>
  <el-select
    v-model="selectIds"
    v-load-more="loadMore"
    multiple
    filterable
    remote
    reserve-keyword
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
    clearable
  >
    <slot />
  </el-select>
</template>

<script>
export default {
  name: 'index',
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索关键词'
    },
    value: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectIds: {
      get() {
        return [...this.value]
      },
      set(val) {
        this.$emit('input', [...val])
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    loadMore() {
      this.$emit('loadMore')
    },
    remoteMethod(val) {
      this.$emit('remoteMethod', val)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
