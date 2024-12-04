import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale(es)
dayjs.extend(relativeTime)

export function fromDate(date: string): string {
  return dayjs(date).fromNow()
}

dayjs.extend(customParseFormat)

export function toDay(date: string): string {
  return dayjs(date).format('dddd D [de] MMMM [de] YYYY')
}
