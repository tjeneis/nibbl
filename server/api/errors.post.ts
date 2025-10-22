export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const errorData = await readBody(event)
    
    // In a real application, you would send this to:
    // - Sentry
    // - LogRocket
    // - DataDog
    // - Your own logging service
    
    console.error('Error reported:', {
      ...errorData,
      timestamp: new Date().toISOString(),
      userAgent: getHeader(event, 'user-agent'),
      ip: getClientIP(event)
    })
    
    // For now, just return success
    return { success: true }
  } catch (error) {
    console.error('Failed to process error report:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
