# cscec4-frontend

## 技术栈

- **Vite 6**
- **Vue 3.5**
- **TypeScript 5.x**
- **Vue Router 4.5**
- **Pinia**
- **Element Plus**
- **Axios**

包管理使用 **pnpm**（建议启用 Corepack：`corepack enable`，或全局安装：`npm i -g pnpm`）。

## Node / pnpm 版本

- **Node**：**22.x**，且需满足 **≥ 22.12.0**（与 Vite 6 要求一致）。仓库根目录已提供 `.nvmrc` / `.node-version`（当前为 `22.14.0`），使用 nvm / fnm / asdf 时可在本目录执行对应命令切版本。
- **pnpm**：建议 **10.x**，并与 `package.json` 中的 `packageManager` 字段一致（便于 Corepack 自动选用 pnpm）。

`package.json` 的 `engines` 字段供 CI 或 `pnpm config set engine-strict true` 时校验版本。

## 安装依赖

```bash
pnpm install
```

## 启动开发环境

```bash
pnpm dev
```

默认地址：`http://localhost:5173`。

`vite.config.ts` 已将 `/api` 代理到后端 `http://localhost:8080`，与后端演示接口 `GET /api/opportunities` 对应。

环境变量见 `.env.development`（`VITE_API_BASE_URL=/api`）。

## 生产构建

```bash
pnpm build
```

## 演示页面

首页为「项目商机」表格，请求后端 `/api/opportunities` 展示列表，用于验证前后端联通。
