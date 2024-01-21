import Layout from '@/layout'

const fileRouter = {
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
      meta: { title: 'DOM 元素导出 PDF' }
    },
    {
      path: 'uploadAvatar',
      name: 'UploadAvatar',
      component: () => import('@/views/file/uploadAvatar/index'),
      meta: { title: '上传头像' }
    },
    {
      path: 'viewFile',
      name: 'ViewFile',
      component: () => import('@/views/file/viewFile/index'),
      meta: { title: '预览文件' }
    }
  ]
}
export default fileRouter
