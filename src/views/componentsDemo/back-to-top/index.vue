<template>
  <div class="app-container">
    <aside>页面滚动到指定位置会在右下角出现返回顶部按钮</aside>
    <aside>可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素</aside>
    <div class="placeholder-container">
      <div v-for="i in 100" :key="i">placeholder</div>
    </div>
    <el-tooltip placement="top" content="tooltip">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="0"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
export default {
  name: 'CountTo',
  components: { BackToTop },
  data() {
    return {
      // 定制按钮样式，显示/隐藏临界点，所在位置
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1' // 按钮的背景颜色
      }
    }
  }
}
</script>
