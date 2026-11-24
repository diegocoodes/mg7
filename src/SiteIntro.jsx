import React, { useEffect, useState } from 'react';

export default function SiteIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) {
      document.dispatchEvent(new Event('mg7:intro-complete'));
      return;
    }
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dismiss = () => setVisible(false);
    const onMotion = () => { if (motion.matches) dismiss(); };
    const onVisibility = () => { if (document.hidden) dismiss(); };
    if (motion.matches) { dismiss(); return; }
    // A fallback guarantees the introduction never waits for media or network.
    const timer = window.setTimeout(dismiss, 1900);
    window.addEventListener('pointerdown', dismiss, { passive: true, capture: true });
    window.addEventListener('keydown', dismiss, true);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', onMotion);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', dismiss, true);
      window.removeEventListener('keydown', dismiss, true);
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', onMotion);
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div className="site-intro" aria-hidden="true" onAnimationEnd={(event) => {
      if (event.target === event.currentTarget && event.animationName === 'mg7-site-intro-exit') setVisible(false);
    }}>
      <div className="site-intro-brand">
        <img src="/assets/mg7-logo.webp" width="560" height="313" alt="" decoding="async" />
        <span className="site-intro-light" />
        <span className="site-intro-line" />
      </div>
    </div>
  );
}
