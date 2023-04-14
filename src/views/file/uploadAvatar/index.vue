<template>
  <div class="">
    <el-button type="primary" icon="el-icon-upload" style="position: absolute;top: 150px;margin-left: 40px;"
      @click="imagecropperShow = true">
      Change Avatar
    </el-button>
    <image-cropper v-show="imagecropperShow" :key="imagecropperKey" :width="300" :height="300"
      url="https://httpbin.org/post" lang-type="zh" @close="close" @crop-upload-success="cropSuccess" />
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
export default {
  name: 'UploadAvatar',
  components: { ImageCropper },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  }, methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
