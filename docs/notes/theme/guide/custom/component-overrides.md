---
title: 组件覆写
icon: carbon:cics-sit-overrides
createTime: 2024/06/17 16:20:15
permalink: /guide/component-overrides/
---

## 概述

布局插槽十分实用，但有时候你可能会觉得它不够灵活。主题同样提供了单个组件覆写的能力。

::: warning
在使用此功能前，你应该首先熟悉本主题的源代码，了解 主题内置的各个组件，以便 安全的 覆写他们。

主题的组件源代码托管在 [GitHub](https://github.com/pengzhanbo/vuepress-theme-plume/tree/main/theme/src/client/components)，遵循 MIT 协议。
:::

## 使用

主题将所有 非全局的组件 都注册了一个带 `@theme` 前缀的 [alias](https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html#alias) 。
例如，`VPFooter.vue` 的别名是 `@theme/VPFooter.vue` 。

如果你想要覆写 `VPFooter.vue` 组件，只需要在配置文件 `.vuepress/config.ts` 中覆盖这个别名即可：

```ts title=".vuepress/config.ts"
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  theme: plumeTheme(),

  alias: {
    '@theme/VPFooter.vue': path.resolve(
      __dirname,
      './components/MyFooter.vue',
    ),
  },
})
```
