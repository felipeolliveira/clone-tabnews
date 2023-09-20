function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return "Erro"
  }

  return a + b
}

module.exports = sum