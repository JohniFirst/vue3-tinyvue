# Vue3 TinyVue 项目

一个基于 Vue3 + TypeScript + Vite 的现代化前端项目，集成了 TinyVue 组件库。

## 功能特性

- 🔐 **用户认证系统** - 支持登录/登出，路由守卫保护
- 🎨 **主题切换** - 支持浅色/深色主题切换
- 📱 **响应式设计** - 适配桌面端和移动端
- 🧭 **侧边栏导航** - 可折叠的侧边栏导航菜单
- 📊 **数据可视化** - 集成图表组件
- 🧠 **思维导图** - 支持思维导图展示
- ✂️ **图片裁剪** - 图片裁剪和编辑功能
- 📖 **导航目录** - 自动生成页面导航目录

## 页面功能

### 仪表盘 (`/`)

- 系统概览和快速导航
- 展示各个功能模块的入口

### 思维导图 (`/mind-map`)

- 可视化展示思维结构
- 支持节点展开/收起
- 交互式思维导图编辑

### 数据图表 (`/line-chart`)

- 折线图展示
- 饼图展示
- 数据可视化分析

### 图片裁剪 (`/crop-view`)

- 图片预览
- 图片裁剪功能
- 支持图片替换

### 导航预览 (`/anchor-view`)

- 自动生成页面目录
- 支持锚点跳转
- 长文档导航

## 技术栈

- **前端框架**: Vue 3.5.13
- **构建工具**: Vite 6.2.4
- **语言**: TypeScript 5.8.0
- **路由**: Vue Router 4.5.0
- **状态管理**: Pinia 3.0.1
- **UI组件库**: @opentiny/vue 3.24.0
- **图表库**: @opentiny/vue-huicharts 3.24.0
- **HTTP客户端**: Axios 1.10.0
- **包管理器**: pnpm

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发环境运行

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 登录信息

项目使用模拟登录，无需真实接口：

- **用户名**: `admin`
- **密码**: `123456`

## 项目结构

```
vue3-tinyvue/
├── src/
│   ├── api/              # API 接口
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── public/               # 公共资源
├── package.json          # 项目配置
└── vite.config.ts        # Vite 配置
```

## 主要功能说明

### 认证系统

- 使用 Pinia 管理用户认证状态
- 支持本地存储保持登录状态
- 路由守卫保护需要认证的页面

### 主题系统

- 支持浅色/深色主题切换
- 自动保存主题偏好
- 响应系统主题设置

### 布局系统

- 响应式侧边栏导航
- 可折叠的菜单
- 顶部导航栏显示用户信息和主题切换

## 开发说明

### 添加新页面

1. 在 `src/views/` 目录下创建新的页面组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 在 `src/layouts/MainLayout.vue` 中添加菜单项

### 自定义主题

- 修改 `src/assets/css/light.css` 和 `src/assets/css/dark.css` 中的颜色变量
- 使用 CSS 变量确保主题一致性

### 状态管理

- 用户认证状态：`src/stores/auth.ts`
- 其他业务状态：在 `src/stores/` 目录下创建新的 store

## 部署

项目支持 GitHub Pages 部署：

```bash
pnpm deploy
```

## 许可证

MIT License
