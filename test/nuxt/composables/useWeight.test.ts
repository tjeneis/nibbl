import { describe, it, expect, vi } from 'vitest'
import { useWeight } from '~/composables/useWeight'

// Mock Supabase client
const mockClient = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        order: vi.fn(() => ({ data: [], error: null }))
      }))
    })),
    insert: vi.fn(() => ({ error: null })),
    update: vi.fn(() => ({
      eq: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => ({ data: {}, error: null }))
          }))
        }))
      }))
    })),
    delete: vi.fn(() => ({
      eq: vi.fn(() => ({
        eq: vi.fn(() => ({ error: null }))
      }))
    }))
  }))
}

// Mock Nuxt composables
vi.mock('#app', () => ({
  useSupabaseClient: () => mockClient,
  useSupabaseUser: () => ({ value: { sub: 'test-user-id' } }),
  useErrorHandler: () => ({
    handleApiError: vi.fn((error) => error)
  })
}))

describe('useWeight', () => {
  it('should add weight entry', async () => {
    const { addWeightEntry } = useWeight()
    
    const weightData = {
      date: '2024-01-01',
      weight: 70,
      fat_percentage: 15
    }

    await expect(addWeightEntry(weightData)).resolves.not.toThrow()
  })

  it('should get weight entries', async () => {
    const { getWeightEntries } = useWeight()
    
    const entries = await getWeightEntries()
    expect(Array.isArray(entries)).toBe(true)
  })

  it('should handle authentication errors', async () => {
    // Mock unauthenticated user
    vi.mocked(global.useSupabaseUser).mockReturnValue(ref(null))
    
    const { addWeightEntry } = useWeight()
    
    await expect(addWeightEntry({ date: '2024-01-01', weight: 70 }))
      .rejects.toThrow('User not authenticated')
  })

  it('should update weight entry', async () => {
    const { updateWeightEntry } = useWeight()
    
    const updateData = { weight: 75 }
    const result = await updateWeightEntry('test-id', updateData)
    
    expect(result).toBeDefined()
  })

  it('should delete weight entry', async () => {
    const { deleteWeightEntry } = useWeight()
    
    await expect(deleteWeightEntry('test-id')).resolves.not.toThrow()
  })
})
