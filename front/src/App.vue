<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-logo">NTI</div>
      <div class="nav-links">
        <RouterLink to="/">Domov</RouterLink>
        <RouterLink to="/startup">StartUp</RouterLink>
        <RouterLink to="/prax">Prax</RouterLink>
        <RouterLink to="/registracia" class="nav-cta">Registrácia</RouterLink>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<script>
export default { name: 'App' }
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --navy: #0a1628;
  --navy-light: #152240;
  --accent: #e8b84b;
  --accent-dim: #c99d35;
  --text: #1a1a2e;
  --text-muted: #6b7280;
  --border: #e5e7eb;
  --surface: #f9fafb;
  --white: #ffffff;
  --navbar-h: 64px;
}

body {
  font-family: 'Georgia', serif;
  background: var(--white);
  color: var(--text);
}

#app { min-height: 100vh; }

.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--navbar-h);
  background: var(--navy);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  z-index: 1000;
  border-bottom: 2px solid var(--accent);
}

.nav-logo {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent);
  letter-spacing: 0.15em;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-links a {
  color: #c8d0e0;
  font-family: inherit;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s;
  letter-spacing: 0.03em;
  text-decoration: none;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--white);
  background: var(--navy-light);
}

.nav-links a.nav-cta {
  background: var(--accent);
  color: var(--navy);
  font-weight: bold;
  margin-left: 0.5rem;
}

.nav-links a.nav-cta:hover {
  background: var(--accent-dim);
  color: var(--navy);
}

.page-content { padding-top: var(--navbar-h); }

.footer {
  background: var(--navy);
  color: #6b7e99;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  border-top: 1px solid #1e3050;
}
</style>