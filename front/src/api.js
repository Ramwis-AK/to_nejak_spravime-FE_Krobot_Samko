// Centrálny API klient pre komunikáciu s Laravel backendom
const BASE = 'http://127.0.0.1:8000/api'

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Accept': 'application/json' },
  })
  if (!res.ok) throw new Error(`Chyba ${res.status}`)
  return res.json()
}