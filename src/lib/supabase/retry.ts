interface RetryOptions {
  maxAttempts?: number
  initialDelay?: number
  maxDelay?: number
  backoffFactor?: number
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 5000,
  backoffFactor: 2
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  let attempt = 0
  let delay = opts.initialDelay!

  while (attempt < opts.maxAttempts!) {
    try {
      return await fn()
    } catch (error) {
      attempt++
      
      if (attempt === opts.maxAttempts!) {
        throw error
      }

      // Calculate next delay with exponential backoff
      delay = Math.min(
        delay * opts.backoffFactor!,
        opts.maxDelay!
      )

      // Add some jitter to prevent thundering herd
      const jitter = delay * (0.5 + Math.random() * 0.5)
      
      await new Promise(resolve => setTimeout(resolve, jitter))
    }
  }

  throw new Error('Retry failed')
}