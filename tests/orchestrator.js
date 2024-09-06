import retry from "async-retry"

async function waitForWebServer() {
  const fetchFn = async () => {
    const response = await fetch('http://localhost:3000/api/v1/status', { method: 'GET' })
    await response.json()
  }

  return retry(
    fetchFn,
    { retries: 100, maxTimeout: 1000 }
  )
}

async function waitForAllServices() {
  await waitForWebServer()
}

export const orchestrator = {
  waitForAllServices
}