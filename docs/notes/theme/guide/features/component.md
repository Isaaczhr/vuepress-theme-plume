---
title: 组件
icon: radix-icons:component-2
createTime: 2024/03/06 09:42:42
outline: 2
permalink: /guide/features/component/
---

## 概述

VuePress 支持在 Markdown 文件中使用 组件。

主题提供了一些具有通用性的组件，可以在任何地方使用。

## 徽章 <Badge type="tip" text="badge" />

使用 `<Badge>` 组件来显示 行内信息，如状态或标签。

将你想显示的内容传递给 `<Badge>` 组件的 `text` 属性。

### Props

| 名称         | 类型      | 默认值             | 说明                                                               |
| ------------ | -------- | ------------------ | ------------------------------------------------------------------ |
| type         | `string` | `'tip'`            | 类型，内置值: `'info' \| 'tip' \| 'warning' \| 'danger'`，允许自定义 |
| text         | `string` | `''`               | 文本                                                               |
| color        | `string` | `''`               | 文本颜色                                                           |
| bg-color     | `string` | `''`               | 背景颜色                                                           |
| border-color | `string` | `'transparent'`    | 边框颜色                                                           |

**输入：**

```md :no-line-numbers
- VuePress - <Badge type="info" text="v2" />
- VuePress - <Badge type="tip" text="v2" />
- VuePress - <Badge type="warning" text="v2" />
- VuePress - <Badge type="danger" text="v2" />
- VuePress - <Badge text="v2" color="red" bg-color="#008c8c" />
```

**输出：**

- VuePress - <Badge type="info" text="v2" />
- VuePress - <Badge type="tip" text="v2" />
- VuePress - <Badge type="warning" text="v2" />
- VuePress - <Badge type="danger" text="v2" />
- VuePress - <Badge text="v2" color="red" bg-color="#008c8c" />

使用自定义`type`，可以实现更丰富的表现。

**输入：**

1. 在主题任意样式文件中，添加预定的样式：

```css
/* 浅色主题 */
.vp-badge.important {
  color: #cccccc;
  background-color: #f40f40;
  border-color: transparent;
}

/* 深色主题 */
[data-theme="dark"] .vp-badge.important {
  color: #f40f40;
  background-color: #ffffff;
  border-color: transparent;
}

/**
 important 为自定义 type 类型
*/
```

2. 使用自定义`type`：

```md :no-line-numbers
- VuePress - <Badge type="important" text="v2" />
```

**输出：**

- VuePress - <Badge type="important" text="v2" />

## 图标

支持 iconify 所有图标，通过 icon name 加载图标。

可在 [iconify search](https://icon-sets.iconify.design/) 搜索图标使用。

### Props

| 名称  | 类型   | 默认值           | 说明     |
| ----- | ------ | ---------------- | -------- |
| name  | string | `''`             | 图标名   |
| color | string | `'currentcolor'` | 图标颜色 |
| size  | string | `'1em'`          | 图标大小 |

**输入：**

```md :no-line-numbers
- home - <Icon name="material-symbols:home" color="currentColor" size="1em" />
- vscode - <Icon name="skill-icons:vscode-dark" size="2em" />
- twitter - <Icon name="skill-icons:twitter" size="2em" />
```

**输出：**

- home - <Icon name="material-symbols:home" color="currentColor" size="1em" />
- vscode - <Icon name="skill-icons:vscode-dark" size="2em" />
- twitter - <Icon name="skill-icons:twitter" size="2em" />

## “隐秘”文本

使用 `<Plot>` 组件显示 [“隐秘”文本](../markdown/plot.md) ，能够更灵活的控制行为。

该组件默认不启用，你需要在 theme 配置中启用。

```ts title=".vuepress/config.ts"
export default defineUserConfig({
  theme: plumeTheme({
    plugins: {
      markdownPower: {
        plot: true,
      },
    }
  })
})
```

### Props

| 名称    | 类型                                        | 默认值    | 说明                       |
| ------- | ------------------------------------------- | --------- | -------------------------- |
| trigger | `'hover' \| 'click'`                        | `'hover'` | 鼠标悬停触发，或者点击触发 |
| mask    | `string \| { light: string, dark: string }` | `#000`    | 遮罩颜色                   |
| color   | `string \| { light: string, dark: string }` | `#fff`    | 文本颜色                   |

**输入：**

```md :no-line-numbers
- 鼠标悬停 - <Plot>悬停时可见</Plot>
- 点击 - <Plot trigger="click">点击时可见</Plot>
```

**输出：**

- 鼠标悬停 - <Plot>悬停时可见</Plot>
- 点击 - <Plot trigger="click">点击时可见</Plot>

## 卡片

使用 `<Card>` 组件在页面中显示卡片。

也可以使用 markdown [卡片容器](../markdown/card.md) 语法，替代 `<Card>` 组件。

### Props

| 名称  | 类型                        | 默认值 | 说明                                                             |
| ----- | --------------------------- | ------ | ---------------------------------------------------------------- |
| title | `string`                    | `''`   | 标题                                                             |
| icon  | `string \| { svg: string }` | `''`   | 显示在标题左侧的图标，支持 iconify 所有图标，也可以使用 图片链接 |

### 插槽

| 名称    | 说明       |
| ------- | ---------- |
| default | 卡片内容   |
| title   | 自定义标题 |

**输入：**

```md :no-line-numbers
<Card title="卡片标题" icon="twemoji:astonished-face">
  这里是卡片内容。
</Card>

<Card>
  <template #title>
    <p style="color: red">卡片标题</p>
  </template>
  这里是卡片内容。
</Card>
```

**输出：**

<Card title="卡片标题" icon="twemoji:astonished-face">
  这里是卡片内容。
</Card>

<Card>
  <template #title>
    <p style="color: red;margin:0">卡片标题</p>
  </template>
  这里是卡片内容。
</Card>

## 链接卡片

使用 `<LinkCard>` 组件在页面中显示链接卡片。

### Props

| 名称        | 类型                        | 默认值 | 说明                                                             |
| ----------- | --------------------------- | ------ | ---------------------------------------------------------------- |
| title       | `string`                    | `''`   | 标题                                                             |
| icon        | `string \| { svg: string }` | `''`   | 显示在标题左侧的图标，支持 iconify 所有图标，也可以使用 图片链接 |
| href        | `string`                    | `''`   | 链接                                                             |
| description | `string`                    | `''`   | 详情                                                             |

### 插槽

| 名称    | 说明         |
| ------- | ------------ |
| default | 卡片详情内容 |
| title   | 自定义标题   |

**输入：**

```md :no-line-numbers
<LinkCard title="卡片标题" href="/" description="这里是卡片内容" />
<LinkCard icon="twemoji:astonished-face" title="卡片标题" href="/" />
```

**输出：**

<LinkCard title="卡片标题" href="/" description="这里是卡片内容" />
<LinkCard icon="twemoji:astonished-face" title="卡片标题" href="/" />

## 图片卡片

使用 `<ImageCard>` 组件在页面中显示图片卡片。

图片卡片 有别于 markdown 的 普通插入图片方式，它展示与图片相关的更多信息，包括标题、描述、作者、链接等。
适用于如 摄影作品、设计作品、宣传海报 等场景。

### Props

| 名称        | 类型                       | 默认值 | 说明                                    |
| ----------- | -------------------------- | ------ | --------------------------------------- |
| image       | `string`                   | `''`   | 必填，图片链接                          |
| title       | `string`                   | `''`   | 可选，标题 (展示其它信息需要依赖此属性) |
| description | `string`                   | `''`   | 可选，描述                              |
| author      | `string`                   | `''`   | 可选，作者                              |
| href        | `string`                   | `''`   | 可选，链接                              |
| date        | `string \| Date \| number` | `''`   | 可选，日期                              |

**输入：**

```md :no-line-numbers
<ImageCard
  image="https://cn.bing.com/th?id=OHR.AlfanzinaLighthouse_ZH-CN9704515669_1920x1080.webp"
  title="阿尔凡齐纳灯塔，阿尔加维，葡萄牙"
  description="今天照片中的灯塔位于葡萄牙南部海岸阿尔加维的卡沃埃罗。阿尔凡齐纳灯塔建于1919年，照耀着大海，帮助船只在该地区周围危险的水域航行。这座灯塔是著名的旅游胜地，同时也是该地区与海洋紧密联系的象征。如果你有幸住在灯塔附近，那么本周末就是拜访灯塔的最佳时机。"
  href="/"
  author="Andreas Kunz"
  date="2024/08/16"
/>
```

**输出：**

<ImageCard
  image="https://cn.bing.com/th?id=OHR.AlfanzinaLighthouse_ZH-CN9704515669_1920x1080.webp"
  title="阿尔凡齐纳灯塔，阿尔加维，葡萄牙"
  description="今天照片中的灯塔位于葡萄牙南部海岸阿尔加维的卡沃埃罗。阿尔凡齐纳灯塔建于1919年，照耀着大海，帮助船只在该地区周围危险的水域航行。这座灯塔是著名的旅游胜地，同时也是该地区与海洋紧密联系的象征。如果你有幸住在灯塔附近，那么本周末就是拜访灯塔的最佳时机。"
  href="/"
  author="Andreas Kunz"
  date="2024/08/16"
/>

还可以放到 `<CardGrid>` 组件中。

**输入：**

```md :no-line-numbers
<CardGrid>
  <ImageCard
    image="https://cn.bing.com/th?id=OHR.AlfanzinaLighthouse_ZH-CN9704515669_1920x1080.webp"
    title="阿尔凡齐纳灯塔，阿尔加维，葡萄牙"
    description="..."
    href="/"
    author="Andreas Kunz"
    date="2024/08/16"
  />
  <ImageCard
    image="https://cn.bing.com/th?id=OHR.AlfanzinaLighthouse_ZH-CN9704515669_1920x1080.webp"
    title="阿尔凡齐纳灯塔，阿尔加维，葡萄牙"
    description="..."
    href="/"
    author="Andreas Kunz"
    date="2024/08/16"
  />
</CardGrid>
```

**输出：**

<CardGrid>
  <ImageCard
    image="https://cn.bing.com/th?id=OHR.AlfanzinaLighthouse_ZH-CN9704515669_1920x1080.webp"
    title="阿尔凡齐纳灯塔，阿尔加维，葡萄牙"
    description="今天照片中的灯塔位于葡萄牙南部海岸阿尔加维的卡沃埃罗。阿尔凡齐纳灯塔建于1919年，照耀着大海，帮助船只在该地区周围危险的水域航行。这座灯塔是著名的旅游胜地，同时也是该地区与海洋紧密联系的象征。如果你有幸住在灯塔附近，那么本周末就是拜访灯塔的最佳时机。"
    href="/"
    author="Andreas Kunz"
    date="2024/08/16"
  />
  <ImageCard
    image="https://cn.bing.com/th?id=OHR.AlfanzinaLighthouse_ZH-CN9704515669_1920x1080.webp"
    title="阿尔凡齐纳灯塔，阿尔加维，葡萄牙"
    description="今天照片中的灯塔位于葡萄牙南部海岸阿尔加维的卡沃埃罗。阿尔凡齐纳灯塔建于1919年，照耀着大海，帮助船只在该地区周围危险的水域航行。这座灯塔是著名的旅游胜地，同时也是该地区与海洋紧密联系的象征。如果你有幸住在灯塔附近，那么本周末就是拜访灯塔的最佳时机。"
    href="/"
    author="Andreas Kunz"
    date="2024/08/16"
  />
</CardGrid>

[查看 照片类作品示例](../../../../1.示例/照片类作品示例.md)

## 卡片排列容器

当你需要将多个卡片排列，可以使用 `<CardGrid>` 组件。在空间足够时，多个卡片会自动排列。

### Props

| 名称 | 类型                                             | 默认值 | 说明           |
| :--- | :----------------------------------------------- | :----- | :------------- |
| cols | `number \| Record<'sm' \| 'md' \| 'lg', number>` | `2`    | 卡片排列列数。 |

**输入：**

```md :no-line-numbers
<CardGrid>
  <Card title="卡片标题" icon="twemoji:astonished-face">
    这里是卡片内容。
  </Card>
  <Card title="卡片标题" icon="twemoji:astonished-face">
    这里是卡片内容。
  </Card>
</CardGrid>

<CardGrid>
  <LinkCard title="卡片标题" href="/" />
  <LinkCard icon="twemoji:astonished-face" title="卡片标题" href="/" />
</CardGrid>
```

**输出：**

<CardGrid>
  <Card title="卡片标题" icon="twemoji:astonished-face">
    这里是卡片内容。
  </Card>
  <Card title="卡片标题" icon="twemoji:astonished-face">
    这里是卡片内容。
  </Card>
</CardGrid>

<CardGrid>
  <LinkCard title="链接卡片" href="/" />
  <LinkCard icon="twemoji:astonished-face" title="链接卡片" href="/" />
</CardGrid>

<style>
/* 浅色主题 */
.vp-badge.important {
  color: #cccccc;
  background-color: #f40f40;
  border-color: transparent;
}

/* 深色主题 */
[data-theme="dark"] .vp-badge.important {
  color: #f40f40;
  background-color: #ffffff;
  border-color: transparent;
}
</style>
