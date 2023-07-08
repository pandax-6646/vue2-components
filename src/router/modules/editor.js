import Layout from '@/layout'

const editorRouter = {
  path: '/editor',
  name: 'Editor',
  component: Layout,
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '编辑器',
    icon: 'edit-file',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  redirect: '/editor/richTextEditor',
  children: [
    {
      path: 'richTextEditor',
      name: 'RichTextEditor',
      component: () => import('@/views/editor/richTextEditor'),
      meta: {
        title: '富文本编辑器',
        roles: ['admin'] // or you can only set roles in sub nav
      },
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
        }
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
}

export default editorRouter
