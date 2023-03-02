
import loadMore from './loadMore/index'
import loadCascader from './loadCascader/index'
const install = function (Vue) {
  Vue.directive('loadCascader', loadCascader)
  Vue.directive('loadMore', loadMore)
}
export default install
