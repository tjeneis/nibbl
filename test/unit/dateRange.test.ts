import { describe, it, expect } from 'vitest'
import { filterByDateRange, getRangeStartDate, parseDate } from '../../app/utils/date'

describe('getRangeStartDate', () => {
  const today = new Date(2026, 8, 22) // 22 Sep 2026

  it('returns null for all', () => {
    expect(getRangeStartDate('all', today)).toBeNull()
  })

  it('counts back whole months', () => {
    expect(getRangeStartDate('1m', today)).toBe('2026-08-22')
    expect(getRangeStartDate('3m', today)).toBe('2026-06-22')
    expect(getRangeStartDate('6m', today)).toBe('2026-03-22')
  })

  it('crosses the year boundary', () => {
    expect(getRangeStartDate('1y', today)).toBe('2025-09-22')
    expect(getRangeStartDate('3m', new Date(2026, 0, 15))).toBe('2025-10-15')
  })

  it('clamps to the end of shorter months', () => {
    expect(getRangeStartDate('3m', new Date(2026, 4, 31))).toBe('2026-02-28')
    expect(getRangeStartDate('1y', new Date(2024, 1, 29))).toBe('2023-02-28')
  })
})

describe('filterByDateRange', () => {
  const today = new Date(2026, 8, 22)
  const entries = [
    { date: '2025-09-21' },
    { date: '2025-09-22' },
    { date: '2026-06-01' },
    { date: '2026-09-22' }
  ]

  it('returns all entries for all', () => {
    expect(filterByDateRange(entries, 'all', today)).toBe(entries)
  })

  it('keeps entries on or after the start date', () => {
    expect(filterByDateRange(entries, '1y', today).map(e => e.date))
      .toEqual(['2025-09-22', '2026-06-01', '2026-09-22'])
    expect(filterByDateRange(entries, '3m', today).map(e => e.date))
      .toEqual(['2026-09-22'])
  })
})

describe('parseDate', () => {
  it('parses YYYY-MM-DD as a local date', () => {
    const date = parseDate('2025-08-12')
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2025, 7, 12])
  })

  it('can anchor a range to the latest entry', () => {
    const entries = [{ date: '2025-06-14' }, { date: '2025-07-20' }, { date: '2025-08-12' }]
    expect(filterByDateRange(entries, '1m', parseDate('2025-08-12')).map(e => e.date))
      .toEqual(['2025-07-20', '2025-08-12'])
  })
})
