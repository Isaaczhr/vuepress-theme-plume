import type { ThemeBuiltinPlugins, ThemeOptions } from '../../shared/index.js'
import { isEmptyObject, isPlainObject } from '@pengzhanbo/utils'
import { isPackageExists } from 'local-pkg'
import { getUserAgent, resolveCommand } from 'package-manager-detector'
import { colors } from 'vuepress/utils'
import { logger } from '../utils/index.js'

const DEPENDENCIES: Record<string, string[]> = {
  twoslash: ['@vuepress/shiki-twoslash'],

  chartjs: ['chart.js'],
  echarts: ['echarts'],
  markmap: ['markmap-lib', 'markmap-toolbar', 'markmap-view'],
  mermaid: ['mermaid'],
  flowchart: ['flowchart.ts'],

  artPlayer: ['artplayer'],
  mathjax: ['mathjax-full'],
}

/**
 * 部分功能需要手动安装依赖，
 * 检查环境中是否缺少依赖
 */
export function detectDependencies(options: ThemeOptions, plugins: ThemeBuiltinPlugins) {
  const shouldInstall: Record<string, string[]> = {}

  const markdown = options.markdown || {}
  const mdPower = isPlainObject(plugins.markdownPower) ? plugins.markdownPower : {}
  const mdEnhance = isPlainObject(plugins.markdownEnhance) ? plugins.markdownEnhance : {}

  const add = (name: string) => {
    const list = DEPENDENCIES[name].filter(dep => !isPackageExists(dep))
    if (list.length)
      shouldInstall[name] = list
  }

  if (options.codeHighlighter && options.codeHighlighter.twoslash)
    add('twoslash')

  ;['chartjs', 'echarts', 'markmap', 'mermaid', 'flowchart'].forEach((dep) => {
    if (markdown[dep] || mdEnhance[dep])
      add(dep)
  })

  const math = markdown.math || plugins.markdownMath
  if (math && math.type === 'mathjax')
    add('mathjax')

  if (markdown.artPlayer || mdPower.artPlayer)
    add('artPlayer')

  if (isEmptyObject(shouldInstall))
    return

  const features = Object.keys(shouldInstall)
  const dependencies = Object.values(shouldInstall).flat()

  logger.warn(`\nEnabling features such as ${
    features.map(feat => colors.green(feat)).join(', ')
  } requires the installation of the following dependencies: ${
    dependencies.map(dep => colors.yellow(dep)).join(', ')
  }`)

  const agent = getUserAgent()
  if (agent) {
    const { command = '', args = [] } = resolveCommand(agent, 'add', dependencies) || {}

    logger.info(`Run the command to install:\n  ${
      colors.cyan(`${command} ${
        args.join(' ').replace(DEPENDENCIES.twoslash[0], `${DEPENDENCIES.twoslash[0]}@next`)
      }`)
    }`)
  }
}
