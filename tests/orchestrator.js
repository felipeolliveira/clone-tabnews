import retry from "async-retry"

const WEB_SERVER_URL = 'http://localhost:3000'

async function waitForWebServer() {
  const fetchFn = async () => {
    try {
      const response = await fetch(`${WEB_SERVER_URL}/api/v1/status`)

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
    } catch (e) {
      throw e
    }
  }

  return retry(
    fetchFn,
    {
      retries: 100,
      maxTimeout: 1000,
      onRetry: (error, attempt) => {
        console.log(`Attempt ${attempt} on fetch status page: ${error.message}`)
      }
    }
  )
}

async function waitForAllServices() {
  await waitForWebServer()
}

export const orchestrator = {
  waitForAllServices
}