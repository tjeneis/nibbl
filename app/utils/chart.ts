import type { XAXisComponentOption } from 'echarts'
import { parseDate } from './date'

const DAY_MS = 24 * 60 * 60 * 1000

/** Up to this many days, ticks sit on the entry dates; above it, on the first of the month */
const ENTRY_TICKS_MAX_SPAN_DAYS = 120

/** Aim for about this many month ticks on long spans */
const MAX_MONTH_TICKS = 5

/** Aim for at most this many labels, so they don't overlap on a narrow chart */
const MAX_LABELS = 5

/**
 * Pick which ticks get a label: always the first and last, plus ticks spread out so that
 * neighbouring labels are at least 1/MAX_LABELS of the span apart
 * @param ticks - Tick timestamps sorted ascending
 * @returns The tick timestamps to label
 */
export const pickLabelTicks = (ticks: number[]): number[] => {
  const first = ticks[0]
  const last = ticks[ticks.length - 1]
  if (first === undefined || last === undefined || ticks.length <= 2) return ticks

  const minGap = (last - first) / MAX_LABELS
  const labels = [first]
  for (const tick of ticks.slice(1, -1)) {
    if (tick - labels[labels.length - 1]! >= minGap && last - tick >= minGap) labels.push(tick)
  }
  labels.push(last)
  return labels
}

/**
 * Get x-axis tick timestamps: every entry date for short spans, evenly spaced month starts for longer ones
 * @param timestamps - Entry timestamps sorted ascending
 * @returns The tick timestamps and whether they are month ticks
 */
export const getTimeTicks = (timestamps: number[]): { ticks: number[], monthly: boolean } => {
  const first = timestamps[0]
  const last = timestamps[timestamps.length - 1]
  if (first === undefined || last === undefined) return { ticks: [], monthly: false }
  if ((last - first) / DAY_MS <= ENTRY_TICKS_MAX_SPAN_DAYS) return { ticks: timestamps, monthly: false }

  const start = new Date(first)
  const end = new Date(last)
  const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
  const step = Math.max(1, Math.ceil(totalMonths / MAX_MONTH_TICKS))

  const ticks: number[] = []
  for (let month = 1; month <= totalMonths; month += step) {
    ticks.push(new Date(start.getFullYear(), start.getMonth() + month, 1).getTime())
  }
  return { ticks, monthly: true }
}

/**
 * Build an x-axis for series whose x values are entry timestamps (see parseDate)
 * The axis runs from the first to the last entry, with ticks from getTimeTicks: DD-MM labels
 * on a spread-out selection of the entry dates, or localized short month and year labels
 * (e.g. "aug 26") on month ticks.
 * A value axis is used because ECharts 6 crashes on custom tick values on a time axis.
 * @param entries - Entries sorted by date ascending
 * @param locale - Locale for month names
 * @returns ECharts x-axis options
 */
export const getTimeAxis = (entries: { date: string }[], locale: string): XAXisComponentOption => {
  const timestamps = entries.map(entry => parseDate(entry.date).getTime())
  const { ticks, monthly } = getTimeTicks(timestamps)
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'short', year: '2-digit' })

  return {
    type: 'value',
    min: 'dataMin',
    max: 'dataMax',
    splitLine: { show: false },
    axisTick: {
      show: true,
      customValues: ticks
    },
    axisLabel: {
      customValues: monthly ? ticks : pickLabelTicks(ticks),
      formatter: (value: number) => {
        const date = new Date(value)
        if (monthly) return monthFormat.format(date)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        return `${day}-${month}`
      }
    }
  }
}
