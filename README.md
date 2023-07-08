# vue-components-template

## 拉取项目

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-components-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

## 构建命令

```bash
# 构建测试环境
npm run build:test

# 构建生产环境
npm run build:prod
```

## 其它命令

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## node版本

- mac 系统建议使用 10.24.1 版本
- window 系统建议使用 14.15.0 版本

## 上传附件

- 需要自行在本地运行一个文件服务器，然后配置上传地址，也可[参考](https://github.com/wangeditor-team/server)
