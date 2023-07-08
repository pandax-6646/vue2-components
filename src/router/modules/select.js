import Layout from '@/layout'

const selectRouter = {
  path: '/select',
  name: 'Select',
  component: Layout,
  redirect: '/select/uniconditionalQuery',
  meta: { title: '选择器', icon: 'nested' },
  children: [
    {
      path: 'linkageSelection',
      name: 'LinkageSelection',
      component: () => import('@/views/select/linkageSelection'),
      meta: { title: '联动选择' }
    },
    {
      path: 'uniconditionalQuery',
      name: 'UniconditionalQuery',
      component: () => import('@/views/select/uniconditionalQuery'),
      redirect: '/select/uniconditionalQuery/radioPaging',
      meta: { title: '单条件查询' },
      children: [
        {
          path: 'radioPaging',
          name: 'RadioPaging',
          component: () => import('@/views/select/uniconditionalQuery/radioPaging/index'),
          meta: { title: '单选分页 select' }
        },
        {
          path: 'dragMultiplePaging',
          name: 'DragMultiplePaging',
          component: () => import('@/views/select/uniconditionalQuery/dragMultiplePaging/index'),
          meta: { title: '多选分页拖拽 select' }
        }
      ]
    },
    {
      path: 'multiConditionQuery',
      name: 'MultiConditionQuery',
      component: () => import('@/views/select/multiConditionQuery'),
      redirect: '/select/multiConditionQuery/tableSingleSelect',
      meta: { title: '多条件查询' },
      children: [
        {
          path: 'tableSingleSelect',
          name: 'TableSingleSelect',
          component: () => import('@/views/select/multiConditionQuery/tableSingleSelect/index'),
          meta: { title: '弹窗 table 单选' }
        },
        {
          path: 'tableMultipleSelect',
          name: 'TableMultipleSelect',
          component: () => import('@/views/select/multiConditionQuery/tableMultipleSelect/index'),
          meta: { title: '弹窗 table 多选' }
        }
      ]
    }
  ]
}

export default selectRouter
