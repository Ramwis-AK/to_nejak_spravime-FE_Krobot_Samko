<template>
  <div class="page-content">
    <div class="kontakt-page">
      <div class="kontakt-grid">
        <div class="kontakt-info">
          <p class="section-label">Kontakt</p>
          <h1>Spojte sa s nami</h1>
          <p class="kontakt-sub">Máte otázky k programom, registrácii alebo chcete stať sa partnerom? Napíšte nám.</p>

          <div class="kontakt-detail-list">
            <div class="kdl-item">
              <div class="kdl-icon">✉</div>
              <div>
                <div class="kdl-label">E-mail</div>
                <a href="mailto:nti@ukf.sk">nti@ukf.sk</a>
              </div>
            </div>
            <div class="kdl-item">
              <div class="kdl-icon">✆</div>
              <div>
                <div class="kdl-label">Telefón</div>
                <a href="tel:+421370000000">+421 37 000 0000</a>
              </div>
            </div>
            <div class="kdl-item">
              <div class="kdl-icon">⌖</div>
              <div>
                <div class="kdl-label">Adresa</div>
                <span>Tr. A. Hlinku 1, 949 74 Nitra</span>
              </div>
            </div>
            <div class="kdl-item">
              <div class="kdl-icon">◷</div>
              <div>
                <div class="kdl-label">Úradné hodiny</div>
                <span>Po–Pi 8:00 – 16:00</span>
              </div>
            </div>
          </div>
        </div>

        <div class="kontakt-form-box">
          <h2>Kontaktný formulár</h2>
          <div v-if="sent" class="form-success">
            ✓ Správa bola odoslaná. Ozveme sa vám čo najskôr.
          </div>
          <template v-else>
            <div class="form-group">
              <label>Meno a priezvisko *</label>
              <input v-model="form.meno" type="text" placeholder="Ján Novák" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>E-mail *</label>
                <input v-model="form.email" type="email" placeholder="jan@example.sk" />
              </div>
              <div class="form-group">
                <label>Telefón</label>
                <input v-model="form.telefon" type="tel" placeholder="+421..." />
              </div>
            </div>
            <div class="form-group">
              <label>Téma</label>
              <select v-model="form.tema">
                <option value="">— Vyberte tému —</option>
                <option>Program A — otázka</option>
                <option>Program B — otázka</option>
                <option>Partnerstvo / spolupráca</option>
                <option>Mentoring</option>
                <option>Iné</option>
              </select>
            </div>
            <div class="form-group">
              <label>Správa *</label>
              <textarea v-model="form.sprava" placeholder="Napíšte vašu správu..." rows="5"></textarea>
            </div>
            <div class="form-group">
              <label style="display:flex;gap:0.5rem;align-items:flex-start;font-size:0.82rem;">
                <input v-model="form.gdpr" type="checkbox" />
                  Súhlasím so spracovaním osobných údajov v súlade s GDPR. *
              </label>
            </div>
            <p v-if="chyba" style="color:#dc2626;font-size:0.85rem;margin-bottom:0.5rem;">{{ chyba }}</p>
            <button class="btn-primary" style="width:100%;" @click="handleSend">Odoslať správu →</button>
          </template>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { apiPost } from '../api.js'
import AppFooter from '../components/AppFooter.vue'
export default {
  name: 'KontaktView',
  components: { AppFooter },
  setup() {
    const sent = ref(false)
    const chyba = ref('')
    // gdpr: povinný súhlas (§13)
    const form = reactive({ meno: '', email: '', telefon: '', tema: '', sprava: '', gdpr: false })

    const handleSend = async () => {
      chyba.value = ''
      if (!form.meno || !form.email || !form.sprava) {
        chyba.value = 'Vyplňte meno, e-mail a správu.'
        return
      }
      if (!form.gdpr) {
        chyba.value = 'Potvrďte súhlas so spracovaním údajov.'
        return
      }
      try {
        await apiPost('/kontakt', { ...form })
        sent.value = true
      } catch (e) {
        chyba.value = e.message
      }
    }

    return { form, sent, chyba, handleSend }
  }
}
</script>

<style scoped>
.kontakt-page { max-width: 1100px; margin: 0 auto; padding: 4rem 2rem; min-height: calc(100vh - var(--navbar-h) - 200px); }
.kontakt-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 5rem; align-items: start; }
.kontakt-info h1 { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 400; color: var(--navy); margin-bottom: 0.75rem; }
.kontakt-sub { font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 2.5rem; }
.kontakt-detail-list { display: flex; flex-direction: column; gap: 1.25rem; }
.kdl-item { display: flex; gap: 1rem; align-items: flex-start; }
.kdl-icon { color: var(--accent); font-size: 1rem; min-width: 20px; margin-top: 2px; }
.kdl-label { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.2rem; }
.kdl-item a, .kdl-item span { font-size: 0.9rem; color: var(--navy); text-decoration: none; }
.kdl-item a:hover { color: var(--accent); }
.kontakt-form-box { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 2rem; }
.kontakt-form-box h2 { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--navy); font-weight: 400; margin-bottom: 1.5rem; }
@media (max-width: 768px) { .kontakt-grid { grid-template-columns: 1fr; gap: 2.5rem; } .kontakt-page { padding: 2.5rem 1.25rem; } }
</style>
