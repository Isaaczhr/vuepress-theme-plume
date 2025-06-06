import type {
  AutoFrontmatterObject,
  AutoFrontmatterOptions,
} from '../../shared/index.js'
import dayjs from 'dayjs'

export function createBaseFrontmatter(autoFrontmatter: AutoFrontmatterOptions): AutoFrontmatterObject {
  const res: AutoFrontmatterObject = {}

  if (autoFrontmatter.createTime !== false) {
    res.createTime = (formatTime: string, { createTime }, data) => {
      if (formatTime)
        return formatTime
      if (data.friends || data.pageLayout === 'friends')
        return
      return dayjs(new Date(createTime)).format('YYYY/MM/DD HH:mm:ss')
    }
  }

  return res
}
