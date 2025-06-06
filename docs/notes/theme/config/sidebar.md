---
title: 侧边栏配置
createTime: 2024/08/15 21:05:36
permalink: /config/sidebar/
---

## 概述

在本主题中，侧边栏 特指 位于页面 最左侧的内容区域，用于导航到不同的页面。

在 `vuepress` 的默认主题 `@vuepress/theme-default` 中，侧边栏是通过 `sidebar` 进行配置。

**但在本主题中，为使其更具语义化，主题将侧边栏配置整合到了 [notes 配置](./notes.md) 中** 。
通过一个 `note` 对应一个 `sidebar` 的方式，实现更加简洁，语义化的侧边栏配置。

同时，为了满足 用户不希望使用 `notes` 功能的需求，本主题也提供了 `sidebar` 的选项进行侧边栏配置。

## Notes 中的侧边栏配置

`notes` 的功能是聚合一系列的文章，通过侧边栏来导航到 notes 中不同的文章。

你可以在 `notes` 目录下创建多个 `note` ，在每一个 `note` 中单独配置 `sidebar`:

::: code-tabs#configs

@tab .vuepress/config.ts

```ts twoslash
import { defineUserConfig } from 'vuepress'
import { defineNoteConfig, plumeTheme } from 'vuepress-theme-plume'

// [!code ++:8]
const noteA = defineNoteConfig({
  dir: 'note A',
  link: '/note-a/',
  sidebar: [
    { text: 'one item', link: 'one' },
    { text: 'two item', link: 'two' },
  ]
})

export default defineUserConfig({
  theme: plumeTheme({
    notes: {
      link: '/',
      dir: 'notes',
      notes: [noteA], // [!code ++]
    },
  })
})
```

@tab .vuepress/plume.config.ts

```ts twoslash
import { defineNoteConfig, defineThemeConfig } from 'vuepress-theme-plume'

// [!code ++:8]
const noteA = defineNoteConfig({
  dir: 'note A',
  link: '/note-a/',
  sidebar: [
    { text: 'one item', link: 'one' },
    { text: 'two item', link: 'two' },
  ]
})

export default defineThemeConfig({
  notes: {
    link: '/',
    dir: 'notes',
    notes: [noteA], // [!code ++]
  },
})
```

:::

主题提供了 `defineNoteConfig` 来帮助你配置 note , 你可以参考 [这里](./notes.md)来查看如何配置。

## 通用 Sidebar 配置

如果你不想使用 `notes` 的方式来管理系列文章，但又期望通过侧边栏来导航到不同的文章，
可以通过 [sidebar](../config/theme.md#sidebar) 通用配置来实现。

::: code-tabs#configs

@tab .vuepress/config.ts

```ts twoslash
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  theme: plumeTheme({
    notes: false,
    sidebar: {
      '/config/': [
        { text: '侧边栏配置', link: 'sidebar-1' },
        { text: '侧边栏配置', link: 'sidebar-2' },
      ]
    }
  })
})
```

@tab .vuepress/plume.config.ts

```ts twoslash
import { defineThemeConfig } from 'vuepress-theme-plume'

export default defineThemeConfig({
  notes: false,
  sidebar: {
    '/config/': [
      { text: '侧边栏配置', link: 'sidebar-1' },
      { text: '侧边栏配置', link: 'sidebar-2' },
    ]
  }
})
```

:::

完整侧边栏使用说明，请查看 [此文档](../guide/quick-start/document.md) 。
