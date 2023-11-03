import database from '../../../../../src/database'

test('Connect do database and send a query 1 + 1', async () => {
  const response = await database.query('SELECT 1 + 1 as sum')
  expect(response.rows[ 0 ].sum).toBe(2)
})

test('GET to /api/v1/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status', { method: 'GET' })
  expect(response.status).toBe(200)
})