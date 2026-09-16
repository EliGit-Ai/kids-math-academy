(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const filters = document.querySelectorAll('.filters button');
  const cards = document.querySelectorAll('.game-card');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    cards.forEach((card, index) => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.hidden = !show;
      if (show) {
        card.animate([
          { opacity: 0, transform: 'translateY(12px) scale(.98)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' }
        ], { duration: 350, delay: index * 35, easing: 'ease-out' });
      }
    });
  }));

  const form = document.getElementById('updateForm');
  const message = document.getElementById('formMessage');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const email = form.elements.email.value.trim();
    const grade = form.elements.grade.value;
    if (!email || !grade) return;
    const signups = JSON.parse(localStorage.getItem('pedagogi-update-interest') || '[]');
    signups.push({ email, grade, createdAt: new Date().toISOString() });
    localStorage.setItem('pedagogi-update-interest', JSON.stringify(signups));
    message.textContent = '🎉 אתם בפנים! כרגע זו גרסת הדגמה — לפני העלייה לאוויר נחבר את הטופס לרשימת הדיוור.';
    form.querySelector('button').textContent = 'נרשמתם ✓';
    form.querySelector('button').disabled = true;
  });

  if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    const stage = document.querySelector('.hero-stage');
    const planet = document.querySelector('.planet');
    stage?.addEventListener('pointermove', event => {
      const r = stage.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - .5;
      const y = (event.clientY - r.top) / r.height - .5;
      planet.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    });
    stage?.addEventListener('pointerleave', () => planet.style.transform = '');
  }
})();