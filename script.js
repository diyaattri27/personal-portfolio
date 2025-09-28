// DOM helpers and behavior
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Smooth reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Contact form: open mail client with prefilled subject/body (no backend)
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = encodeURIComponent(form.name.value.trim());
    const email = encodeURIComponent(form.email.value.trim());
    const message = encodeURIComponent(form.message.value.trim());

    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    // open default mail client
    window.location.href = `mailto:attridiya8@gmail.com?subject=${subject}&body=${body}`;

    // show toast feedback
    showToast('Opening your email client to send the message...');
    form.reset();
  });

  function showToast(text = '') {
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
});
