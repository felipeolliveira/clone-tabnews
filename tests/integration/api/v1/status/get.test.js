test('GET to /api/v1/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status', { method: 'GET' })

  expect(response.status).toBe(200)

  const { dependencies, updated_at } = await response.json()

  expect(updated_at).toBeDefined()
  const parsedDate = new Date(updated_at).toISOString()
  expect(parsedDate).toEqual(updated_at)
  expect(dependencies.database.status).toBe('healthy')
  expect(dependencies.database.version).toEqual("16.0")
  expect(dependencies.database.max_connections).toBeGreaterThan(0)
  expect(dependencies.database.opened_connections).toEqual(1)
}) 