// Top-of-page progress indicator. Width-only (GPU-friendly).
const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
if (bar) {
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? (scrollY / max) * 100 : 0;
    bar.style.width = `${pct}%`;
  };
  update();
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
}

export {};
