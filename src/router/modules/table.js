import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  name: 'Table',
  component: Layout,
  redirect: '/table/searchTable',
  meta: { title: '表格', icon: 'table' },
  children: [
    {
      path: 'searchTable',
      name: 'SearchTable',
      component: () => import('@/views/table/searchTable/index'),
      meta: { title: '查询 table' }
    },
    {
      path: 'mergeTable',
      name: 'MergeTable',
      component: () => import('@/views/table/mergeTable/index'),
      meta: { title: '合并 table' }
    },
    {
      path: 'customTableHand',
      name: 'CustomTableHand',
      component: () => import('@/views/table/customTableHand/index'),
      meta: { title: '自定义 table 表头' }
    },
    {
      path: 'treeTable',
      name: 'sreeTable',
      component: () => import('@/views/table/treeTable/index'),
      meta: { title: '树形 table 填写' }
    },
    {
      path: 'profiledTable',
      name: 'ProfiledTable',
      component: () => import('@/views/table/profiledTable/index'),
      meta: { title: '异形 table 填写' }
    }
  ]
}

export default tableRouter
