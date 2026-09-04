// Update the floating chapter number as sections enter the viewport.
const chapters = document.querySelectorAll<HTMLElement>('[data-chapter]');
const tag = document.querySelector<HTMLElement>('.chapter-tag');

if (chapters.length && tag) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const n = e.target.getAttribute('data-chapter') ?? '01';
          tag.textContent = n;
        }
      });
    },
    { threshold: 0.45 }
  );
  chapters.forEach((c) => io.observe(c));
}

export {};
