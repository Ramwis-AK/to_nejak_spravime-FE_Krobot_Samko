<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo">NTI</div>
        <p>Nitriansky technologický inkubátor — prepájame inovatívnych študentov s reálnymi firmami, mentormi a grantovými príležitosťami.</p>
      </div>
      <div class="footer-col">
        <h4>Programy</h4>
        <RouterLink to="/startup">Program A — Startup</RouterLink>
        <RouterLink to="/prax">Program B — Prax</RouterLink>
        <RouterLink to="/vyzvy">Výzvy a termíny</RouterLink>
      </div>
      <div class="footer-col">
        <h4>Komunita</h4>
        <RouterLink to="/partneri">Partneri a mentori</RouterLink>
        <RouterLink to="/novinky">Novinky</RouterLink>
        <RouterLink to="/o-nti">O NTI</RouterLink>
      </div>
      <div class="footer-col">
        <h4>Kontakt</h4>
        <a href="mailto:nti@ukf.sk">nti@ukf.sk</a>
        <a href="tel:+421370000000">+421 37 000 0000</a>
        <span style="font-size:0.82rem;color:#3a5060;">Tr. A. Hlinku 1<br>949 74 Nitra</span>
      </div>
    </div>
    <div class="footer-bottom">© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</div>
  </footer>
</template>

<script>
export default { name: 'AppFooter' }
</script>
