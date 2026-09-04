// Magnetic pull for primary CTAs. Pointer-based, capped, returns to rest.
const fine = matchMedia('(pointer: fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = document.querySelectorAll<HTMLElement>('[data-magnetic]');

if (fine && !reduce) {
  items.forEach((el) => {
    let raf = 0;
    const strength = 0.18;

    el.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * strength;
        const dy = (e.clientY - r.top - r.height / 2) * strength;
        el.style.translate = `${dx}px ${dy}px`;
        raf = 0;
      });
    });

    el.addEventListener('pointerleave', () => {
      el.style.translate = '';
    });
  });
}

export {};
