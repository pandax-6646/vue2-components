<template>
  <div class="app-container">
    <h2>原始表格</h2>
    <el-table border style="margin-top: 50px;" :data="originData">
      <el-table-column label="题型" property="type" align="center" />
      <el-table-column label="数量" property="num" align="center" />
      <el-table-column label="均分" property="average" align="center" />
    </el-table>

    <h2>左侧表头</h2>
    <custom-table :left-title="leftTitle" :origin-data="originData" :top-title="topTitle" />

    <h2>左侧和顶部表头</h2>
    <custom-table
      :left-title="leftTitle"
      :origin-data="originData"
      :top-title="topTitle"
      is-show-header
    />
  </div>
</template>

<script>
import CustomTable from './components/CustomTable'
export default {
  name: 'CustomTableHand',
  components: { CustomTable },
  data() {
    return {
      originData: [
        {
          type: '选择题',
          num: '5题',
          average: '3分/题'
        },
        {
          type: '填空题',
          num: '5题',
          average: '3分/题'
        },
        {
          type: '选择题',
          num: '2题',
          average: '10分/题'
        },
        {
          type: '选择sdf题',
          num: '2sdf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        },
        {
          type: '选择ssddf题',
          num: '2sddf题',
          average: '10sdf分/题'
        }
      ],
      leftTitle: ['题型', '数量', '均分'],
      topTitle: []
    }
  },

  created() {
    this.topTitle = this.originData.map((item, index) => `学生${index + 1}`)
    this.topTitle.unshift('')
  },
  methods: {
    deleteRow() {}
  }
}
</script>
