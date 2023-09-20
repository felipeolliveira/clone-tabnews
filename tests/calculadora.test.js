const calc = require('../src/models/calc.js')

test('somar 2 + 2 deve retornar 4', () => {
  const result = calc(2, 2)
  expect(result).toBe(4)
})

test('somar 5 + 100 deve retornar 105', () => {
  const result = calc(5, 100)
  expect(result).toBe(105)
})

test("somar 'banana' + 100 deve retornar 'Erro'", () => {
  const result = calc('banana', 100)
  expect(result).toBe('Erro')
})
test("somar 100 + 'banana' deve retornar 'Erro'", () => {
  const result = calc(100, 'banana')
  expect(result).toBe('Erro')
})