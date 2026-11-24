import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedLogo() {
  const rootRef = useRef(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => setRunning(visible && !document.hidden && !motion.matches);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(rootRef.current);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div ref={rootRef} className="about-seal animated-logo" data-running={running} aria-hidden="true">
      <div className="animated-logo-stage">
        <svg className="animated-logo-orbit" viewBox="0 0 400 300" focusable="false">
          <ellipse className="logo-orbit-guide" cx="200" cy="150" rx="186" ry="112" />
          <ellipse className="logo-orbit-trail logo-orbit-red" cx="200" cy="150" rx="186" ry="112" pathLength="100" />
          <ellipse className="logo-orbit-trail logo-orbit-gold" cx="200" cy="150" rx="186" ry="112" pathLength="100" />
        </svg>
        <div className="animated-logo-mark">
          <img src="/assets/mg7-logo.webp" width="560" height="313" alt="" loading="lazy" decoding="async" />
          <span className="animated-logo-sheen" />
        </div>
      </div>
    </div>
  );
}
