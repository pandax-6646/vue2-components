<template>
  <div class>
    <node-box />
  </div>
</template>

<script>
import NodeBox from './components/NodeBox'
import NodeDetail from './components/NodeDetail'
export default {
  name: 'ProcessNode',
  components: {
    NodeBox,
    NodeDetail
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
</style>
