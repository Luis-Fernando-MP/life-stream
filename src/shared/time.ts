import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale(es)
dayjs.extend(relativeTime)

export function fromDate(date: string): string {
  return dayjs(date).fromNow()
}
