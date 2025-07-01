# Types 文件夹说明

这个文件夹包含了项目的所有类型声明文件。

## 文件结构

- `env.d.ts` - 环境变量和全局类型声明
- `auto-imports.d.ts` - 自动导入的类型声明（由 unplugin-auto-import 生成）
- `components.d.ts` - 组件类型声明（由 unplugin-vue-components 生成）
- `index.d.ts` - 统一导出文件

## 配置说明

在 `tsconfig.app.json` 中已经配置了：

1. `include` 字段包含了 `types/**/*` 路径
2. `paths` 映射中添加了 `@/types/*` 路径别名

## 使用方式

在项目中可以直接导入类型：

```typescript
import type { SomeType } from '@/types'
```

或者在组件中直接使用全局类型（通过 auto-imports.d.ts 自动导入）。
