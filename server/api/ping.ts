import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async event => {
  // Verify that this is a Vercel Cron request
  const authHeader = getHeader(event, 'authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  // Simple query to keep the connection alive
  const client = await serverSupabaseClient<Database>(event)
  await client.from('user_profiles').select('*').limit(1)

  return { success: true }
}) 