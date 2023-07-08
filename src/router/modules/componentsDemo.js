import Layout from '@/layout'

const componentsDemoRouter = {
  path: '/componentsDemo',
  name: 'ComponentsDemo',
  component: Layout,
  redirect: '/componentsDemo/count-to',
  meta: { title: '小功能组件', icon: 'component' },
  children: [
    {
      path: 'clipboard',
      component: () => import('@/views/componentsDemo/clipboard'),
      name: 'ClipboardDemo',
      meta: { title: '复制文本' }
    },
    {
      path: 'processNode',
      name: 'ProcessNode',
      component: () => import('@/views/componentsDemo/processNode'),
      meta: { title: '流程节点' }
    },
    {
      path: 'count-to',
      component: () => import('@/views/componentsDemo/count-to'),
      name: 'CountToDemo',
      meta: { title: '数字滚动' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/componentsDemo/back-to-top'),
      name: 'BackToTopDemo',
      meta: { title: '返回顶部' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/componentsDemo/drag-dialog'),
      name: 'DragDialogDemo',
      meta: { title: '可拖拽弹窗' }
    },
    {
      path: 'drag-list',
      component: () => import('@/views/componentsDemo/drag-list'),
      name: 'DragKanbanDemo',
      meta: { title: '可拖拽列表' }
    },
    {
      path: 'icons',
      component: () => import('@/views/componentsDemo/icons'),
      name: 'Icons',
      meta: { title: '图标', noCache: true }
    },
    {
      path: 'echarts',
      component: () => import('@/views/componentsDemo/echarts'),
      name: 'Echarts',
      meta: { title: '数据图' }
    }
  ]
}

export default componentsDemoRouter
