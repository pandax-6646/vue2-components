<template>
  <div style="position: relative;padding: 30px;">
    <pan-thumb :image="image" />
    <el-button
      type="primary"
      icon="el-icon-upload"
      style="position: absolute;top: 150px;margin-left: 40px;"
      @click="imagecropperShow = true"
    >修改头像</el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="http://127.0.0.1:3000/api/upload-img"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'UploadAvatar',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  methods: {
    // 图片上传成功回调函数
    cropSuccess(res) {
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = res[0].url
      this.imagecropperShow = false
    },

    // 关闭弹窗
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
