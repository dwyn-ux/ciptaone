// Custom cursor + interactive hover labels. Desktop with fine pointer only.
const fine = matchMedia('(pointer: fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.querySelector<HTMLElement>('[data-cursor-root]');

if (!fine || reduce || !root) {
  // No-op; CSS already hides .cursor in those cases.
} else {
  document.body.classList.add('has-cursor');

  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let tx = x;
  let ty = y;
  let raf = 0;

  const tick = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    root.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    raf = requestAnimationFrame(tick);
  };

  addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!raf) raf = requestAnimationFrame(tick);
  });

  addEventListener('mouseleave', () => {
    root.style.opacity = '0';
  });
  addEventListener('mouseenter', () => {
    root.style.opacity = '1';
  });

  // Hover labels: read data-cursor attribute and apply class.
  const interactive = document.querySelectorAll<HTMLElement>('[data-cursor]');
  interactive.forEach((el) => {
    const label = el.dataset.cursor ?? '';
    el.addEventListener('mouseenter', () => {
      root.classList.add('is-active');
      if (label) root.setAttribute('data-label', label);
    });
    el.addEventListener('mouseleave', () => {
      root.classList.remove('is-active');
    });
  });
}

export {};
