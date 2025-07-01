# Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范来规范 Git 提交信息。

## 提交信息格式

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## 类型 (type)

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改bug的代码变动）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI/CD相关
- `build`: 构建系统或外部依赖的变动
- `revert`: 回滚

## 示例

```bash
# 新功能
git commit -m "feat: 添加用户登录功能"

# 修复bug
git commit -m "fix: 修复登录页面样式问题"

# 文档更新
git commit -m "docs: 更新README文档"

# 代码格式调整
git commit -m "style: 格式化代码"

# 重构
git commit -m "refactor: 重构用户管理模块"

# 性能优化
git commit -m "perf: 优化列表渲染性能"

# 测试
git commit -m "test: 添加用户登录测试用例"

# 构建相关
git commit -m "chore: 更新依赖包版本"
```

## 提交前检查

项目配置了以下Git钩子：

1. **pre-commit**: 提交前自动运行代码检查和格式化

   - ESLint 语法检查
   - Prettier 代码格式化

2. **commit-msg**: 验证提交信息格式
   - 检查提交信息是否符合规范
   - 确保类型、描述等字段正确

## 注意事项

- 提交信息必须使用小写字母
- 描述部分不能以句号结尾
- 提交信息总长度不能超过72个字符
- 如果提交被拒绝，请根据错误提示修改后重新提交
