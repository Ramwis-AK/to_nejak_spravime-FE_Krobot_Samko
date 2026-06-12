// Centrálny API klient pre komunikáciu s Laravel backendom
const BASE = 'http://127.0.0.1:8000/api'

// GET požiadavka
export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Accept': 'application/json' },
  })
  if (!res.ok) throw new Error(`Chyba ${res.status}`)
  return res.json()
}

// POST požiadavka (napr. odoslanie formulára)
export async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    // Laravel pri validačnej chybe (422) vracia `message`
    throw new Error(data.message || `Chyba ${res.status}`)
  }
  return data
}