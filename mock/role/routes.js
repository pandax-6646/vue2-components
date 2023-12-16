// Just a mock data

const constantRoutes = [
  {
    path: '/',
    component: 'Layout',
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/select',
    name: 'Select',
    component: 'layout/Layout',
    redirect: '/select/uniconditionalQuery',
    meta: { title: '选择器', icon: 'nested' },
    children: [
      {
        path: 'linkageSelection',
        name: 'LinkageSelection',
        meta: { title: '联动选择' }
      },
      {
        path: 'uniconditionalQuery',
        name: 'UniconditionalQuery',
        redirect: '/select/uniconditionalQuery/radioPaging',
        meta: { title: '单条件查询' },
        children: [
          {
            path: 'radioPaging',
            name: 'RadioPaging',
            meta: { title: '单选分页 select' }
          },
          {
            path: 'dragMultiplePaging',
            name: 'DragMultiplePaging',
            meta: { title: '多选分页拖拽 select' }
          }
        ]
      },
      {
        path: 'multiConditionQuery',
        name: 'MultiConditionQuery',
        redirect: '/select/multiConditionQuery/tableSingleSelect',
        meta: { title: '多条件查询' },
        children: [
          {
            path: 'tableSingleSelect',
            name: 'TableSingleSelect',
            meta: { title: '弹窗 table 单选' }
          },
          {
            path: 'tableMultipleSelect',
            name: 'TableMultipleSelect',
            meta: { title: '弹窗 table 多选' }
          }
        ]
      }
    ]
  },
  {
    path: '/table',
    name: 'Table',
    component: 'Layout',
    redirect: '/table/searchTable',
    meta: { title: '表格', icon: 'table' },
    children: [
      {
        path: 'searchTable',
        name: 'SearchTable',
        meta: { title: '查询 table' }
      },
      {
        path: 'mergeTable',
        name: 'MergeTable',
        meta: { title: '合并 table' }
      },
      {
        path: 'customTableHand',
        name: 'CustomTableHand',
        meta: { title: '自定义 table 表头' }
      },
      {
        path: 'treeTable',
        name: 'sreeTable',
        meta: { title: '树形 table 填写' }
      },
      {
        path: 'profiledTable',
        name: 'ProfiledTable',
        meta: { title: '异形 table 填写' }
      }
    ]
  },
  {
    path: '/file',
    name: 'avatar',
    component: 'Layout',
    meta: { title: '文件操作', icon: 'file' },
    redirect: '/file/tableToExcel',
    children: [
      {
        path: 'tableToExcel',
        name: 'TableToExcel',
        meta: { title: '导出 table' }
      },

      {
        path: 'parseExcel',
        name: 'ParseExcel',
        meta: { title: '解析 Excel' }
      },
      {
        path: 'domToPdf',
        name: 'DOMToPdf',
        meta: { title: 'DOM 元素导出 PDF' }
      },
      {
        path: 'uploadAvatar',
        name: 'UploadAvatar',
        meta: { title: '上传头像' }
      },
      {
        path: 'viewPdf',
        name: 'ViewPdf',
        meta: { title: '预览Pdf' }
      }
    ]
  },
  {
    path: '/componentsDemo',
    name: 'ComponentsDemo',
    component: 'Layout',
    redirect: '/componentsDemo/count-to',
    meta: { title: '小功能组件', icon: 'component' },
    children: [
      {
        path: 'clipboard',
        name: 'ClipboardDemo',
        meta: { title: '复制文本' }
      },
      {
        path: 'processNode',
        name: 'ProcessNode',
        meta: { title: '流程节点' }
      },
      {
        path: 'count-to',
        name: 'CountToDemo',
        meta: { title: '数字滚动' }
      },
      {
        path: 'back-to-top',
        name: 'BackToTopDemo',
        meta: { title: '返回顶部' }
      },
      {
        path: 'drag-dialog',
        name: 'DragDialogDemo',
        meta: { title: '可拖拽弹窗' }
      },
      {
        path: 'drag-list',
        name: 'DragKanbanDemo',
        meta: { title: '可拖拽列表' }
      },
      {
        path: 'icons',
        name: 'Icons',
        meta: { title: '图标', noCache: true }
      },
      {
        path: 'echarts',
        name: 'Echarts',
        meta: { title: '数据图' }
      }
    ]
  }

]
const asyncRoutes = [
  {
    path: '/editor',
    name: 'Editor',
    component: 'Layout',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '编辑器',
      icon: 'edit-file',
      roles: ['admin'] // you can set roles in root nav
    },
    redirect: '/editor/richTextEditor',
    children: [
      {
        path: 'richTextEditor',
        name: 'RichTextEditor',
        meta: {
          title: '富文本编辑器'
        },
        redirect: '/editor/richTextEditor/wangeEditor',
        children: [
          {
            path: 'wangeEditor',
            name: 'WangeEditor',
            meta: { title: 'wangeEditor' }
          },
          {
            path: 'tinymce',
            name: 'Tinymce',
            meta: { title: 'tinymce' }
          }
        ]
      },
      {
        path: 'jsonEditor',
        name: 'JsonEditor',
        meta: { title: 'json 编辑器' }
      },
      {
        path: 'markdownEditor',
        name: 'MarkdownEditor',
        meta: { title: 'markdown 编辑器' }
      }
    ]
  },

  {
    path: '/authorityManagement',
    name: 'AuthorityManagement',
    component: 'Layout',
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
        meta: {
          title: '指令权限'
        }
      },
      {
        path: 'page',
        name: 'Page',
        meta: {
          title: '页面权限',
          roles: ['admin']

        }
      },
      {
        path: 'role',
        name: 'Role',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
