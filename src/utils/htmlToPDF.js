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

// ie 图片转格式
export const dataURLToBlob = (dataurl) => {
  const arr = dataurl.split(','); const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1]); let n = bstr.length; const
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * 导出为pdf文件，多页可防止文本截断
 * @param {string} domId dom元素的id
 * @param {string} pdfTitle pdf的文件名称
 */

export const getPdfPage = async(domId, pdfName) => {
  const element = document.getElementById(domId) // 这个dom元素是要导出pdf的div容器
  const w = element.offsetWidth // 获得该容器的宽
  const h = element.offsetWidth // 获得该容器的高
  const { offsetTop } = element // 获得该容器到文档顶部的距离
  const { offsetLeft } = element // 获得该容器到文档最左的距离
  const canvas = document.createElement('canvas')
  let abs = 0
  const winI = document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
  const winO = window.innerWidth // 获得当前窗口的宽度（包含滚动条）
  if (winO > winI) {
    abs = (winO - winI) / 2 // 获得滚动条长度的一半
  }
  canvas.width = w * 2 // 将画布宽&&高放大两倍
  canvas.height = h * 2
  const context = canvas.getContext('2d', { willReadFrequently: true })
  context.scale(2, 2)
  context.translate(-offsetLeft - abs, -offsetTop)
  await html2Canvas(element, {
    allowTaint: true,
    scale: 2, // 提升画面质量，但是会增加文件大小
    useCORS: true,
    background: '#FFFFFF' // 如果指定的div没有设置背景色会默认成黑色,这里是个坑
    // tslint:disable-next-line:no-shadowed-variable
    // eslint-disable-next-line no-shadow
  }).then((canvas) => {
    // 未生成pdf的html页面高度
    let leftHeight = canvas.height

    const a4Width = 594.28 // 595.28,写小是纸的内容要完全在canvas里
    const a4Height = 841.89 // A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
    // 一页pdf显示html页面生成的canvas高度;
    const a4HeightRef = Math.floor((canvas.width / a4Width) * a4Height)

    // pdf页面偏移
    let position = 0

    const pageData = canvas.toDataURL('image/jpeg', 1.0)

    let index = 1
    const canvas1 = document.createElement('canvas')
    let height
    const pdf = new JsPDF('', 'pt', 'a4')
    pdf.setDisplayMode('fullwidth', 'continuous', 'FullScreen')

    function createImpl(paramsCanvas) {
      // console.log(leftHeight, a4HeightRef)
      if (leftHeight > 0) {
        index += 1
        let checkCount = 0
        if (leftHeight > a4HeightRef) {
          let i
          for (i = position + a4HeightRef; i >= position; i -= 1) {
            let isWrite = true
            for (let j = 0; j < paramsCanvas.width; j += 1) {
              const c = paramsCanvas.getContext('2d', { willReadFrequently: true }).getImageData(j, i, 1, 1).data

              if (c[0] !== 0xff || c[1] !== 0xff || c[2] !== 0xff) {
                isWrite = false
                break
              }
            }
            if (isWrite) {
              checkCount += 1
              if (checkCount >= 10) {
                break
              }
            } else {
              checkCount = 0
            }
          }
          height = Math.round(i - position) || Math.min(leftHeight, a4HeightRef)
          if (height <= 0) {
            height = a4HeightRef
          }
        } else {
          height = leftHeight
        }

        canvas1.width = paramsCanvas.width
        canvas1.height = height

        //  console.log(index, 'height:', height, 'pos', position)
        const ctx = canvas1.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(paramsCanvas, 0, position, paramsCanvas.width, height, 0, 0, paramsCanvas.width, height)

        //  const pageHeight = Math.round((a4Width / canvas.width) * height)
        // pdf.setPageSize(null, pageHeight)
        if (position !== 0) {
        //  console.log("最后的位置", position)
          pdf.addPage()
        }
        if (index === 2) {
          // 有分页的时候，第一页时候，index===2,保证首页不需要有偏移量。而从第二页起，上下偏移60，该值由不发生文本被截断为准
          pdf.addImage(canvas1.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, a4Width, (a4Width / canvas1.width) * height)
        } else {
          pdf.addImage(canvas1.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 60, a4Width, (a4Width / canvas1.width) * height)
        }

        // eslint-disable-next-line no-const-assign
        leftHeight -= height
        position += height
        if (leftHeight > 0) {
          // console.log("leftHeight", leftHeight)
          createImpl(paramsCanvas)
        } else {
          pdf.save(pdfName + '.pdf')
        }
      }
    }

    // 当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < a4HeightRef) {
      pdf.addImage(pageData, 'JPEG', 0, 0, a4Width, (a4Width / canvas.width) * leftHeight)
    } else {
      try {
        pdf.deletePage(0)
        createImpl(canvas)
      } catch (err) {
        console.log(err)
      }
    }
  })
}

/*
* 使用说明
* ele:需要导出pdf的容器元素(dom节点 不是id)
* pdfFileName: 导出文件的名字 通过调用outPutPdfFn方法也可传参数改变
* splitClassName: 避免分段截断的类名 当pdf有多页时需要传入此参数 , 避免pdf分页时截断元素  如表格<tr class="itemClass"></tr>
* 调用方式 先 let pdf = new PdfLoader(ele, 'pdf' ,'itemClass');
* 若想改变pdf名称 pdf.outPutPdfFn(fileName);  outPutPdfFn方法返回一个promise 可以使用then方法处理pdf生成后的逻辑
* */
class PdfLoader {
  constructor(ele, pdfFileName, splitClassName) {
    this.ele = ele
    this.pdfFileName = pdfFileName
    this.splitClassName = splitClassName
    this.A4_WIDTH = 595
    this.A4_HEIGHT = 842
  }

  async getPDF(resolve) {
    const ele = this.ele
    const pdfFileName = this.pdfFileName
    const eleW = ele.offsetWidth// 获得该容器的宽
    const eleH = ele.scrollHeight// 获得该容器的高
    const eleOffsetTop = ele.offsetTop// 获得该容器到文档顶部的距离
    const eleOffsetLeft = ele.offsetLeft// 获得该容器到文档最左的距离
    const canvas = document.createElement('canvas')
    let abs = 0
    const win_in = document.documentElement.clientWidth || document.body.clientWidth// 获得当前可视窗口的宽度（不包含滚动条）
    const win_out = window.innerWidth// 获得当前窗口的宽度（包含滚动条）
    if (win_out > win_in) {
      abs = (win_out - win_in) / 2// 获得滚动条宽度的一半
    }
    canvas.width = eleW * 2// 将画布宽&&高放大两倍
    canvas.height = eleH * 2
    const context = canvas.getContext('2d')
    context.scale(2, 2) // 增强图片清晰度
    context.translate(-eleOffsetLeft - abs, -eleOffsetTop)
    html2Canvas(ele, {
      useCORS: true// 允许canvas画布内可以跨域请求外部链接图片, 允许跨域请求。
    }).then(async canvas => {
      const contentWidth = canvas.width
      const contentHeight = canvas.height
      // 一页pdf显示html页面生成的canvas高度;
      const pageHeight = (contentWidth / this.A4_WIDTH) * this.A4_HEIGHT // 这样写的目的在于保持宽高比例一致 pageHeight/canvas.width = a4纸高度/a4纸宽度// 宽度和canvas.width保持一致
      // 未生成pdf的html页面高度
      let leftHeight = contentHeight
      // 页面偏移
      let position = 0
      // a4纸的尺寸[595,842],单位像素，html页面生成的canvas在pdf中图片的宽高
      const imgWidth = this.A4_WIDTH - 10 // -10为了页面有右边距
      const imgHeight = (this.A4_WIDTH / contentWidth) * contentHeight
      const pageData = canvas.toDataURL('image/jpeg', 1.0)
      const pdf = JsPDF('', 'pt', 'a4')
      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
        // pdf.addImage(pageData, "JPEG", 5, 0, imgWidth, imgHeight)
        pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight)
      } else {
        // 分页
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 5, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= this.A4_HEIGHT
          // 避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage()
          }
        }
      }
      pdf.save(pdfFileName + '.pdf', { returnPromise: true }).then(() => {
        // 去除添加的空div 防止页面混乱
        const doms = document.querySelectorAll('.emptyDiv')
        for (let i = 0; i < doms.length; i++) {
          doms[i].remove()
        }
      })
      this.ele.style.height = ''
      resolve()
    })
  }

  async outPutPdfFn(pdfFileName) {
    return new Promise((resolve, reject) => {
      this.ele.style.height = 'initial'
      pdfFileName ? this.pdfFileName = pdfFileName : null
      const target = this.ele
      const pageHeight = target.scrollWidth / this.A4_WIDTH * this.A4_HEIGHT
      // 获取分割dom，此处为class类名为item的dom
      const domList = document.getElementsByClassName(this.splitClassName)
      // 进行分割操作，当dom内容已超出a4的高度，则将该dom前插入一个空dom，把他挤下去，分割
      let pageNum = 1 // pdf页数
      const eleBounding = this.ele.getBoundingClientRect()
      for (let i = 0; i < domList.length; i++) {
        const node = domList[i]
        const bound = node.getBoundingClientRect()
        const offset2Ele = bound.top - eleBounding.top
        const currentPage = Math.ceil((bound.bottom - eleBounding.top) / pageHeight) // 当前元素应该在哪一页
        if (pageNum < currentPage) {
          pageNum++
          const divParent = domList[i].parentNode // 获取该div的父节点
          const newNode = document.createElement('div')
          newNode.className = 'emptyDiv'
          newNode.style.background = 'white'
          newNode.style.height = (pageHeight * (pageNum - 1) - offset2Ele + 30) + 'px' // +30为了在换下一页时有顶部的边距
          newNode.style.width = '100%'
          console.log(newNode.style.height, 'newNode.style.height')
          const next = domList[i].nextSibling // 获取div的下一个兄弟节点
          // 判断兄弟节点是否存在
          if (next) {
            // 存在则将新节点插入到div的下一个兄弟节点之前，即div之后
            divParent.insertBefore(newNode, node)
          } else {
            // 不存在则直接添加到最后,appendChild默认添加到divParent的最后
            divParent.appendChild(newNode)
          }
        }
      }
      // 异步函数，导出成功后处理交互
      this.getPDF(resolve, reject)
    })
  }
}

export { PdfLoader }
