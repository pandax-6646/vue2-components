import Layout from '@/layout'

const editorRouter = {
  path: '/editor',
  name: 'Editor',
  component: Layout,
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
      component: () => import('@/views/editor/richTextEditor'),
      meta: {
        title: '富文本编辑器'
      },
      redirect: '/editor/richTextEditor/wangeEditor',
      children: [
        {
          path: 'wangeEditor',
          name: 'WangeEditor',
          component: () => import('@/views/editor/richTextEditor/wangeEditor'),
          meta: { title: 'wangeEditor' }
        },
        {
          path: 'tinymce',
          name: 'Tinymce',
          component: () => import('@/views/editor/richTextEditor/tinymce'),
          meta: { title: 'tinymce' }
        }
      ]
    },
    {
      path: 'jsonEditor',
      name: 'JsonEditor',
      component: () => import('@/views/editor/jsonEditor'),
      meta: { title: 'json 编辑器' }
    },
    {
      path: 'markdownEditor',
      name: 'MarkdownEditor',
      component: () => import('@/views/editor/markdownEditor'),
      meta: { title: 'markdown 编辑器' }
    }
  ]
}

export default editorRouter
