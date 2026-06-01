// Nav scroll effect
const nav = document.querySelector('nav')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40)
}, { passive: true })

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle')
const mobileMenu = document.querySelector('.mobile-menu')

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('open')
  mobileMenu.classList.toggle('open', open)
})

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle.classList.remove('open')
    mobileMenu.classList.remove('open')
  })
})

// Contact form → Formspree
const form = document.querySelector('.contact-form')
const btnText     = form.querySelector('.btn-form-text')
const btnLoading  = form.querySelector('.btn-form-loading')
const btnSubmit   = form.querySelector('.btn-form')
const feedback    = form.querySelector('.form-feedback')
const endpoint    = form.dataset.formspree

form.addEventListener('submit', async e => {
  e.preventDefault()

  // Formspree ID not yet configured — fall back to mailto
  if (!endpoint || endpoint.includes('[ DITT')) {
    const name    = form.name.value.trim()
    const message = form.message.value.trim()
    window.location.href =
      `mailto:noah.hindevall@gmail.com` +
      `?subject=${encodeURIComponent('Webbprojekt – ' + name)}` +
      `&body=${encodeURIComponent(message)}`
    return
  }

  // Loading state
  btnText.hidden    = true
  btnLoading.hidden = false
  btnSubmit.disabled = true
  feedback.hidden   = true
  feedback.className = 'form-feedback'

  try {
    const res = await fetch(endpoint, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    new FormData(form),
    })

    if (res.ok) {
      form.reset()
      feedback.textContent = '✓ Tack! Jag hör av mig inom 24 timmar.'
      feedback.classList.add('success')
    } else {
      const data = await res.json().catch(() => ({}))
      throw new Error(data?.errors?.[0]?.message || 'Något gick fel.')
    }
  } catch (err) {
    feedback.textContent = `Kunde inte skicka: ${err.message} Mejla gärna direkt.`
    feedback.classList.add('error')
  } finally {
    btnText.hidden     = false
    btnLoading.hidden  = true
    btnSubmit.disabled = false
    feedback.hidden    = false
  }
})
