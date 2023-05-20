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
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  /* 选择器 */
  {
    path: '/select',
    name: 'Select',
    component: Layout,
    redirect: '/select/uniconditionalQuery',
    meta: { title: '选择器', icon: 'nested' },
    children: [
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
          },
        ]
      }
    ]
  },

  /* 表格 */
  {
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

  /* 编辑器 */
  {
    path: '/editor',
    name: 'Editor',
    component: Layout,
    meta: { title: '编辑器', icon: 'edit-file' },
    redirect: '/editor/richTextEditor',
    children: [
      {
        path: 'richTextEditor',
        name: 'RichTextEditor',
        component: () => import('@/views/editor/richTextEditor'),
        meta: { title: '富文本编辑器' },
        redirect: '/editor/richTextEditor/wangeEditor',
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

  /* 文件操作 */
  {
    path: '/file',
    name: 'avatar',
    component: Layout,
    meta: { title: '文件操作', icon: 'file' },
    redirect: '/file/tableToExcel',
    children: [
      {
        path: 'tableToExcel',
        name: 'TableToExcel',
        component: () => import('@/views/file/tableToExcel/index'),
        meta: { title: '导出 table' }
      },
      
      {
        path: 'parseExcel',
        name: 'ParseExcel',
        component: () => import('@/views/file/parseExcel/index'),
        meta: { title: '解析 Excel' }
      },
      {
        path: 'domToPdf',
        name: 'DOMToPdf',
        component: () => import('@/views/file/DOMToPdf/index'),
        meta: { title: 'DOM 元素导出 PDF' },
      },
      {
        path: 'uploadAvatar',
        name: 'UploadAvatar',
        component: () => import('@/views/file/uploadAvatar/index'),
        meta: { title: '上传头像' }
      },
      {
        path: 'viewPdf',
        name: 'ViewPdf',
        component: () => import('@/views/file/viewPdf/index'),
        meta: { title: '预览Pdf' }
      }
    ]
  },

  /* 下载pdf */
  {
    path: '/file/domToPdf/downloadPdf',
    name: 'DownloadPdf',
    component: () => import('@/views/file/DOMToPdf/download'),
    hidden: true
  },

  /* 小功能组件 */
  {
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
  },

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
