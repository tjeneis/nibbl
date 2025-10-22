import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'

/**
 * Ping endpoint to keep Supabase from pausing the project
 * 
 * This endpoint is designed to prevent Supabase from pausing the project due to inactivity.
 * Supabase pauses projects that haven't received any requests for a certain period of time
 * to conserve resources. This endpoint should be called periodically (e.g., via Vercel Cron)
 * to maintain an active connection and prevent the project from being paused.
 * 
 * The endpoint performs a simple database query to keep the connection alive and returns
 * a success response. It's protected by a CRON_SECRET to ensure only authorized cron jobs
 * can trigger it.
 * 
 * @param event - The Nuxt server event
 * @returns { success: true } - Success response
 */
export default defineEventHandler(async event => {
  // Verify that this is a Vercel Cron request
  // This ensures only authorized cron jobs can trigger this endpoint
  const authHeader = getHeader(event, 'authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  // Simple query to keep the Supabase connection alive
  // This prevents the project from being paused due to inactivity
  const client = await serverSupabaseClient<Database>(event)
  await client.from('user_profiles').select('*').limit(1)

  return { success: true }
}) 