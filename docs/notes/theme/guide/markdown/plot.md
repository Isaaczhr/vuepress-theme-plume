---
title: 隐秘文本
createTime: 2024/09/30 14:45:35
icon: weui:eyes-off-outlined
permalink: /guide/markdown/plot/
---

## 概述

有时候，你不想直接把文本内容毫无保留的展示出来，想要保留一些 隐秘性，
可能是为了引起读者的好奇心，也可能纯粹是故意增加点阅读障碍，让文章变得更加有趣。

为了满足这种小小的心思，主题提供了一个 **“隐秘”文本** 的有趣小功能。它看起来像这样：

:::demo-wrapper
你知道吗， !!鲁迅!! 曾说过：“ !!我没说过这句话！!! ” 令我醍醐灌顶，深受启发，浑身迸发出无可匹敌的
力量！于是，!!我在床上翻了个身!! ！
:::

读者不能直接阅读到完整的内容，部分的内容被 “遮住”，需要鼠标悬停到内容上，才能看到被遮住的内容。

## 配置

该功能默认不启用，你需要在 `theme` 配置中启用。

```ts title=".vuepress/config.ts"
export default defineUserConfig({
  theme: plumeTheme({
    markdown: {
      plot: true, // [!code ++]
    }
  })
})
```

`markdownPower.plot` 支持传入 `boolean | PlotOptions` 类型

```ts
interface PlotOptions {
  /**
   * 是否启用 `!! !!`  markdown （该标记为非标准标记，脱离插件将不生效）
   * 如果设置为 false， 则表示不启用该标记，只能使用 <Plot /> 组件
   * @default true
   */
  tag?: boolean

  /**
   * 遮罩层颜色
   */
  mask?: string | { light: string, dark: string }

  /**
   * 文本颜色
   */
  color?: string | { light: string, dark: string }

  /**
   * 触发方式
   *
   * @default 'hover'
   */
  trigger?: 'hover' | 'click'
}
```

## 语法

```md
!!需要隐秘的内容!!
```

如果不想使用 非标准的 `!! !!` 标记语法，你可以将 `plot.tag` 设置为 `false` ，
然后使用 [`<Plot />`](../components/plot.md) 组件替代。

## 示例

输入：

```md
你知道吗， !!鲁迅!! 曾说过：“ !!我没说过这句话！!! ” 令我醍醐灌顶，深受启发，浑身迸发出无可匹敌的
力量！于是，!!我在床上翻了个身!! ！
```

输出：

:::demo-wrapper
你知道吗， !!鲁迅!! 曾说过：“ !!我没说过这句话！!! ” 令我醍醐灌顶，深受启发，浑身迸发出无可匹敌的
力量！于是，!!我在床上翻了个身!! ！
:::
