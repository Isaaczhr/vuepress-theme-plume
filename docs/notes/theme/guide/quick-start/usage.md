---
title: 安装/使用
icon: grommet-icons:install
createTime: 2024/03/04 09:50:07
permalink: /guide/usage/
tags:
  - 指南
  - 快速开始
---

## 依赖环境

- [Node.js](https://nodejs.org/) : **^20.6.0 或 >= 22.0.0** [+node-versions]
- [npm 8+](https://www.npmjs.com/) 或 [pnpm 8+](https://pnpm.io/zh/) 或 [Yarn 2+](https://yarnpkg.com/)

[+node-versions]: **^20.6.0：** `20.6.0` 及以上但不高于 `21.0.0` 的版本
[+node-versions]: **>= 22.0.0：** `22.0.0` 及以上的版本

:::: details 怎么安装依赖环境？
::: steps

1. **请前往 [Node.js 官网](https://nodejs.org/zh-cn) 下载最新稳定版本**

   请根据指引完成安装，一般而言，在安装过程中，您只需要保持其默认设置，直接选择下一步即可。

2. **安装 PNPM**

   在您安装完成 node.js 后，请打开 终端，执行如下命令：

   ```sh
   corepack enable
   ```

   主题推荐您使用 pnpm 作为项目管理器。

3. **完成**

:::
::::

## 命令行安装 <Badge type="tip" text="推荐" />

主题提供了一个 命令行工具，帮助您构建一个基本项目。您可以通过运行以下命令，启动 安装向导。

::: npm-to

```sh
npm create vuepress-theme-plume@latest
```

:::

启动向导后，您只需要回答几个简单的问题：

<!-- @include: ../../snippet/create.snippet.md ---->

::: details 怎么使用命令行工具？

以 Windows 系统为例，你可以使用以下方法来启动 CMD 命令行工具：

1. 按下 `Win + R` 键打开 “运行” 对话框。
2. 输入 `cmd` 并按下 Enter 键。 （也可以输入 `powershell` 来打开 PowerShell）

注意此时 `cmd` 可能不在你期望的目录位置，你可以使用如下命令来切换到正确的目录：

```sh
D: # 此命令将切换到 D: 分区，进入其他分区请按照实际情况修改
cd open-source # 进入 D: 分区下的 open-source 目录
```

此时，你就可以在这里输入 `pnpm create vuepress-theme-plume@latest` 来创建一个基本的项目了。

创建的项目将位于 `D:\open-source\my-project` 目录下。
:::

## 手动安装

::: info 提示

- 使用 [pnpm](https://pnpm.io/zh/) 时，你需要安装 `vue` 作为 peer-dependencies 。
- 使用 [Yarn 2+](https://yarnpkg.com/) 时，你需要在 `.yarnrc.yml` 文件中设置 `nodeLinker: 'node-modules'` 。
:::

使用本主题，你需要首先新建一个项目，并安装`vuepress@next`以及本主题

:::: steps

- ### 新建文件夹并进入目录

  ``` sh
  mkdir my-blog
  cd my-blog
  ```

- ### 初始化项目

  ::: npm-to

  ``` sh
  git init
  npm init
  ```

  :::

- ### 安装相关依赖

  安装 `vuepress@next` 和 `vuepress-theme-plume` 作为本地依赖。

  ::: npm-to

  ```sh
  # 安装 vuepress
  npm i -D vuepress@next vue
  # 安装 主题和打包工具
  npm i -D vuepress-theme-plume @vuepress/bundler-vite@next
  ```

  :::

  :::warning
  主题当前版本 已适配至 <code>vuepress@{{ vuepressVersion }}</code>，你应该安装这个版本的 VuePress。高于或低于这个版本，可能会存在潜在的兼容性问题。
  :::

- ### 在 `package.json` 中添加 `script`

  ``` json title="package.json"
  {
    "scripts": {
      "docs:dev": "vuepress dev docs",
      "docs:build": "vuepress build docs"
    }
  }
  ```

  `vuepress` 默认将文档源码放在 `docs` 目录下。

- ### 将默认的临时目录和缓存目录添加到`.gitignore` 文件中

  ::: code-tabs
  @tab .gitignore

  ``` txt
  node_modules
  .temp
  .cache
  ```

  @tab sh

  ``` sh
  echo 'node_modules' >> .gitignore
  echo '.temp' >> .gitignore
  echo '.cache' >> .gitignore
  ```

  :::

- ### 在 `docs/.vuepress/config.{js,ts}` 中配置主题

  ``` ts title="docs/.vuepress/config.ts" twoslash
  import { viteBundler } from '@vuepress/bundler-vite'
  import { defineUserConfig } from 'vuepress'
  import { plumeTheme } from 'vuepress-theme-plume'

  export default defineUserConfig({
    // 请不要忘记设置默认语言
    lang: 'zh-CN',
    theme: plumeTheme({
      // more...
    }),
    bundler: viteBundler(),
  })
  ```

  :::warning 不要忘记设置默认语言
  无论是否需要使用 **多语言** ，你都应该为 VuePress 配置 正确 `lang` 选项值。
  主题需要根据 `lang` 选项来确定语言环境文本。
  :::

- ### 在 `docs` 目录下新建 `README.md` 文件

  声明首页配置。

  ``` md title="README.md"
  ---
  home: true
  ---
  ```

- ### 在本地服务器启动你的文档站点

  ::: npm-to

  ``` sh
  npm run docs:dev
  ```

  :::

  VuePress 会在 <http://localhost:8080>
  启动一个热重载的开发服务器。当修改 Markdown 文件时，浏览器中的内容也会自动更新。

- ### 完成

::::

## 更新主题

您可以直接在项目中运行以下命令检查是否有可用的更新：

::: npm-to

``` sh
npx vp-update
```

:::

<script setup lang="ts">
const vuepressVersion = __VUEPRESS_VERSION__
</script>
