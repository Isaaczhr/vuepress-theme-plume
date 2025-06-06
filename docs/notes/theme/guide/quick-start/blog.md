---
title: 博客
icon: material-symbols:article-outline
createTime: 2024/03/04 19:16:40
permalink: /guide/blog/
tags:
  - 指南
  - 快速开始
---

## 概述

主题默认会将 [文档源目录](./project-structure.md#文档源目录) 下的，除了特定的目录（如 `notes` 目录将作为笔记所在目录），
所有 md 文件作为博客文章。

主题还会根据 md 文件 所在的 文件目录结构，以 **目录名** 作为 博客文章所属的 **分类**。

主题默认会生成一个 链接地址为 `/blog/` 的 博客文章列表页。
展示所有的博客文章，以及 博主的相关信息。

## 配置

主题默认启用 博客功能，通常您无需进行额外的配置。

```ts title=".vuepress/config.ts" twoslash
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  theme: plumeTheme({
    // 禁用博客功能
    // blog: false,

    blog: {
      /**
       * 通过 glob string 配置包含文件，
       * 默认读取 源目录中的所有 `.md` 文件，但会排除 `notes` 配置中用于笔记的目录。
       */
      include: ['**/*.md'],
      // 如果希望只将源目录下某个目录下的文章读取为博客文章，比如 `blog` 目录，可以配置为：
      // include: ['blog/**/*.md'],

      /**
       * 通过 glob string 配置排除的文件，相对于 源目录
       */
      exclude: ['.vuepress/', '**/README.md'],

      // 禁用分页
      // pagination: false,
      // 每页显示的文章数量
      pagination: 15,
    }
  })
})
```

## 博主信息

主题支持展示博主的基本信息。

<div
  style="width: 310px;margin: 0 auto;padding: 20px 20px 1px;text-align:center;border-radius: 4px;
  background-color: var(--vp-c-bg-soft);transition: background-color var(--vp-t-color);"
>
  <VPBlogProfile />
</div>

### 配置

你可以通过 `profile` 属性来设置博主头像等相关信息。

```ts title=".vuepress/config.ts" twoslash
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  theme: plumeTheme({
    profile: {
      name: '您的名字',
      description: '描述文字，座右铭/签名',
      avatar: '/blogger.png',
      location: '您的位置',
      organization: '您的组织',
      circle: true, // 是否为圆形头像
      layout: 'right', // 个人信息在左侧还是右侧，'left' | 'right'
    },
    // 社交链接
    social: [
      { icon: 'github', link: 'https://github.com/vuepress-theme-plume' },
      // ... more
    ]
  })
})
```

## 文章元数据

你可以配置展示博客文章的元数据，如标题、作者、日期、标签等。这些数据通过 `frontmatter` 配置。

```md
---
title: 文章标题
createTime: 2024/01/01 00:00:00
tags:
  - tag1
  - tag2
---
```

其中，`title` / `createTime` 会在新建 md 文件时由主题自动填充，你可以随意修改它们。

以下是在 博客文章中可用的 `frontmatter` 属性。

| 属性       | 类型                        | 默认值             | 说明                                         |
| ---------- | --------------------------- | ------------------ | -------------------------------------------- |
| title      | `string`                    | 默认自动填入文件名 | 文章标题                                     |
| createTime | `string`                    | 当前时间           | 文章创建时间                                 |
| tags       | `string[]`                  | `[]`               | 文章标签                                     |
| sticky     | `boolean \| number`         | false              | 是否置顶, 如果为数字，则数字越大，置顶越靠前 |
| draft      | `boolean`                   | false              | 是否为草稿，草稿文章不会被展示               |
| cover      | `string`                    | `''`               | 文章封面                                     |
| coverStyle | `BlogPostCoverStyle`        | `null`             | 文章封面样式                                 |
| excerpt    | `boolean \| string`         | ''                 | 文章摘要，默认通过 `<!-- more -->` 注释生成, 传入字符串表示自定义内容，不再从正文提取 |

除了以上的字段，你还可以使用 [通用 frontmatter 配置](../../config/frontmatter/basic.md) 中的字段，
灵活的控制当前页面的行为。

## 文章摘要

如果你想要为文章添加摘要，你可以使用 `<!-- more -->` 注释来标记它。任何在此注释之前的内容会被视为摘要。

**示例：**

```md
---
title: 标题
---

这里的内容会被作为摘要

<!-- more -->

这里的内容不会被作为摘要
```

还可以使用 `frontmatter.excerpt` 来控制文章是否显示摘要，以及 自定义摘要内容。

- `frontmatter.excerpt` 默认为 `false`，表示不显示摘要，此时 `<!-- more -->` 注释会被忽略。
- `frontmatter.excerpt` 为 `string` 类型时，表示自定义摘要内容，此时 `<!-- more -->` 注释会被忽略。

**示例：**

```md
---
title: 标题
excerpt: 自定义摘要内容
---
```

您可以根据需要使用不同的方式来控制文章的摘要。

::: tip 主题更建议使用 <code>&lt;!-- more --&gt;</code> 注释来添加摘要
:::

## 文章封面图

在博客文章列表页，主题支持为 文章添加封面图，并支持不同的 排版 和 灵活的尺寸配置。

为博客文章添加 封面图，可以在 `frontmatter` 中配置 `cover`:

```md{3}
---
title: 标题
cover: /images/cover.jpg
---
```

**封面图** 仅支持 绝对路径 或 远程路径。当使用 绝对路径时，从 `.vuepress/public` 目录中加载图片。

::: file-tree

- docs
  - .vuepress
    - public
      - images
        - cover.jpg
    - config.ts
  - article.md
- …
:::

默认效果如下：

<div style="background-color: var(--vp-c-bg-alt); padding: 20px 24px;transition: var(--vp-t-color)">
<VPPostItem
  :post="{ path: '/article/ecxnxxd0/', title: '文章标题',
  categoryList: [{id:'65f30c',sort:4,name:'教程'}], createTime: '2024/09/18 09:19:36',
  lang:'zh-CN', excerpt:'', cover: 'https://api.pengzhanbo.cn/wallpaper/bing' }"
  :index="1"
/>
</div>

还可以为 封面图 调整 布局位置，以及 尺寸比例：

```md{4-7}
---
title: 文章标题
cover: /images/cover.jpg
coverStyle:
  layout: left
  ratio: 16:9
  width: 300
---
```

效果如下:

<div style="background-color: var(--vp-c-bg-alt); padding: 20px 24px;transition: var(--vp-t-color)">
<VPPostItem
  :post="{ path: '/article/ecxnxxd0/', title: '文章标题',
  categoryList: [{id:'65f30c',sort:4,name:'教程'}], createTime: '2024/09/18 09:19:36',
  lang:'zh-CN', excerpt:'', cover: 'https://api.pengzhanbo.cn/wallpaper/bing', coverStyle: { layout: 'left', ratio: '16:9', width: 300 } }"
  :index="1"
/>
</div>

当文章没有摘要时，可能会显得比较空，为此你还可以通过 `compact: true` 使 封面图 贴合容器边缘，使整体变得更紧凑：

```md{8}
---
title: 文章标题
cover: /images/cover.jpg
coverStyle:
  layout: left
  ratio: 16:9
  width: 300
  compact: true
---
```

效果如下:

<div style="background-color: var(--vp-c-bg-alt); padding: 20px 24px;transition: var(--vp-t-color)">
<VPPostItem
  :post="{ path: '/article/ecxnxxd0/', title: '文章标题',
  categoryList: [{id:'65f30c',sort:4,name:'教程'}], createTime: '2024/09/18 09:19:36',
  lang:'zh-CN', excerpt:'', cover: 'https://api.pengzhanbo.cn/wallpaper/bing',
  coverStyle: { layout: 'left', ratio: '16:9', width: 300, compact: true } }"
  :index="1"
/>
</div>

::: warning `compact: true` 仅在文章没有摘要时生效
:::

还可以设置 封面图在 标题上方，此时变为 大图风格：

```md{5}
---
title: 文章标题
cover: /images/cover.jpg
coverStyle:
  layout: top
  ratio: 16:9
  width: 300
---
```

效果如下:

<div style="background-color: var(--vp-c-bg-alt); padding: 20px 24px;transition: var(--vp-t-color)">
<VPPostItem
  :post="{ path: '/article/ecxnxxd0/', title: '文章标题',
  categoryList: [{id:'65f30c',sort:4,name:'教程'}], createTime: '2024/09/18 09:19:36',
  lang:'zh-CN', excerpt:'', cover: 'https://api.pengzhanbo.cn/wallpaper/bing',
  coverStyle: { layout: 'top', ratio: '16:9', width: 300 } }"
  :index="1"
/>
</div>

### 预设配置

虽然主题支持为每个文章的封面图使用不同的配置，出于整体布局风格的考虑，以及简化配置的目的，
主题还支持为封面图预设配置：

```ts title=".vuepress/config.ts" twoslash
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  theme: plumeTheme({

    blog: {
      // 配置 封面图 布局位置
      // postCover: 'left', // 'left' | 'right' | 'odd-left' | 'odd-right' | 'top'
      postCover: {
        layout: 'left',
        ratio: '16:9',
        width: 300,
        compact: true
      }
    }
  })
})
```

```ts
type BlogPostCoverLayout = 'left' | 'right' | 'odd-left' | 'odd-right' | 'top'

interface BlogPostCoverStyle {
  /**
   * 博客文章封面图的位置
   */
  layout?: BlogPostCoverLayout
  /**
   * 博客文章封面图的比例
   *
   * @default '4:3'
   */
  ratio?: number | `${number}:${number}`

  /**
   * 封面图的宽度, 仅在 layout 为 'left' 或 'right' 时生效
   *
   * @default 240
   */
  width?: number
  /**
   * 是否使用紧凑模式，紧凑模式下，封面图紧贴容器边缘
   * @default false
   */
  compact?: boolean
}
```

你可能已经注意到，在预设配置的 `layout` 中，还支持 `odd-left` 和 `odd-right` 两种配置。

- `odd-left`: 表示 单数项在左侧，偶数项在右侧
- `odd-right`: 表示 单数项在右侧，偶数项在左侧

比如 `odd-left` 效果如下：

<div style="background-color: var(--vp-c-bg-alt); padding: 20px 24px;display: flex;flex-direction: column;gap: 24px;transition: var(--vp-t-color)">
<VPPostItem
  :post="{ path: '/article/ecxnxxd0/', title: '文章标题',
  categoryList: [{id:'65f30c',sort:4,name:'教程'}], createTime: '2024/09/18 09:19:36',
  lang:'zh-CN', excerpt:'', cover: 'https://api.pengzhanbo.cn/wallpaper/bing',
  coverStyle: { layout: 'odd-left', ratio: '16:9', width: 300, compact: true } }"
  :index="0"
/>
<VPPostItem
  :post="{ path: '/article/ecxnxxd0/', title: '文章标题',
  categoryList: [{id:'65f30c',sort:4,name:'教程'}], createTime: '2024/09/18 09:19:36',
  lang:'zh-CN', excerpt:'', cover: 'https://api.pengzhanbo.cn/wallpaper/bing',
  coverStyle: { layout: 'odd-left', ratio: '16:9', width: 300,compact: true } }"
  :index="1"
/>
<VPPostItem
  :post="{ path: '/article/ecxnxxd0/', title: '文章标题',
  categoryList: [{id:'65f30c',sort:4,name:'教程'}], createTime: '2024/09/18 09:19:36',
  lang:'zh-CN', excerpt:'', cover: 'https://api.pengzhanbo.cn/wallpaper/bing',
  coverStyle: { layout: 'odd-left', ratio: '16:9', width: 300, compact: true } }"
  :index="2"
/>
</div>

::: warning
当在 移动设备窄屏 上时，出于视觉效果考虑，`layout` 配置强制重置为 `top`。
:::

## 标签页，分类页和归档页

主题除了自动生成 **博客文章列表页** 以外，还会自动生成 **标签页**，**分类页** 和 **归档页**。

标签页 可以根据 标签 筛选并展示 博客文章， 默认地址为 `/blog/tags/`

分类页 可以根据 原始目录结构 分类展示 博客文章, 默认地址为 `/blog/categories/`

归档页根据文章的创建时间进行归, 默认地址为 `/blog/archives/`

## 国际化支持

如果启用了 国际化，那么博客列表页将会 根据 不同的语言，展示对应语言目录下的博客列表。
即 每个语言下的 文章列表 都是保持独立的。

特别的，如果您的 一篇博客文章 拥有不同的语言版本，请保持在 不同的语言目录下，都有相同的
目录文件结构和文件名。当切换语言时，主题能够正确的切换到对应语言的文章。

::: file-tree

- docs
  - en
    - my-article.md
  - fr
    - my-article.md
  - my-article.md
:::

## 设置博客为主页

默认情况下，主题 将 **首页** 与 **博客页** 分离。

但对于 希望只建立一个 博客站点 的用户而言，可能直接将 博客页 作为 **首页** 是个更好的选择。

主题提供了两种方式来设置博客为主页，满足不同的需求场景：

- **方式一：配置 主页的 `pageLayout` 属性为 `blog`**

```md title="docs/README.md"
---
pageLayout: blog
---
```

此配置会直接将页面应用 博客布局，显示博客文章列表。

这是将主页修改为 博客页的 最简单的方式，但缺点是 缺少灵活性。

- **方式二：配置 主页的 `pageLayout` 属性为 `home`, 添加 `type: blog` 的首页区域类型**

```md title="docs/README.md"
---
pageLayout: home
config:
  - type: blog
---
```

使用这种方式，你不仅可以在首页中添加 博客文章列表，还可以灵活的在页面的其他区域添加不同的内容。

比如，配置首屏为 `banner`，然后紧跟着 博客文章列表：

```md title="docs/README.md"
---
pageLayout: home
config:
  - type: banner
  - type: blog
---
```

更多自定义配置，请参考 [自定义首页](../custom/home.md)。

当使用以上两种方式 将首页配置为 博客页后，由于主题默认依然会生成 地址为`/blog/` 的博客文章列表页，
这导致存在了重复功能的页面，为此，你需要 [主题配置 > 博客配置](../../config/theme.md#blog) 中，
**关闭自动生成博客文章列表页**：

（还可以重新修改 分类页/标签页/归档页的链接地址）

```ts title=".vuepress/config.ts" twoslash
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  theme: plumeTheme({
    blog: {
      postList: false, // 禁止生成博客文章列表页
      // tagsLink: '/blog/tags/',
      // categoriesLink: '/blog/categories/',
      // archiveLink: '/blog/archives/',
    }
  })
})
```

<script setup lang="ts">
import VPBlogProfile from 'vuepress-theme-plume/components/Blog/VPBlogProfile.vue'
import VPPostItem from 'vuepress-theme-plume/components/Blog/VPPostItem.vue'
</script>
