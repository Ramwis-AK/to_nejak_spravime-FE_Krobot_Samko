const BASE = 'http://127.0.0.1:8000/api'

// GET požiadavka
export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Accept': 'application/json' },
  })
  if (!res.ok) throw new Error(`Chyba ${res.status}`)
  return res.json()
}

// POST požiadavka (formulár). 422 = validačná chyba, 429 = príliš veľa pokusov (rate limit)
export async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 429) throw new Error('Príliš veľa pokusov, skúste o chvíľu.')
    throw new Error(data.message || `Chyba ${res.status}`)
  }
  return data
}