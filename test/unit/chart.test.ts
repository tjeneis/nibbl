import { describe, it, expect } from 'vitest'
import { getTimeTicks, pickLabelTicks } from '../../app/utils/chart'
import { parseDate } from '../../app/utils/date'

const ts = (...dates: string[]) => dates.map(date => parseDate(date).getTime())

describe('getTimeTicks', () => {
  it('puts a tick on every entry for short spans', () => {
    const timestamps = ts('2025-07-27', '2025-07-29', '2025-07-31', '2025-08-06', '2025-08-12')
    expect(getTimeTicks(timestamps)).toEqual({ ticks: timestamps, monthly: false })
  })

  it('uses evenly spaced month starts for long spans', () => {
    const { ticks, monthly } = getTimeTicks(ts('2025-06-09', '2026-03-28', '2026-09-22'))
    expect(monthly).toBe(true)
    expect(ticks).toEqual(ts('2025-07-01', '2025-10-01', '2026-01-01', '2026-04-01', '2026-07-01'))
  })

  it('handles no entries', () => {
    expect(getTimeTicks([])).toEqual({ ticks: [], monthly: false })
  })
})

describe('pickLabelTicks', () => {
  it('always labels the first and last tick', () => {
    const ticks = ts('2026-07-28', '2026-07-30', '2026-07-31', '2026-08-02', '2026-09-22')
    const labels = pickLabelTicks(ticks)
    expect(labels[0]).toBe(ticks[0])
    expect(labels[labels.length - 1]).toBe(ticks[ticks.length - 1])
  })

  it('skips ticks too close to a neighbouring label', () => {
    expect(pickLabelTicks(ts('2025-07-27', '2025-07-29', '2025-07-31', '2025-08-06', '2025-08-12')))
      .toEqual(ts('2025-07-27', '2025-07-31', '2025-08-06', '2025-08-12'))
  })
})
