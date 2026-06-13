const BASE = 'http://127.0.0.1:8000/api'

// token držíme v localStorage (prežije refresh stránky)
export function getToken() { return localStorage.getItem('nti_token') }
export function setToken(t) { localStorage.setItem('nti_token', t) }
export function clearToken() { localStorage.removeItem('nti_token') }

// zostaví hlavičky vrátane Bearer tokenu, ak je používateľ prihlásený
function headers(json = true) {
  const h = { 'Accept': 'application/json' }
  if (json) h['Content-Type'] = 'application/json'
  const t = getToken()
  if (t) h['Authorization'] = `Bearer ${t}`
  return h
}

// spoločné spracovanie odpovede + jednotné chyby
async function handle(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 401) throw new Error(data.message || 'Neprihlásený.')
    if (res.status === 403) throw new Error('Nemáš oprávnenie.')
    if (res.status === 429) throw new Error('Príliš veľa pokusov, skús neskôr.')
    if (res.status === 422 && data.errors) throw new Error(Object.values(data.errors)[0][0])
    throw new Error(data.message || `Chyba ${res.status}`)
  }
  return data
}

export const api = {
  get:  (p)    => fetch(`${BASE}${p}`, { headers: headers(false) }).then(handle),
  post: (p, b) => fetch(`${BASE}${p}`, { method: 'POST',   headers: headers(), body: JSON.stringify(b ?? {}) }).then(handle),
  put:  (p, b) => fetch(`${BASE}${p}`, { method: 'PUT',    headers: headers(), body: JSON.stringify(b ?? {}) }).then(handle),
  patch:(p, b) => fetch(`${BASE}${p}`, { method: 'PATCH',  headers: headers(), body: JSON.stringify(b ?? {}) }).then(handle),
  del:  (p)    => fetch(`${BASE}${p}`, { method: 'DELETE', headers: headers(false) }).then(handle),
}

// spätná kompatibilita s verejnými stránkami (HomeView, NovinkyView, KontaktView...)
export const apiGet = api.get
export const apiPost = api.post
