// Impossible Checkbox — vanilla Web Animations port.
// Header switch toggles theme + triggers bear grab sequence on overlay scene.

const root = document.querySelector<HTMLElement>('[data-icbx]');
if (root) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const input = root.querySelector<HTMLInputElement>('[data-icbx-input]')!;
  const scene = document.querySelector<HTMLElement>('[data-icbx-scene]')!;
  const bearWrap = scene.querySelector<HTMLElement>('[data-icbx-bear-wrap]')!;
  const bear = scene.querySelector<HTMLElement>('[data-icbx-bear]')!;
  const swear = scene.querySelector<HTMLElement>('[data-icbx-swear]')!;
  const armWrap = scene.querySelector<HTMLElement>('[data-icbx-arm-wrap]')!;
  const arm = scene.querySelector<HTMLElement>('[data-icbx-arm]')!;
  const paw = scene.querySelector<HTMLElement>('[data-icbx-paw]')!;
  const angry = scene.querySelector<HTMLElement>('[data-icbx-angry]')!;

  const EASE = 'cubic-bezier(.22, 1, .36, 1)';

  let armLimit = 0;
  let headLimit = armLimit + 2;
  let angerLimit = headLimit + 2;
  let count = 1;

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  // Bear scene is anchored to top-right of header. Bear emerges downward, paw reaches up to switch.
  // Bear vertical translation: positive = down (hidden below viewport bottom of scene? no — scene is full viewport, but bear emerges from above its anchor).
  // Since bear anchor is at top-right (76px from top), bear rises UPWARD (negative y).
  const reset = () => {
    bear.style.transform = 'translate(0, -100%)';
    armWrap.style.transform = 'translate(0, 0)';
    arm.style.transform = 'translate(-35%, -50%) scaleX(1)';
    paw.style.transform = 'translate(-50px, 0) scaleX(0)';
    swear.style.display = 'none';
    if (angry) angry.style.display = 'none';
  };

  const animate = (el: HTMLElement, keyframes: Keyframe[], opts: KeyframeAnimationOptions) =>
    el.animate(keyframes, opts);

  const setTheme = (on: boolean) => {
    document.body.classList.toggle('theme-light', on);
  };

  const playGrab = () => {
    if (reduce) return;

    scene.classList.add('is-active');
    reset();
    setTheme(true);

    const bearTranslation =
      count >= headLimit ? '0%' : count > armLimit ? '-40%' : '-100%';

    const baseDelay = rand(0, 0.2) * 1000;
    const showAngry = count >= angerLimit && Math.random() > 0.5;

    // Bear rises upward toward switch
    const riseDelay = 280 + baseDelay;
    if (count > armLimit) {
      animate(
        bear,
        [{ transform: 'translate(0, -100%)' }, { transform: `translate(0, ${bearTranslation})` }],
        { duration: 250, easing: EASE, fill: 'forwards', delay: riseDelay }
      );
      if (showAngry) {
        setTimeout(() => {
          swear.style.display = 'block';
          if (angry) angry.style.display = 'inline';
        }, riseDelay + 250);
      }
    }

    // Arm reaches from bear toward switch (right-to-left across header)
    animate(
      armWrap,
      [
        { transform: 'translate(0, 0)' },
        { transform: 'translate(-50px, 0)' }
      ],
      { duration: 200, easing: EASE, fill: 'forwards', delay: count > armLimit ? riseDelay : 0 }
    );
    animate(
      arm,
      [
        { transform: 'translate(-35%, -50%) scaleX(1)' },
        { transform: 'translate(-35%, -50%) scaleX(0.7)' }
      ],
      { duration: 200, easing: EASE, fill: 'forwards', delay: (count > armLimit ? riseDelay : 0) + 200 }
    );
    animate(
      paw,
      [
        { transform: 'translate(-50px, 0) scaleX(0)' },
        { transform: 'translate(-50px, 0) scaleX(0.8)' }
      ],
      { duration: 100, easing: EASE, fill: 'forwards', delay: (count > armLimit ? riseDelay : 0) + 400 }
    );

    // OFF sequence
    const offDelay = (count > armLimit ? riseDelay : 0) + 650;
    animate(
      paw,
      [{ transform: 'translate(-50px, 0) scaleX(0.8)' }, { transform: 'translate(-50px, 0) scaleX(0)' }],
      { duration: 100, easing: EASE, fill: 'forwards', delay: offDelay }
    );
    animate(
      arm,
      [{ transform: 'translate(-35%, -50%) scaleX(0.7)' }, { transform: 'translate(-35%, -50%) scaleX(1)' }],
      { duration: 100, easing: EASE, fill: 'forwards', delay: offDelay + 100 }
    );
    animate(
      armWrap,
      [{ transform: 'translate(-50px, 0)' }, { transform: 'translate(0, 0)' }],
      { duration: 200, easing: EASE, fill: 'forwards', delay: offDelay + 100 }
    );
    animate(
      bear,
      [{ transform: `translate(0, ${bearTranslation})` }, { transform: 'translate(0, -100%)' }],
      { duration: 250, easing: EASE, fill: 'forwards', delay: offDelay + 100 }
    );

    // Switch OFF + theme reset
    setTimeout(() => {
      input.checked = false;
      setTheme(false);
    }, offDelay);

    setTimeout(() => {
      scene.classList.remove('is-active');
      reset();
      count += 1;
      if (count > angerLimit + 2) {
        armLimit += 1;
        headLimit += 1;
        angerLimit += 1;
      }
    }, offDelay + 600);
  };

  input.addEventListener('change', () => {
    if (input.checked) {
      playGrab();
    }
  });
}

export {};
