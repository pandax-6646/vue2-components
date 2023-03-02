// 注册滚动条加载触发事件v-loadCascader绑定
export default {
  inserted(el, binding) {
    const cascaderDom = el.querySelector(
      ".el-cascader__dropdown .el-cascader-menu__wrap"// 滚动条所在元素
    );
    if (cascaderDom) {
      cascaderDom.addEventListener("scroll", function () {
        const condition =
          this.scrollHeight - this.scrollTop <= this.clientHeight;
        if (condition) {
          let temp = this.scrollTop;
          binding.value();
          setTimeout(() => {
            this.scrollTop = temp + 100;// 滚动加载更多时，显示的数据在上次位置基础上往上滑动100
          }, 0)
        }
      })
    }
  }
}