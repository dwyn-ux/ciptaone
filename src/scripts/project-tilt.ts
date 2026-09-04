// Restrained 3D tilt + cursor-follow for project cards. Desktop only.
const fine = matchMedia('(pointer: fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const cards = document.querySelectorAll<HTMLElement>('[data-project]');

if (fine && !reduce) {
  cards.forEach((card) => {
    const visual = card.querySelector<HTMLElement>('.preview-follow');
    let raf = 0;

    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--rx', `${py * -4}deg`);
        card.style.setProperty('--ry', `${px * 5}deg`);
        card.style.setProperty('--mx', `${px * 100 + 50}%`);
        card.style.setProperty('--my', `${py * 100 + 50}%`);
        if (visual) {
          visual.style.translate = `${px * 14}px ${py * 14}px`;
        }
        raf = 0;
      });
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
      if (visual) visual.style.translate = '';
    });
  });
}

export {};
