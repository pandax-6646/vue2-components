<template>
  <div class="app-container">
    <el-drag-select v-model="select" style="width:500px;" multiple placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-drag-select>

    <div style="margin-top:30px;margin-left: 30px;">
      <h4>选中的 id 列表</h4>
      <el-tag v-for="item of select" :key="item" style="margin-right:15px;">{{ item }}</el-tag>
    </div>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect'
export default {
  name: 'DragSelect',
  components: { ElDragSelect },
  data() {
    return {
      select: ['1', '2', '3'],
      options: [
        {
          value: '1',
          label: 'Apple'
        },
        {
          value: '2',
          label: 'Banana'
        },
        {
          value: '3',
          label: 'Orange'
        },
        {
          value: '4',
          label: 'Pear'
        },
        {
          value: '5',
          label: 'Strawberry'
        }
      ]
    }
  }
}
</script>
