import Layout from '@/layout'

const authorityManagement = {
  path: '/authorityManagement',
  name: 'AuthorityManagement',
  component: Layout,
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '权限管理',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  redirect: '/authorityManagement/directive',
  children: [
    {
      path: 'directive',
      name: 'Directive',
      component: () => import('@/views/authorityManagement/directive'),
      meta: {
        title: '指令权限'
      }
    },
    {
      path: 'page',
      name: 'Page',
      component: () => import('@/views/authorityManagement/page'),
      meta: {
        title: '页面权限',
        roles: ['admin']

      }
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/authorityManagement/role'),
      meta: {
        title: '角色权限',
        roles: ['admin']
      }
    }
  ]
}

export default authorityManagement
