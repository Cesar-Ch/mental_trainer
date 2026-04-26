export function genRootQuestion() {
  const degree = Math.floor(Math.random() * 3) + 2 // 2, 3 o 4
  
  const result = Math.floor(Math.random() * 11) + 2
  const radicand = Math.pow(result, degree)

  return { degree, radicand, result }
}