---
title: 图标
createTime: 2024/09/30 14:49:39
icon: grommet-icons:emoji
permalink: /guide/markdown/iconify/
badge:
  text: 变更
  type: warning
---

::: warning 图标语法糖在 `1.0.0-rc.144` 版本中进行了破坏性变更。

`:[collect:name size/color]:` 语法糖已弃用，请使用 `::collect:name =size /color::` 代替。

主题计划在未来的版本中，支持如 `iconfont` / `fontawesome` / `lucide` 等图标库的图标，原有语法糖
不足以支持新的扩展，因此此破坏性变更是必要的。

旧的语法在近期的版本中依然支持，但不再推荐使用，且在未来会删除。

主题会检测是否使用旧的语法，如果使用，会在控制台输出警告信息和修改建议，请根据修改建议进行调整。

:::

## 概述

在 Markdown 文件中使用 [iconify](https://iconify.design/) 的图标。

主题一方面提供了[`<Icon />`](../components/icon.md) 组件来支持在 markdown 中使用图标；
另一方面，主题还提供了图标的 markdown 语法，以更简单的方式，在 Markdown 中使用图标。

为了更好的使用该功能，主题推荐你安装 `@iconify/json` 依赖。主题会自动解析 `@iconify/json` 中的图标数据，
将有使用的图标打包为本地资源，以获得更好的访问体验。

::: npm-to

```sh
npm install @iconify/json
```

:::

## 语法

```md
::collect:name::
```

设置图标大小和颜色

```md
::collect:name =size::
::collect:name /color::
::collect:name =size /color::
```

`iconify` 拥有非常多的图标，这些图标被分组为不同的 `collect`，每个 `collect` 都有自己的
图标。

你可以从 <https://icon-sets.iconify.design/> 中获取 collect 和 name。

## 示例

输入：

```md
::ion:logo-markdown::
```

输出：

::ion:logo-markdown::

该语法为行内语法，因此，你可以在同一行中跟其他 markdown 语法 一起使用。

输入：

```md
github: ::tdesign:logo-github-filled::
修改颜色：::tdesign:logo-github-filled /#f00::
修改大小：::tdesign:logo-github-filled =36px::
修改大小颜色：::tdesign:logo-github-filled =36px /#f00::

彩色图标 ::skill-icons:vscode-dark =36px::
```

输出：

github: ::tdesign:logo-github-filled::
修改颜色：::tdesign:logo-github-filled /#f00::
修改大小：::tdesign:logo-github-filled =36px::
修改大小颜色：::tdesign:logo-github-filled =36px /#f00::

彩色图标 ::skill-icons:vscode-dark =36px::
