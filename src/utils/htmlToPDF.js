import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

/**
 * 导出为pdf文件
 * @param {*} element 选中的dom元素
 * @param {*} pdfTitle pdf的title
 * 另：这里可以更改背景色，其他的样式设置 以 元素的css为准
 */
export const getPdf = async(element, pdfTitle, param = {}) => {
  if (param.type && param.type === 'zip') {
    const zip = new JSZip()
    const imgs = []
    let count = 0

    param.selectedRowKeys.forEach((item, i) => {
      const width = element[i].clientWidth // 获取dom 宽度
      const height = element[i].clientHeight
      const canvas = document.createElement('canvas') // 创建一个canvas节点
      const scale = 1 // 定义任意放大倍数 支持小数
      canvas.width = width * scale // 定义canvas 宽度 * 缩放
      canvas.height = height * scale // 定义canvas高度 *缩放
      canvas.style.width = element[i].clientWidth * scale + 'px'
      canvas.style.height = element[i].clientHeight * scale + 'px'
      canvas.getContext('2d').scale(scale, scale)
      const opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, // 自定义 canvas
        logging: false, // 日志开关，便于查看html2canvas的内部执行流程
        width: width, // dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
      }
      html2Canvas(element[i], opts).then((canvas) => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        // 一页pdf显示html页面生成的canvas高度;
        const pageHeight = contentWidth / 592.28 * 841.89

        // 原始的canvas的html高度
        let leftHeight = contentHeight
        let position = 0
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 595.28

        // 根据页面的长宽，换算pdf的高度
        const imgHeight = 592.28 / contentWidth * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1)
        const PDF = new JsPDF('', 'pt', 'a4')
        // 表示未超过一页
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          // 有多页的情况
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        zip.file(`${param.fileName}${i + 1}.pdf`, PDF.output('blob'))
        imgs.push(true)
        count++
        if (count === param.selectedRowKeys.length) {
          if (imgs.every((item) => item === true)) {
            zip.generateAsync({ type: 'blob' }).then((content) => { // 异步去打包下载canvas
              saveAs(content, param.fileName + '.zip')
              if (param.cb)param.cb()
            })
          }
        }
      })
    })
  } else {
    const width = element.clientWidth // 获取dom 宽度
    const height = element.clientHeight //
    const canvas = document.createElement('canvas') // 创建一个canvas节点
    const scale = 1 // 定义任意放大倍数 支持小数
    canvas.width = width * scale // 定义canvas 宽度 * 缩放
    canvas.height = height * scale // 定义canvas高度 *缩放
    canvas.style.width = element.clientWidth * scale + 'px'
    canvas.style.height = element.clientHeight * scale + 'px'
    canvas.getContext('2d').scale(scale, scale)
    const opts = {
      scale: scale, // 添加的scale 参数
      canvas: canvas, // 自定义 canvas
      logging: false, // 日志开关，便于查看html2canvas的内部执行流程
      width: width, // dom 原始宽度
      height: height,
      useCORS: true // 【重要】开启跨域配置
    }

    const canv = await html2Canvas(element, opts)
    const contentWidth = canv.width
    const contentHeight = canv.height

    // 一页pdf显示html页面生成的canvas高度;
    const pageHeight = contentWidth / 592.28 * 841.89

    // 原始的canvas的html高度
    let leftHeight = contentHeight
    let position = 0

    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 595.28

    // 根据页面的长宽，换算pdf的高度
    const imgHeight = 592.28 / contentWidth * contentHeight
    const pageData = canv.toDataURL('image/jpeg', 1)

    const PDF = new JsPDF('', 'pt', 'a4')
    // 表示未超过一页
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      // 有多页的情况
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }

    PDF.save(`${pdfTitle}.pdf`)
    return new Promise((resolve) => {
      resolve()
    })
  }
}

/**
 * 导出为png
 * @param {*} element
 * @param {*} title
 */
export const getPng = (element, title) => {
  const a = document.createElement('a')
  html2Canvas(element).then((canvas) => {
    const dom = document.body.appendChild(canvas)
    dom.style.display = 'none'
    a.style.display = 'none'
    document.body.removeChild(dom)
    const blob = dataURLToBlob(dom.toDataURL('image/png'))
    a.setAttribute('href', URL.createObjectURL(blob))
    a.setAttribute('download', `${title}.png`)
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(blob)
    document.body.removeChild(a)
  })
}

export const dataURLToBlob = (dataurl) => { // ie 图片转格式
  const arr = dataurl.split(','); const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1]); let n = bstr.length; const
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
