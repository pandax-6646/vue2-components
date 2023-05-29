
import loadMore from './loadMore/index'
import loadCascader from './loadCascader/index'
import elDragDialog from './elDragDialog/index'
import clipboard from './clipboard/index'
const install = function(Vue) {
  Vue.directive('loadCascader', loadCascader)
  Vue.directive('loadMore', loadMore)
  Vue.directive('elDragDialog', elDragDialog)
  Vue.directive('clipboard', clipboard)
}
export default install
