// Impossible Checkbox — vanilla Web Animations port of jh3y's bear pen.
// No React, no GSAP. Uses Element.animate() for the timeline orchestration.

const root = document.querySelector<HTMLElement>('[data-icbx]');
if (root) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const bearWrap = root.querySelector<HTMLElement>('[data-icbx-bear-wrap]')!;
  const bear = root.querySelector<HTMLElement>('[data-icbx-bear]')!;
  const swear = root.querySelector<HTMLElement>('[data-icbx-swear]')!;
  const armWrap = root.querySelector<HTMLElement>('[data-icbx-arm-wrap]')!;
  const arm = root.querySelector<HTMLElement>('[data-icbx-arm]')!;
  const paw = root.querySelector<HTMLElement>('[data-icbx-paw]')!;
  const bg = root.querySelector<HTMLElement>('[data-icbx-bg]')!;
  const indicator = root.querySelector<HTMLElement>('[data-icbx-indicator]')!;
  const input = root.querySelector<HTMLInputElement>('[data-icbx-input]')!;
  const angry = root.querySelector<HTMLElement>('[data-icbx-angry]')!;

  const EASE = 'cubic-bezier(.22, 1, .36, 1)';
  const EASE_OUT = 'cubic-bezier(.16, 1, .3, 1)';

  // Pre-compute thresholds (jh3y picks random at boot, we keep deterministic for now)
  let armLimit = 0;
  let headLimit = armLimit + 2;
  let angerLimit = headLimit + 2;
  let count = 1;

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  // Hover tease: bear peeks up briefly.
  let hoverAnim: Animation | null = null;
  root.addEventListener('mouseenter', () => {
    if (input.checked) return;
    if (count > armLimit && Math.random() > 0.5) {
      hoverAnim?.cancel();
      hoverAnim = bear.animate(
        [{ transform: 'translate(0, 100%)' }, { transform: 'translate(0, 40%)' }],
        { duration: 140, easing: EASE_OUT, fill: 'forwards' }
      );
    }
  });
  root.addEventListener('mouseleave', () => {
    if (input.checked) return;
    hoverAnim?.cancel();
    bear.animate(
      [{ transform: getComputedStyle(bear).transform }, { transform: 'translate(0, 100%)' }],
      { duration: 140, easing: EASE_OUT, fill: 'forwards' }
    );
  });

  const playGrab = () => {
    if (reduce) return;

    // Bear rises depending on count.
    const bearTranslation =
      count >= headLimit ? '0%' : count > armLimit ? '40%' : '100%';

    // Random small pre-delay so each grab feels different.
    const baseDelay = rand(0, 0.2) * 1000;

    const showAngry = count >= angerLimit && Math.random() > 0.5;

    // 1. Bear rises (if past armLimit)
    if (count > armLimit) {
      bear.animate(
        [{ transform: 'translate(0, 100%)' }, { transform: `translate(0, ${bearTranslation})` }],
        { duration: 250, easing: EASE, fill: 'forwards', delay: baseDelay }
      );
      if (showAngry) {
        setTimeout(() => {
          swear.style.display = 'block';
          if (angry) angry.style.display = 'inline';
        }, baseDelay + 250);
      }
    }

    // 2. Arm slides over
    armWrap.animate(
      [
        { transform: 'translate(0, -50%)' },
        { transform: 'translate(50px, -50%)' }
      ],
      { duration: 200, easing: EASE, fill: 'forwards', delay: count > armLimit ? baseDelay : 0 }
    );

    // 3. Arm squashes
    arm.animate(
      [
        { transform: 'translate(-35%, -50%) scaleX(1)' },
        { transform: 'translate(-35%, -50%) scaleX(0.7)' }
      ],
      { duration: 200, easing: EASE, fill: 'forwards', delay: count > armLimit ? baseDelay + 200 : 200 }
    );

    // 4. Paw reaches out
    paw.animate(
      [
        { transform: 'translate(40%, -50%) scaleX(0)' },
        { transform: 'translate(40%, -50%) scaleX(0.8)' }
      ],
      { duration: 100, easing: EASE, fill: 'forwards', delay: count > armLimit ? baseDelay + 400 : 400 }
    );

    // 5. Toggle OFF (delayed)
    const offDelay = (count > armLimit ? baseDelay + 650 : 500);
    bg.animate(
      [{ background: 'var(--icbx-accent-on)' }, { background: 'var(--icbx-accent-off)' }],
      { duration: 250, easing: EASE, fill: 'forwards', delay: offDelay }
    );
    indicator.animate(
      [{ transform: 'translateX(100%)' }, { transform: 'translateX(0%)' }],
      { duration: 250, easing: EASE, fill: 'forwards', delay: offDelay }
    );

    // 6. Paw retracts, arm extends back, bear falls
    paw.animate(
      [{ transform: 'translate(40%, -50%) scaleX(0.8)' }, { transform: 'translate(40%, -50%) scaleX(0)' }],
      { duration: 100, easing: EASE, fill: 'forwards', delay: offDelay }
    );
    arm.animate(
      [{ transform: 'translate(-35%, -50%) scaleX(0.7)' }, { transform: 'translate(-35%, -50%) scaleX(1)' }],
      { duration: 100, easing: EASE, fill: 'forwards', delay: offDelay + 100 }
    );
    armWrap.animate(
      [{ transform: 'translate(50px, -50%)' }, { transform: 'translate(0, -50%)' }],
      { duration: 200, easing: EASE, fill: 'forwards', delay: offDelay + 100 }
    );
    bear.animate(
      [{ transform: `translate(0, ${bearTranslation})` }, { transform: 'translate(0, 100%)' }],
      { duration: 250, easing: EASE, fill: 'forwards', delay: offDelay + 100 }
    );

    // Reset
    setTimeout(() => {
      input.checked = false;
      swear.style.display = 'none';
      if (angry) angry.style.display = 'none';
      count += 1;
      if (count > angerLimit + 2) {
        // After a few rounds, raise the bar so it stays surprising.
        armLimit += 1;
        headLimit += 1;
        angerLimit += 1;
      }
    }, offDelay + 600);
  };

  input.addEventListener('change', () => {
    if (input.checked) {
      // Animate ON
      bg.animate(
        [{ background: 'var(--icbx-accent-off)' }, { background: 'var(--icbx-accent-on)' }],
        { duration: 250, easing: EASE, fill: 'forwards' }
      );
      indicator.animate(
        [{ transform: 'translateX(0%)' }, { transform: 'translateX(100%)' }],
        { duration: 250, easing: EASE, fill: 'forwards' }
      );
      // After ON animation, play grab.
      setTimeout(playGrab, 280);
    }
  });
}

export {};
