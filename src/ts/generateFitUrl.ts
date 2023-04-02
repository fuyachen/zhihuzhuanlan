import { ColumnProps } from "@/store"
import avatarUrl from "@/assets/column.jpg"

export function generateFitUrl(
  column: ColumnProps,
  width: number,
  height: number
) {
  if (column.avatar) {
    column.avatar.fitUrl =
      column.avatar.url +
      `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
  } else {
    column.avatar = {
      fitUrl: avatarUrl,
    }
  }
}
