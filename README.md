## `npm i`安装依赖报错

```
// 主要是 wangeditor 影响
// 删除 package.json "@wangeditor/editor-for-vue": "^1.0.2",
npm i

npm cache clean --force

// 加--legacy-peer-deps
npm install @wangeditor/editor-for-vue --save --legacy-peer-deps
```


- 上传文件功能需要自行配置上传地址，也可[参考](https://github.com/wangeditor-team/server)

