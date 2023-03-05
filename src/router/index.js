import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页' }
    }]
  },

  {
    path: '/select',
    name: 'Select',
    component: Layout,
    redirect: '/select/dragSelect',
    meta: { title: '选择器', icon: 'el-icon-s-operation' },
    children: [
      {
        path: 'dragSelect',
        name: 'DragSelect',
        component: () => import('@/views/select/dragSelect/index'),
        meta: { title: '多选拖拽 select' }
      },
      {
        path: 'SingleQueryCondition',
        name: 'singleQueryCondition',
        component: () => import('@/views/select/singleQueryCondition'),
        meta: { title: '单条件分页查询' },
        children: [
          {
            path: 'pagingSelect',
            name: 'PagingSelect',
            component: () => import('@/views/select/singleQueryCondition/pagingSelect/index'),
            meta: { title: '多选 select' }
          }, {
            path: 'dragPagingSelect',
            name: 'DragPagingSelect',
            component: () => import('@/views/select/singleQueryCondition/dragPagingSelect/index'),
            meta: { title: '单、多选拖拽 select' }
          },
        ]
      },
      {
        path: 'MultipleQueryCondition',
        name: 'multipleQueryCondition',
        component: () => import('@/views/select/multipleQueryCondition'),
        meta: { title: '多条件查询' },
        children: [
          {
            path: 'tableSingleSelect',
            name: 'TableSingleSelect',
            component: () => import('@/views/select/multipleQueryCondition/tableSingleSelect/index'),
            meta: { title: '弹窗 table 单选' }
          },
          {
            path: 'tableMultipleSelect',
            name: 'TableMultipleSelect',
            component: () => import('@/views/select/multipleQueryCondition/tableMultipleSelect/index'),
            meta: { title: '弹窗 table 多选' }
          },
        ]
      }
    ]
  },

  {
    path: '/table',
    name: 'Table',
    component: Layout,
    redirect: '/table/searchTable',
    meta: { title: '表格', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'searchTable',
        name: 'SearchTable',
        component: () => import('@/views/table/searchTable/index'),
        meta: { title: '查询 table' }
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
  },

  {
    path: '/editor',
    name: 'Editor',
    component: Layout,
    meta: { title: '编辑器', icon: 'el-icon-edit-outline' },
    children: [
      {
        path: 'richTextEditor',
        name: 'RichTextEditor',
        component: () => import('@/views/editor/richTextEditor'),
        meta: { title: '富文本编辑器' },
        children: [
          {
            path: 'wangeEditor',
            name: 'WangeEditor',
            component: () => import('@/views/editor/richTextEditor/wangeEditor/index'),
            meta: { title: 'wangeEditor' }
          },
          {
            path: 'tinymce',
            name: 'Tinymce',
            component: () => import('@/views/editor/richTextEditor/tinymce/index'),
            meta: { title: 'tinymce' }
          },
        ]
      },

      {
        path: 'jsonEditor',
        name: 'jsonEditor',
        component: () => import('@/views/editor/jsonEditor/index'),
        meta: { title: 'json 编辑器' }
      },
      {
        path: 'markdownEditor',
        name: 'MarkdownEditor',
        component: () => import('@/views/editor/markdownEditor/index'),
        meta: { title: 'markdown 编辑器' }
      }
    ]
  },

  /*   {
      path: '/example',
      component: Layout,
      redirect: '/example/table',
      name: 'Example',
      meta: { title: 'Example', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'table',
          name: 'Table',
          component: () => import('@/views/table/index'),
          meta: { title: 'Table', icon: 'table' }
        },
        {
          path: 'tree',
          name: 'Tree',
          component: () => import('@/views/tree/index'),
          meta: { title: 'Tree', icon: 'tree' }
        }
      ]
    },
  
    {
      path: '/form',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'Form',
          component: () => import('@/views/form/index'),
          meta: { title: 'Form', icon: 'form' }
        }
      ]
    },
  
    {
      path: '/nested',
      component: Layout,
      redirect: '/nested/menu1',
      name: 'Nested',
      meta: {
        title: 'Nested',
        icon: 'nested'
      },
      children: [
        {
          path: 'menu1',
          component: () => import('@/views/nested/menu1/index'), // Parent router-view
          name: 'Menu1',
          meta: { title: 'Menu1' },
          children: [
            {
              path: 'menu1-1',
              component: () => import('@/views/nested/menu1/menu1-1'),
              name: 'Menu1-1',
              meta: { title: 'Menu1-1' }
            },
            {
              path: 'menu1-2',
              component: () => import('@/views/nested/menu1/menu1-2'),
              name: 'Menu1-2',
              meta: { title: 'Menu1-2' },
              children: [
                {
                  path: 'menu1-2-1',
                  component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                  name: 'Menu1-2-1',
                  meta: { title: 'Menu1-2-1' }
                },
                {
                  path: 'menu1-2-2',
                  component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                  name: 'Menu1-2-2',
                  meta: { title: 'Menu1-2-2' }
                }
              ]
            },
            {
              path: 'menu1-3',
              component: () => import('@/views/nested/menu1/menu1-3'),
              name: 'Menu1-3',
              meta: { title: 'Menu1-3' }
            }
          ]
        },
        {
          path: 'menu2',
          component: () => import('@/views/nested/menu2/index'),
          name: 'Menu2',
          meta: { title: 'menu2' }
        }
      ]
    },
  
    {
      path: 'external-link',
      component: Layout,
      children: [
        {
          path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
          meta: { title: 'External Link', icon: 'link' }
        }
      ]
    }, */

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
