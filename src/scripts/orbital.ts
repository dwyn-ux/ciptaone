// Orbital parallax tied to scroll position. Subtle, capped.
const fine = matchMedia('(pointer: fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const target = document.querySelector<HTMLElement>('[data-orbital]');
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

if (target && !reduce) {
  const update = () => {
    const y = window.scrollY;
    target.style.translate = `0 ${clamp(y * 0.06, 0, 36)}px`;
  };
  update();
  addEventListener('scroll', update, { passive: true });
}

if (target && fine && !reduce) {
  let rx = 0;
  let ry = 0;
  let tx = 0;
  let ty = 0;

  const tick = () => {
    rx += (tx - rx) * 0.08;
    ry += (ty - ry) * 0.08;
    target.style.rotate = `${(ry - rx) * 4}deg`;
    requestAnimationFrame(tick);
  };
  tick();

  document.addEventListener('pointermove', (e) => {
    const cx = innerWidth / 2;
    const cy = innerHeight / 2;
    tx = (e.clientX - cx) / cx;
    ty = (e.clientY - cy) / cy;
  });
}

export {};
