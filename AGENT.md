# F-CLI Monorepo 项目架构文档

## 项目概述

基于 TypeScript 的命令行工具 monorepo 项目，用于创建 Vue、React 等项目模板。

## 技术栈

- **包管理器**: pnpm 10.24.0
- **构建工具**: Turbo 2.9.5 (monorepo 构建编排)
- **构建打包**: tsup 8.5.1
- **语言**: TypeScript 6.0.2
- **代码质量**: ESLint 10.2.0, Prettier, CSpell

## 目录结构

```
f-cli/
├── apps/                          # 应用目录 (当前为空)
├── packages/                      # 包目录
│   └── cli/                       # 核心 CLI 包 (@f-cli/cli)
│       ├── bin/                   # 可执行文件入口
│       ├── src/                   # 源代码
│       │   ├── commands/          # 命令实现
│       │   │   ├── base/          # 基础命令
│       │   │   ├── index.ts       # 命令导出
│       │   │   └── registerCommands.ts
│       │   ├── utils/             # 工具函数
│       │   ├── cli.ts             # CLI 配置
│       │   └── index.ts           # 入口文件
│       ├── templates/             # 项目模板
│       │   ├── template-react/
│       │   ├── template-react-ts/
│       │   ├── template-vanilla/
│       │   ├── template-vanilla-ts/
│       │   ├── template-vue/
│       │   └── template-vue-ts/
│       ├── types/                 # 类型定义
│       ├── constants/             # 常量定义
│       ├── dist/                  # 构建输出 (已忽略)
│       ├── package.json
│       ├── tsconfig.json
│       └── tsup.config.ts
├── .changeset/                    # Changeset 版本管理配置
├── .cspell/                       # 拼写检查配置
│   └── custom-words.txt
├── .github/                       # GitHub 配置
├── .husky/                        # Git Hooks 配置
├── .turbo/                        # Turbo 缓存 (已忽略)
├── package.json                   # 根包配置
├── pnpm-workspace.yaml            # pnpm 工作区配置
├── turbo.json                     # Turbo 任务配置
├── tsconfig.json                  # TypeScript 根配置
├── tsconfig.eslint.json           # ESLint TypeScript 配置
├── eslint.config.mjs              # ESLint 配置
├── .prettierrc                    # Prettier 格式化配置
├── .prettierignore                # Prettier 忽略配置
├── commitlint.config.mjs          # Commitlint 提交规范配置
├── cspell.json                    # CSpell 拼写检查配置
└── .gitignore                     # Git 忽略配置
```

## 配置规范

### 1. pnpm 工作区配置 (pnpm-workspace.yaml)

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

支持 `packages` 和 `apps` 两个目录下的所有子包。

### 2. Turbo 配置 (turbo.json)

定义的任务：
- **build**: 构建任务，依赖上游包的 build，输出到 `dist/**`
- **dev**: 开发模式，无缓存，持久运行
- **changeset-version**: 版本管理任务
- **publish-npm**: 发布任务，依赖 build 和 changeset-version

### 3. TypeScript 配置 (tsconfig.json)

- **目标**: ES2015
- **模块系统**: NodeNext (module/moduleResolution)
- **严格模式**: 开启
- **路径别名**: `@f-cli/*` → `./packages/@f-cli/*`
- **排除**: `templates` 目录和所有 `dist` 目录

### 4. ESLint 配置 (eslint.config.mjs)

使用 Flat Config 格式：
- 基于 `typescript-eslint` 和 `@eslint/js`
- **忽略**: `*.js` 文件、`dist` 目录、`templates` 目录
- **规则**:
  - 强制使用数组类型声明 (`@typescript-eslint/array-type`)
  - 禁止 `console` (`no-console`)
  - 导入排序 (`simple-import-sort/imports`, `simple-import-sort/exports`)
    - 排序顺序：第三方包 → 组织包 → 绝对路径 → 相对路径

### 5. Prettier 配置 (.prettierrc)

```json
{
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "printWidth": 140,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none"
}
```

### 6. Commitlint 配置 (commitlint.config.mjs)

使用 `cz-git` 提供交互式提交界面：
- 遵循 Conventional Commits 规范
- 支持的类型：feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- 支持关联 issue (link, closed 前缀)

### 7. Changeset 配置 (.changeset/config.json)

- 用于版本管理和 changelog 生成
- 基础分支：main
- 内部依赖更新：patch

### 8. CSpell 配置 (cspell.json)

- 自定义词典：`.cspell/custom-words.txt`
- **忽略路径**: node_modules, dist, docs, templates 等

### 9. Git Hooks (lint-staged)

提交前自动执行：
- `*.{md,json}`: Prettier 格式化
- `*.{ts,tsx}`: ESLint 修复 + Prettier 格式化

## 可用命令

### 根目录命令

```bash
pnpm dev              # 运行所有包的开发模式
pnpm build            # 构建所有包
pnpm dev:cli          # 运行 CLI 包的开发模式
pnpm build:cli        # 构建 CLI 包
pnpm format           # 格式化代码
pnpm lint             # ESLint 检查并修复
pnpm spellcheck       # 拼写检查
pnpm typecheck        # TypeScript 类型检查
pnpm commit           # 使用 commitizen 提交
pnpm changeset:version # 版本管理
pnpm publish:npm      # 发布到 npm
```

### CLI 包命令

```bash
pnpm dev              # 开发模式 (watch)
pnpm build            # 构建打包
pnpm changeset        # 创建 changeset
pnpm publish          # 发布包
pnpm version          # 版本管理
```

## 开发规范

### 代码风格

1. **TypeScript**: 严格模式，使用 ESNext 特性
2. **导入顺序**: 
   - 第三方包
   - 组织包 (@开头)
   - 绝对路径 (@/)
   - 相对路径 (从远到近)
3. **代码格式**: 
   - 不使用分号
   - 单引号
   - 行尾逗号省略
   - 行宽 140 字符

### 提交规范

使用 `pnpm commit` 执行交互式提交，遵循 Conventional Commits：

```
<type>(<scope>): <subject>

<body>

<footer>
```

类型说明：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档变更
- `style`: 代码格式
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `build`: 构建相关
- `ci`: CI 配置
- `chore`: 其他变更
- `revert`: 回滚

### 版本发布流程

1. 修改代码后执行 `pnpm changeset` 创建变更描述
2. 执行 `pnpm changeset:version` 更新版本号
3. 执行 `pnpm publish:npm` 发布到 npm

## 包说明

### @f-cli/cli

核心 CLI 包，提供以下功能：
- `fcli create <project-name>`: 创建新项目
- `fcli info`: 查看 CLI 信息

依赖的主要库：
- `commander`: 命令行框架
- `prompts`: 交互式提示
- `ora`: 加载动画
- `picocolors`: 终端颜色
- `fs-extra`: 文件系统操作
- `giget`: 模板下载
- `consola`: 日志输出
