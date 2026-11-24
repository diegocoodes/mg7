import { useEffect } from 'react';

const groups = [
  ['.hero-word', 'line', 140],
  ['.hero .cert-sticker,.hero-actions', 'rise', 90],
  ['.section-label', 'label', 0],
  ['.motion-line', 'line', 75],
  ['.about-seal,.about-copy', 'rise', 110],
  ['.service-tab', 'label', 65],
  ['.service-video', 'media', 0],
  ['.service-content > *', 'rise', 55],
  ['.gallery-item', 'media', 95],
  ['.gallery-bottom > *,.reviews-actions', 'rise', 80],
  ['.contact-copy > p:not(.section-label),.contact-copy > .button,.contact-details,.quote-form', 'rise', 70],
  ['.footer-main > *,.footer-bottom', 'rise', 65],
];

const frames = {
  label: [{ opacity: 0, translate: '-16px 0' }, { opacity: 1, translate: '0 0' }],
  line: [{ opacity: 0, translate: '0 42px' }, { opacity: 1, translate: '0 0' }],
  rise: [{ opacity: 0, translate: '0 26px' }, { opacity: 1, translate: '0 0' }],
  media: [{ opacity: 0, translate: '0 38px', scale: '.97' }, { opacity: 1, translate: '0 0', scale: '1' }],
};

// Content stays visible in SSR, without JavaScript and if animation is unsupported.
export default function useSiteMotion() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const seen = new WeakSet();
    let dispose = () => {};

    const start = () => {
      dispose();
      if (preference.matches) return;
      const root = document.documentElement;
      const animations = new Map();
      const targets = new Map();
      const sections = [...document.querySelectorAll('main > section')];
      const visibleSections = new Set();
      const pendingHero = new Set();
      let introActive = !!document.querySelector('.site-intro');
      const pointerPreference = window.matchMedia('(hover: hover) and (pointer: fine)');
      const galleryCards = [...document.querySelectorAll('.gallery-item')];
      let frame = 0;
      let pointerFrame = 0;
      let pointer = null;
      let activeCard = null;
      let disposed = false;
      root.classList.add('motion-active');

      const reveal = (element) => {
        if (seen.has(element)) return;
        seen.add(element);
        element.classList.add('is-revealed');
        const { kind, delay, swap } = targets.get(element);
        animations.get(element)?.cancel();
        const keyframes = swap
          ? [{ opacity: 0, translate: kind === 'media' ? '-24px 0' : '24px 0' }, { opacity: 1, translate: '0 0' }]
          : frames[kind];
        const animation = element.animate(keyframes, {
          duration: swap ? 550 : kind === 'line' ? 850 : 650,
          delay,
          easing: 'cubic-bezier(.16,1,.3,1)',
          fill: 'backwards',
        });
        animations.set(element, animation);
        animation.onfinish = () => {
          if (animations.get(element) === animation) animations.delete(element);
        };
      };
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (introActive && entry.target.closest('#inicio')) pendingHero.add(entry.target);
          else reveal(entry.target);
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
      const onIntroComplete = () => {
        introActive = false;
        if (!disposed) pendingHero.forEach(reveal);
        pendingHero.clear();
      };
      document.addEventListener('mg7:intro-complete', onIntroComplete);

      for (const [selector, kind, stagger] of groups) {
        document.querySelectorAll(selector).forEach((element, index) => {
          targets.set(element, { kind, delay: (index % 4) * stagger });
          element.dataset.motion = kind;
          if (!seen.has(element)) observer.observe(element);
        });
      }

      const updateScroll = () => {
        frame = 0;
        if (disposed || document.hidden) return;
        const viewport = window.innerHeight;
        const scrollRange = document.documentElement.scrollHeight - viewport;
        const readingProgress = scrollRange > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollRange)) : 0;
        const positions = [...visibleSections].map((section) => {
          const box = section.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (viewport - box.top) / (viewport + box.height)));
          return { section, progress };
        });
        for (const { section, progress } of positions) {
          section.style.setProperty('--scroll-shift', `${((progress - .5) * 42).toFixed(2)}px`);
          section.style.setProperty('--scroll-turn', `${((progress - .5) * 16).toFixed(2)}deg`);
          section.style.setProperty('--text-fill', `${Math.max(0, Math.min(100, (progress - .15) * 180)).toFixed(1)}%`);
          section.style.setProperty('--photo-drift', `${((progress - .5) * 24).toFixed(2)}px`);
        }
        root.style.setProperty('--reading-progress', readingProgress.toFixed(4));
      };
      const queueScroll = () => {
        if (!disposed && !document.hidden && !frame) frame = requestAnimationFrame(updateScroll);
      };
      const sectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleSections.add(entry.target);
          else visibleSections.delete(entry.target);
        }
        queueScroll();
      });
      sections.forEach((section) => sectionObserver.observe(section));

      // Re-arm the active service, including categories already visited.
      const panelObserver = new MutationObserver((records) => {
        for (const { target: panel } of records) {
          if (!panel.classList.contains('service-panel')) continue;
          for (const [element, config] of targets) {
            if (!panel.contains(element)) continue;
            animations.get(element)?.cancel();
            animations.delete(element);
            if (!panel.hidden) {
              seen.delete(element);
              targets.set(element, { ...config, swap: true });
              observer.observe(element);
            }
          }
        }
      });
      const panels = document.querySelector('.service-panels');
      if (panels) panelObserver.observe(panels, { subtree: true, attributes: true, attributeFilter: ['hidden'] });

      const resetCard = () => {
        activeCard?.classList.remove('has-pointer');
        if (activeCard) {
          for (const name of ['--tilt-x', '--tilt-y', '--pointer-x', '--pointer-y']) activeCard.style.removeProperty(name);
        }
        activeCard = null;
      };
      const updatePointer = () => {
        pointerFrame = 0;
        if (disposed || document.hidden || !pointerPreference.matches || !pointer) { resetCard(); return; }
        const { card, x, y } = pointer;
        const box = card.getBoundingClientRect();
        const px = Math.max(0, Math.min(1, (x - box.left) / box.width));
        const py = Math.max(0, Math.min(1, (y - box.top) / box.height));
        if (activeCard !== card) resetCard();
        activeCard = card;
        card.classList.add('has-pointer');
        card.style.setProperty('--pointer-x', `${(px * 100).toFixed(1)}%`);
        card.style.setProperty('--pointer-y', `${(py * 100).toFixed(1)}%`);
        card.style.setProperty('--tilt-x', `${((.5 - py) * 5).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${((px - .5) * 5).toFixed(2)}deg`);
      };
      const onPointerMove = (event) => {
        if (event.pointerType !== 'mouse' || !pointerPreference.matches) return;
        pointer = { card: event.currentTarget, x: event.clientX, y: event.clientY };
        if (!pointerFrame) pointerFrame = requestAnimationFrame(updatePointer);
      };
      const onPointerLeave = () => {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        pointer = null;
        resetCard();
      };
      galleryCards.forEach((card) => {
        card.addEventListener('pointermove', onPointerMove, { passive: true });
        card.addEventListener('pointerleave', onPointerLeave);
      });
      pointerPreference.addEventListener('change', onPointerLeave);

      const revealFocus = (event) => {
        for (const element of targets.keys()) {
          if (element !== event.target && !element.contains(event.target)) continue;
          seen.add(element);
          observer.unobserve(element);
          animations.get(element)?.cancel();
          animations.delete(element);
          element.classList.add('is-revealed');
        }
      };
      document.addEventListener('focusin', revealFocus);
      window.addEventListener('scroll', queueScroll, { passive: true });
      window.addEventListener('resize', queueScroll, { passive: true });
      document.addEventListener('visibilitychange', queueScroll);
      dispose = () => {
        disposed = true;
        observer.disconnect();
        sectionObserver.disconnect();
        panelObserver.disconnect();
        cancelAnimationFrame(frame);
        onPointerLeave();
        galleryCards.forEach((card) => {
          card.removeEventListener('pointermove', onPointerMove);
          card.removeEventListener('pointerleave', onPointerLeave);
        });
        pointerPreference.removeEventListener('change', onPointerLeave);
        animations.forEach((animation) => animation.cancel());
        document.removeEventListener('focusin', revealFocus);
        document.removeEventListener('mg7:intro-complete', onIntroComplete);
        window.removeEventListener('scroll', queueScroll);
        window.removeEventListener('resize', queueScroll);
        document.removeEventListener('visibilitychange', queueScroll);
        root.classList.remove('motion-active');
        root.style.removeProperty('--reading-progress');
        sections.forEach((section) => {
          for (const name of ['--scroll-shift', '--scroll-turn', '--text-fill', '--photo-drift']) section.style.removeProperty(name);
        });
      };
    };
    start();
    preference.addEventListener('change', start);
    return () => { dispose(); preference.removeEventListener('change', start); };
  }, []);
}
