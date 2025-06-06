---
title: 公告板
icon: mingcute:announcement-line
createTime: 2024/10/19 21:51:22
permalink: /guide/features/bulletin/
---

## 概述

公告板是一个实时通知组件，可以实现在站点中方便的展示一些通知信息。

如右上角的公告板。

## 使用

主题提供了非常方便且灵活的 公告板 使用方法。你可以根据自己的需求，选择合适的方式进行配置。

### 配置说明

```ts title=".vuepress/config.ts"
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  theme: plumeTheme({
    bulletin: {
      // more options...
    }
  })
})
```

```ts
interface BulletinOptions {
  /**
   * 公告位置
   * @default 'top-right'
   */
  layout?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'

  /**
   * 是否显示渐变边框
   *
   * @default true
   */
  border?: boolean

  /**
   * 在哪些页面显示公告
   *
   * - `true` 表示所有页面
   * - `false` 表示不显示
   * - 传入一个函数，返回 `true` 时显示
   */
  enablePage?: boolean | ((page: Page) => boolean)

  /**
   * 公告持续时间
   *
   * @default 'always'
   *
   * - `'session'` 表示在会话周期内关闭公告后不再显示，在新的会话周期重新显示，刷新页面不会重新显示
   * - `'always'` 表示总是显示，关闭公告后刷新页面会重新显示
   * - `'once'` 表示在仅在当前周期内显示，关闭公告后不再显示，新的会话和刷新页面都不会重新显示
   */
  lifetime?: 'session' | 'always' | 'once'

  /**
   * 公告 ID
   *
   * 公告持续时间 需要根据 `id` 作为唯一标识
   */
  id?: string

  /**
   * 公告标题
   */
  title?: string

  /**
   * 公告内容
   *
   * 可以使用 markdown 语法 或者 使用 html 文本，
   * 使用 markdown 时需要声明 `contentType` 为 `markdown`
   */
  content?: string

  /**
   * 公告内容 类型
   *
   * - `markdown` 表示使用 markdown 语法
   * - `text` 表示使用 普通文本 （可以是 html 内容）
   *
   * @default 'text'
   */
  contentType?: 'markdown' | 'text'

  /**
   * 传入一个 `markdown` 或 `html` 文件路径，并使用文件内容作为公告内容
   *
   * - 使用 `.md` 文件时，将会解析 markdown 语法
   * - 使用 `.html` 文件时，只能包含公告内容，请不要使用 `<html>` `<body>` `<script>` 等标签。
   */
  contentFile?: string
}
```

## 简单公告

当您仅需要配置 简单的公告板，仅包含一些简要的内容 时，可以直接使用 `bulletin.content` 添加内容。

```ts title=".vuepress/config.ts"
export default defineUserConfig({
  theme: plumeTheme({
    bulletin: {
      layout: 'top-right',
      title: '公告板标题',
      content: '公告板内容',
    }
  })
})
```

还可以声明 `bulletin.contentType` 为 `markdown` ，这可以在 `content` 中使用 markdown 语法。

```ts title=".vuepress/config.ts"
export default defineUserConfig({
  theme: plumeTheme({
    bulletin: {
      layout: 'top-right',
      title: '公告板标题',
      contentType: 'markdown', // [!code hl]
      content: `\
**更新说明**

- 新增了一些功能
- 修复了一些 bug
`,
    }
  })
})
```

## 长内容公告

当您需要配置 长内容的公告板时，将长内容写在配置文件中会显得比较臃肿和难以阅读，
这时候可以使用 `bulletin.contentFile` 添加内容文件路径，将长内容与配置文件分开。

`bulletin.contentFile` 需要传入一个 `markdown` 或 `html` 文件的绝对路径。主题将使用该文件内容作为公告内容。

::: code-tabs
@tab .vuepress/config.ts

```ts
import path from 'node:path'

export default defineUserConfig({
  theme: plumeTheme({
    bulletin: {
      layout: 'top-right',
      title: '公告板标题',
      contentFile: path.join(__dirname, '_bulletin.md'),
    }
  })
})
```

@tab .vuepress/_bulletin.md

```md
**更新说明**

- 新增了一些功能
- 修复了一些 bug
```

:::

主题会监听 `bulletin.contentFile` 的变化，当文件内容发生变化时，会重新渲染公告板。

## 自定义内容交互公告

使用 `bulletin.content` 或 `bulletin.contentFile` 仅能编写纯文本的公告内容，以及通过 `markdown` 语法
支持的一些交互内容。无法编写一个带有其他的自定义交互的公告内容。

对于此类场景，主题也提供了相应的支持。

首先，配置 `bulletin` 的基础内容，此时您无需再配置 `bulletin.content` 或 `bulletin.contentFile` 。

```ts title=".vuepress/config.ts"
export default defineUserConfig({
  theme: plumeTheme({
    bulletin: {
      layout: 'top-right',
      title: '公告板标题',
    }
  })
})
```

然后，在 `.vuepress/client.ts` 中注册全局组件 `BulletinContent` ，主题将会自动检索该组件并作为公告板的内容。

```ts title=".vuepress/client.ts"
import { defineClientConfig } from '@vuepress/client'
import BulletinContent from './components/BulletinContent.vue'

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('BulletinContent', BulletinContent)
  }
})
```

接下来，编写 `BulletinContent.vue` 组件

```vue title=".vuepress/components/BulletinContent.vue"
<script setup>
// 编写自定义公告内容交互
</script>

<template>
  <div class="bulletin-content">
    <!-- 自定义公告内容 -->
  </div>
</template>

<style scoped>
/* 自定义公告内容样式 */
</style>
```

## 自定义公告板样式

您可以直接通过 css 覆盖公告板的样式。

通过修改以下 css 变量，可方便的控制公告板的样式。

```css
:root {
  --vp-bulletin-bg-color: var(--vp-c-bg);
  --vp-bulletin-text-color: var(--vp-c-text-1);
  --vp-bulletin-title-color: var(--vp-c-text-1);
  --vp-bulletin-font-size: 16px;
  --vp-bulletin-title-font-size: 18px;
  --vp-bulletin-line-height: 24px;
  --vp-bulletin-border-width: 2px;
  --vp-bulletin-border: conic-gradient(var(--vp-c-important-3), var(--vp-c-danger-3), var(--vp-c-success-3), var(--vp-c-important-3));
  --vp-bulletin-width: 320px;
}
```

或者通过 `.vp-bulletin` 全局样式覆盖公告板的样式。

```css
.vp-bulletin {
  /* 公告板样式 */
}
```

## 完全自定义公告板

当您完全不想使用主题内置的公告板时，可以通过注册全局组件 `Bulletin` 来完全自定义公告板。

::: code-tabs
@tab .vuepress/client.ts

```ts
import { defineClientConfig } from '@vuepress/client'
import Bulletin from './components/Bulletin.vue'

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('Bulletin', Bulletin)
  }
})
```

:::

接下来，编写 `Bulletin.vue` 组件

::: code-tabs
@tab .vuepress/components/Bulletin.vue

```vue
<script setup>
// 编写自定义公告
</script>

<template>
  <div class="bulletin">
    <!-- 自定义公告 -->
  </div>
</template>

<style scoped>
/* 自定义公告内容样式 */
</style>
```

:::

您需要重头开始编写公告板组件，为方便编写公告板，主题提供了 composable API `useBulletinControl()`，
您可以直接在 `Bulletin.vue` 组件中使用它。

```ts
import { useBulletinControl } from 'vuepress-theme-plume/composables'

const {
  bulletin, // 公告板配置， 从主题配置中读取
  showBulletin, // 是否显示公告板
  enableBulletin, // 当前页面是否启用公告板
  close, // 关闭公告板
} = useBulletinControl()
```

## 相关说明

### 公告板唯一标识

公告板的唯一标识由 `bulletin.id` 配置。

唯一标识是用于区分公告板，并根据 该表示 决定 `bulletin.lifetime` 的有效期。

```ts
export default defineUserConfig({
  theme: plumeTheme({
    bulletin: {
      layout: 'top-right',
      title: '公告板标题',
      id: 'my-bulletin', // [!code hl]
    }
  })
})
```

当你未显式配置 `bulletin.id` 时，主题会根据 `bulletin` 对象生成一个 hash 值作为唯一标识。

### 公告持续时间

公告板的持续时间由 `bulletin.lifetime` 配置。

- `session` 表示在 当前会话周期内，如果用户没有关闭公告板，则会一直显示，这包括到下个会话周期。
  而当用户关闭公告板，则表示公告板已过期，在当前会话周期内不再显示，但在下一个会话周期会重新显示。

- `always` 表示公告板即使被用户关闭，不仅下一个会话周期也会重新显示，刷新页面也会重新显示。

- `once` 表示公告板在当前会话周期内一旦被关闭，之后都不再显示。

::: details 什么是会话？
**会话** 表示当您访问某个站点时，在您停留在这个站点的时间内，只要站点所在的浏览器标签页没有被关闭，
那么这个站点就会保持为同一个会话，即使页面刷新也依然保持为同一个会话。
:::

### 公告板的位置

公告板的位置由 `bulletin.layout` 配置。

- `top-left`：顶部居左
- `top-right`：顶部居右
- `bottom-left`：底部居左
- `bottom-right`：底部居右
- `center`：顶部居中

### 公告板显示的页面

公告板的显示页面由 `bulletin.enablePage` 配置。

- `true` 表示所有页面
- `false` 表示不显示
- 传入一个函数，返回 `true` 时显示

```ts
export default defineUserConfig({
  theme: plumeTheme({
    bulletin: {
      layout: 'top-right',
      title: '公告板标题',
      enablePage: (page) => {
        return page.path === '/custom-path/'
      }
    }
  })
})
```
