# f-cli

基于TypeScript的命令行工具，用于快速创建Vue和React项目。

## 特性

- 🚀 快速创建Vue和React项目
- 🎨 支持多种模板（TypeScript/JavaScript）
- 🛠️ 简洁直观的命令行界面
- 📦 内置项目信息查看功能
- 🔢 随机字符串生成器

## 安装

```bash
# 全局安装 f-cli
git clone https://github.com/fuwenjiang1997/f-cli.git
cd f-cli
npm install -g

# 或者使用 pnpm
pnpm add -g
```

## 使用方法

### 创建项目

```bash
# 创建新项目（交互式选择框架和模板）
fcli create <project-name>

# 指定框架和模板创建项目
fcli create <project-name> -f vue -t vue-ts

# 使用远程模板
fcli create <project-name> -r
```

### 查看CLI信息

```bash
# 查看CLI版本和相关信息
fcli info
```

### 生成随机字符串

```bash
# 生成默认长度为10的随机字符串
fcli random

# 指定随机字符串长度
fcli random -l 20
```

## 支持的框架和模板

### Vue
- Vue TypeScript (`vue-ts`)
- Vue JavaScript (`vue`)

### React
- React TypeScript (`react-ts`)
- React JavaScript (`react`)

### Vanilla
- 原生JavaScript (`vanilla`)

## 开发

```bash
# 克隆项目
git clone https://github.com/fuwenjiang1997/f-cli.git
cd f-cli

# 安装
pnpm install -g

# 开发模式运行
pnpm dev:cli

# 构建
pnpm build:cli

# 测试
pnpm test
```
ß
## 命令列表

| 命令     | 描述           |
| -------- | -------------- |
| `create` | 创建新的项目   |
| `info`   | 显示CLI信息    |
| `random` | 生成随机字符串 |

## 贡献

欢迎提出issue和PR来帮助我们改进f-cli！

## 许可证

MIT License
